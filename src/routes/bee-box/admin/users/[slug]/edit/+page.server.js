import prisma from '$lib/database';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const { slug } = params;

  if (!locals.user || locals.user.role !== "admin") {
    throw error(403, "Unauthorized access");
  }

  const userId = slug;
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true, name: true, email: true, isActive: true }
  });

  if (!user) {
    throw error(404, 'Usuario no encontrado');
  }

  return { user };
}