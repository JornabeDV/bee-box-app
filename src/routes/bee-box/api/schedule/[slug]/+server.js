import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET({ url, params }) {

  const { slug } = params;

  const scheduleId = +slug;

  const cacheKey = `schedule:${slug}`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return json(JSON.parse(cachedData));
  }

  try {
    const schedule = await prisma.schedule.findUnique({
      where: {
        id: +scheduleId
      },
      include: {
        coach: {
          select: {
            name: true
          }
        },
        activity: true,
        location: true,
        reservations: {
          where: { scheduleId },
          include: { user: true }
        }
      }
    });

    if (!schedule) {
      return json({ error: 'Class not found' }, { status: 404 });
    }

    await redisClient.set(cacheKey, JSON.stringify(schedule), 'EX', 86400);

    return json( schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}