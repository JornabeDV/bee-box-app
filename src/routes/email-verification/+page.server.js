import { fail, redirect } from "@sveltejs/kit";
import { generateSessionToken, createSession } from "$lib/server/auth";
import prisma from '$lib/database';
import redisClient from '$lib/redis';
import AWS from 'aws-sdk';
import { addMinutes, addDays } from 'date-fns';
import nodemailer from 'nodemailer';

function isValidEmail(email) {
	return /.+@.+/.test(email);
}

function generateNumericCode(length = 8) {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}

async function generateEmailVerificationCode(userId, email) {
  // Delete existing verification codes for the user
  await prisma.emailVerificationCode.deleteMany({
    where: { userId: userId }
  });

  // Generate a new code
  const code = generateNumericCode();

  // Insert the new verification code
  await prisma.emailVerificationCode.create({
    data: {
      userId: userId,
      email: email,
      code: code,
      expiresAt: addMinutes(new Date(), 15) // 15 minutes from now
    }
  });

	return code;
}

// Crear el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Usa el servicio de Gmail
  auth: {
    user: 'jorgebejarosa@gmail.com',  // Tu dirección de correo electrónico
    pass: 'yukg zpdt lzmi oikf'    // Tu contraseña de correo electrónico (o una contraseña de aplicación si usas 2FA)
  }
});

const baseURL = 'http://localhost:5173';

async function sendVerificationCode(email, verificationCode) {
const mailOptions = {
  from: 'jorgebejarosa@gmail.com',
  to: email,
  subject: 'Verify your email',
  text: `Click the link to verify your email: ${baseURL}/email-verification?code=${verificationCode}`,
  html: `<p>Click the link to verify your email: <a href="${baseURL}/login">Verify your email</a></p>`
};

  try {
    await transporter.sendMail(mailOptions);
    return true;  // Si el correo se envió con éxito
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;  // Si ocurre un error
  }
}

export const actions = {
  sendEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get("email").toLowerCase();

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return fail(400, {
        message: "Invalid email"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true }
    });

    if (!user) {
      return fail(400, { message: "Incorrect email" });
    }

    const verificationCode = await generateEmailVerificationCode(user.id, email);
    const verificationCodeResponse = await sendVerificationCode(email, verificationCode);
    if (verificationCodeResponse) {
      return { success: true };
    }

    return fail(500, { message: "Failed to send verification email" });
  }
}

export async function load ({ cookies, url, request, getClientAddress }) {
  const code = url.searchParams.get('code');

  if (!code) {
    return { status: 400, error: 'Invalid code' };
  }

  try {
    // Find the email verification code in the emailVerificationCode model
    const verificationRecord = await prisma.emailVerificationCode.findUnique({ where: { code: code } });

    if (!verificationRecord) {
      return { status: 400, error: 'Invalid code' };
    }

    // Find the user associated with this verification code
    const user = await prisma.user.findUnique({ where: { email: verificationRecord.email } });

    if (!user) {
      return { status: 400, error: 'User not found' };
    } 

    // Delete the verification code to prevent reuse
    await prisma.emailVerificationCode.delete({ where: { code: code } });

    // Create a new session with your custom auth code
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    if (!session) {
      throw new Error("Failed to create session");
    }

    // record suspicious activity (won’t block login on error)
		const forwardedIP = request.headers.get('x-forwarded-for');
		const clientIP = forwardedIP ? forwardedIP.split(',')[0].trim() : getClientAddress();
		const cookieHeader = request.headers.get("cookie") || "";
		const gaClientId = extractGAClientId(cookieHeader);

    cookies.set("auth_session", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
  } catch (error) {
    console.log('ERROR: ', error);
  }

  return redirect(302, "/login");
}