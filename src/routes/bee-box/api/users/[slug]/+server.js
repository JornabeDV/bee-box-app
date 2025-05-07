import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET({ params }) {
  try {
    const { slug } = params;
    const cacheKey = `user:${slug}`;
    console.log(slug)
    // Verificar si el usuario está en caché
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return json(JSON.parse(cachedData));
    }

    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: +slug }
    });

    if (!user) {
      return json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Guardar en caché por 1 día
    await redisClient.set(cacheKey, JSON.stringify(user), 'EX', 86400);

    return json(user);

  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
