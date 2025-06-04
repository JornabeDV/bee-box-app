import { fail, redirect } from "@sveltejs/kit";
import { addHours } from 'date-fns';
import prisma from '$lib/database'; // Ajusta según tu ruta

function generateNumericCode(length = 6) {
  const digits = "0123456789";
  return Array.from({ length }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
}

function isValidEmail(email) {
	return /.+@.+/.test(email);
}

async function generateToken(userId, email) {
  await prisma.passwordResetToken.deleteMany({ where: { userId } });

  const token = generateNumericCode();

  await prisma.passwordResetToken.create({
    data: {
      userId,
      email,
      token,
      expiresAt: addHours(new Date(), 24),
    }
  });

  return token;
}

async function sendResetEmail(email, token) {
const resetLink = `http://localhost:5173/reset?token=${token}`;

  const params = {
    Destination: { ToAddresses: [email] },
    Message: {
      Body: {
        Text: {
          Data: `Hello! Click here to reset your password: ${resetLink}\n\nThis link is valid for 24 hours.`
        }
      },
      Subject: { Data: "Reset your password" }
    },
    Source: "Bee-box <info@tusitio.com>"
  };

  try {
    await ses.sendEmail(params).promise();
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
}

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const email = form.get("email")?.toLowerCase();

    if (!email || !isValidEmail(email)) {
      return fail(400, { message: "Invalid email" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) {
      return fail(400, { message: "No user with that email" });
    }

    const token = await generateToken(user.id, email);
    const sent = await sendResetEmail(email, token);

    if (sent) {
      throw redirect(302, '/forgot/success');
    } else {
      return fail(500, { message: "Failed to send email. Try again later." });
    }
  }
};
