import prisma from '$lib/database';
import bcrypt from 'bcryptjs';

export async function POST({ request, params }) {
  const { name, email, isActive, password } = await request.json();
  const userId = Number(params.id);

  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: 'Nombre y email son obligatorios' }),
      { status: 400 }
    );
  }

  const emailUser = await prisma.user.findUnique({ where: { email } });
  if (emailUser && emailUser.id !== userId) {
    return new Response(
      JSON.stringify({ error: 'El email ya está en uso por otro usuario' }),
      { status: 400 }
    );
  }

  const dataToUpdate = { name, email, isActive };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    dataToUpdate.password = hashedPassword;
  }

  await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate
  });

  return new Response(null, { status: 200 });
}
import prisma from '$lib/database';
import bcrypt from 'bcryptjs';

export async function POST({ request, params }) {
  const { name, email, isActive, password } = await request.json();
  const userId = Number(params.id);

  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: 'Nombre y email son obligatorios' }),
      { status: 400 }
    );
  }
  
  const emailUser = await prisma.user.findUnique({ where: { email } });
  if (emailUser && emailUser.id !== userId) {
    return new Response(
      JSON.stringify({ error: 'El email ya está en uso por otro usuario' }),
      { status: 400 }
    );
  }

  const dataToUpdate = { name, email, isActive };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    dataToUpdate.password = hashedPassword;
  }

  await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate
  });

  return new Response(null, { status: 200 });
}  