import { fail, redirect } from "@sveltejs/kit";
import { addMinutes } from 'date-fns';
import prisma from '$lib/database';
import { transporter } from '$lib/server/mail';

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

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://beebox.app'
  : 'http://localhost:5173';

async function sendResetCode(email, code) {
  const link = `${baseURL}/password-reset?token=${code}`;

  const mailOptions = {
    from: 'jorgebejarosa@gmail.com',
    to: email,
    subject: 'Recuperar contraseña',
    text: `Hacé clic en el siguiente enlace para restablecer tu contraseña: ${link}`,
    html: `<p>Hacé clic para restablecer tu contraseña: <a href="${link}">Recuperar contraseña</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending reset email:", error);
    return false;
  }
}

async function generatePasswordResetCode(userId, email) {
  await prisma.passwordResetToken.deleteMany({
    where: { userId }
  });

  const code = generateNumericCode();

  await prisma.passwordResetToken.create({
    data: {
      userId,
      email,
      token: code,
      expiresAt: addMinutes(new Date(), 30) // válido por 30 minutos
    }
  });

  return code;
}

export const actions = {
  forgot: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get("email")?.toLowerCase();

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return fail(400, {
        message: "Email inválido"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) {
      return fail(400, {
        message: "No encontramos una cuenta con ese email"
      });
    }

    const token = await generatePasswordResetCode(user.id, email);
    const sent = await sendResetCode(email, token);

    if (sent) {
      throw redirect(302, `/forgot/success?email=${email}`);
    } else {
      return fail(500, {
        message: "No se pudo enviar el correo. Intentá nuevamente."
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
