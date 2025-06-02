import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET() {
  try {
    const cacheKey = 'all-news';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return json(JSON.parse(cachedData));
    }

    const news = await prisma.membershipPlan.findMany();

    if (!news) {
      return json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    await redisClient.set(cacheKey, JSON.stringify(news), 'EX', 86400);

    return json(news);

  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
