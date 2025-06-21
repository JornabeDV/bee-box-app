import { fail, redirect } from "@sveltejs/kit";
import { generateSessionToken, createSession } from "$lib/server/auth";
import redisClient from '$lib/redis';
import prisma from '$lib/database';
import argon2 from "argon2";

export const actions = {
  reset: async (event) => {
    const formData = await event.request.formData();
    const password = formData.get("password");
    const token = formData.get("token");

    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: "Invalid password"
      });
    }

    const passwordResetRecord = await prisma.passwordResetToken.findUnique({ where: { token: token } });
    if (!passwordResetRecord) {
      return { status: 400, error: 'Invalid token' };
    }

    // Find the user associated with this token
    const user = await prisma.user.findUnique({ where: { email: passwordResetRecord.email } });
    if (!user) {
      return { status: 400, error: 'User not found' };
    }

    const passwordHash = await argon2.hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    // Update user password
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        passwordHash: passwordHash
      }
    });

    if (updatedUser) {
      await redisClient.del(`session:${user.id}`);

      // Create a new session using custom auth code
      const newToken = generateSessionToken();
      const session = await createSession(newToken, user.id);
      if (!session) {
        return fail(500, { message: "Failed to create session" });
      }

      // Set the session cookie with the raw token
      event.cookies.set("auth_session", newToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });

      redirect(302, `/password-reset/success`);
    }
  }
}

export async function load ({ locals, url, setHeaders }) {
  if (locals.user) {
    setHeaders({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    });
    redirect(302, `/bee-box/`);
  }

  const token = url.searchParams.get('token');

  try {
    // Find the token in the passwordResetToken model
    const passwordResetRecord = await prisma.passwordResetToken.findUnique({ where: { token: token } });

    if (!passwordResetRecord) {
      return { status: 400, error: 'Invalid token' };
    }

    // Find the user associated with this token
    const user = await prisma.user.findUnique({ where: { email: passwordResetRecord.email } });

    if (!user) {
      return { status: 400, error: 'User not found' };
    }
  } catch (error) {
    console.log('ERROR: ', error);
  }
}