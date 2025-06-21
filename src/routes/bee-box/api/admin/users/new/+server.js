import prisma from '$lib/database';
import argon2 from 'argon2';

export async function POST({ request }) {
  const { name, email, isActive, password } = await request.json();

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ error: 'Faltan campos obligatorios' }),
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return new Response(
      JSON.stringify({ error: 'El email ya está en uso' }),
      { status: 400 }
    );
  }

  const hashedPassword = await argon2.hash(password);

  await prisma.user.create({
    data: { name, email, isActive, emailVerified: true, passwordHash: hashedPassword }
  });

  return new Response(null, { status: 201 });
}
