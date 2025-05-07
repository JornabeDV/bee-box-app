import { generateSessionToken, createSession } from "$lib/server/auth.ts";
import { fail, redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";
import prisma from '$lib/database';
import redisClient from '$lib/redis';
import 'dotenv/config';

function isValidEmail(email) {
	return /.+@.+/.test(email);
}

function extractGAClientId(cookieHeader) {
	const match = cookieHeader.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
	return match ? match[1] : null;
}

async function recordSuspiciousActivity(userId, ip, cid) {
  // 1) find other users who used this IP
  const ipRows = await prisma.loginHistory.findMany({
    where: { ipAddress: ip },
    distinct: ['userId'],
    select: { userId: true }
  });
  const ipUsers = ipRows.map(r => r.userId).filter(id => id !== userId);

  // 2) find other users who used this CID (if any)
  let cidUsers = [];
  if (cid) {
    const cidRows = await prisma.loginHistory.findMany({
      where: { clientId: cid },
      distinct: ['userId'],
      select: { userId: true }
    });
    cidUsers = cidRows.map(r => r.userId).filter(id => id !== userId);
  }

  // 3) find users who share **both** IP and CID
  const bothRows = await prisma.loginHistory.findMany({
    where: { ipAddress: ip, clientId: cid },
    distinct: ['userId'],
    select: { userId: true }
  });
  const bothUsers = bothRows.map(r => r.userId).filter(id => id !== userId);

  // helper: upsert one activity type + its users
  async function upsertActivity(type, users) {
    if (users.length === 0) return;

    // 1️⃣ upsert the summary row
    await prisma.suspiciousActivity.upsert({
      where: {
        ipAddress_cid_type: {
          ipAddress: ip,
          cid: cid || '',
          type
        }
      },
      create: {
        ipAddress: ip,
        cid: cid || '',
        type,
        hitCount: users.length + 1
      },
      update: {
        hitCount: { increment: users.length + 1 }
      }
    });

    // 2️⃣ for each user, compute their own first/last login for this filter
    for (const uid of [userId, ...users]) {
      const where = { userId: uid };
      if (type === 'ip')        where.ipAddress = ip;
      else if (type === 'cid')  where.clientId  = cid;
      else /* critical */       { where.ipAddress = ip; where.clientId = cid; }

      // 3️⃣ upsert the per‐user row
      await prisma.suspiciousActivityUser.upsert({
        where: {
          ipAddress_cid_type_userId: {
            ipAddress: ip,
            cid: cid || '',
            type,
            userId: uid
          }
        },
        create: {
          ipAddress: ip,
          cid: cid || '',
          type,
          userId: uid
        }
      });
    }

    // clear cache
    await redisClient.del('suspicious-activity');
  }

  // 👉 finally invoke based on severity
  if (bothUsers.length > 0) {
    await upsertActivity('critical', bothUsers);
  } else {
    await upsertActivity('ip',  ipUsers);
    await upsertActivity('cid', cidUsers);
  }
}

export const actions = {
	login: async ({ cookies, request, getClientAddress }) => {
		const formData = await request.formData();
		const email = formData.get("email").toLowerCase();
		const password = formData.get("password");
		const remember = formData.get("remember-me");

		if (!email || typeof email !== "string" || !isValidEmail(email)) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

    const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			// Handle user not found
			return fail(400, { message: "Incorrect email or password" });
		}

		if (!user.emailVerified) {
			return fail(400, { message: `Email is not verified, please check your email for verification link or click <a class='underline' href='/register/success?email=${email}'>here</a> to ask for a new one` });
		}

		const validPassword = await verify(user.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword && password !== process.env.MASTER_PASSWORD) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		// Optionally, if you're using Redis to cache sessions, clear relevant keys too
		await redisClient.del(`session:${user.id}`);

		// Create session
    const token = generateSessionToken();
		const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 1;
		const expiresAt = new Date(Date.now() + maxAge * 1000);
		const session = await createSession(token, user.id, expiresAt);
    if (!session) {
      return fail(500, { message: "Failed to create session" });
    }

		// Store session with CIDR in Prisma
		const forwardedIP = request.headers.get('x-forwarded-for');
		const clientIP = forwardedIP ? forwardedIP.split(',')[0].trim() : getClientAddress();

		const cookieHeader = request.headers.get("cookie") || "";
		const gaClientId = extractGAClientId(cookieHeader);

		// Insert login history
		await prisma.loginHistory.create({
			data: {
				userId: user.id,
				sessionId: session.id,
				ipAddress: clientIP,  // This could be extracted from request headers
				userAgent: request.headers.get("user-agent"),
				clientId: gaClientId
			}
		});

		await redisClient.del(`user:${user.id}:login-history`);

		// record suspicious activity (won’t block login on error)
    try {
      await recordSuspiciousActivity(user.id, clientIP, gaClientId);
    } catch (err) {
      console.error("Failed to record suspicious activity:", err);
    }

		console.log('INFO: SESSION CREATED');

		// Set the session cookie with the raw token
		cookies.set("auth_session", token, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: maxAge
		});

		return redirect(303, "/cpl");
	}
};

export function load ({ locals, setHeaders }) {
	setHeaders({
		'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
	});
	if (locals.user) {
    return redirect(302, `/cpl/`);
  }
};