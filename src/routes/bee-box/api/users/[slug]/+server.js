import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET({ params }) {
  try {
    const { slug } = params;
    const cacheKey = `user:${slug}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return json(JSON.parse(cachedData));
    }

    const user = await prisma.user.findUnique({
      where: { id: +slug }
    });

    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    await redisClient.set(cacheKey, JSON.stringify(user), 'EX', 86400);

    return json(user);

  } catch (error) {
    console.error('Error fetching user:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT({ request, params }) {
  const { slug } = params;
  const body = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: +slug },
      data: {
        name: body.name,
        email: body.email
      }
    });

    await redisClient.del(`user:${slug}`);
    
    return json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}