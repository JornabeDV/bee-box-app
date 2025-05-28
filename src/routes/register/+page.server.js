import { fail, redirect } from "@sveltejs/kit";
import argon2 from "argon2";
import prisma from '$lib/database';
import { addMinutes } from 'date-fns';

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

async function generateEmailVerificationCode(userId, email) {
  await prisma.emailVerificationCode.deleteMany({
    where: { userId }
  });

  const code = generateNumericCode();

  await prisma.emailVerificationCode.create({
    data: {
      userId,
      email,
      code,
      expiresAt: addMinutes(new Date(), 15)
    }
  });

  return code;
}

export const actions = {
  register: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get("email")?.toLowerCase();
    const password = formData.get("password");

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

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      return fail(400, {
        message: "Email is already in use by an account"
      });
    }

    const passwordHash = await argon2.hash(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    });

    const verificationCode = await generateEmailVerificationCode(newUser.id, email);
    const verificationSent = await sendVerificationCode(email, verificationCode);

    if (verificationSent) {
      throw redirect(302, `/register/success?email=${email}`);
    } else {
      return fail(500, {
        message: "Failed to send verification email"
      });
    }
  }
};

export async function load({ locals, setHeaders }) {
  if (locals.user) {
    setHeaders({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    });
    throw redirect(302, `/bee-box/`);
  }
}