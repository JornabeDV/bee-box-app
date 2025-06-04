import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET() {
  try {
    // const cacheKey = 'all-news';

    // const cachedData = await redisClient.get(cacheKey);
    // if (cachedData) {
    //   return json(JSON.parse(cachedData));
    // }

    const news = await prisma.news.findMany();

    if (!news) {
      return json({ error: 'News not found' }, { status: 404 });
    }

    // await redisClient.set(cacheKey, JSON.stringify(news), 'EX', 86400); // Cache for 1 day

    return json(news);

  } catch (error) {
    console.error('Error fetching news:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}