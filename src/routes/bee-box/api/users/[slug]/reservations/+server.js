import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET({ params }) {
  try {
    const { slug } = params;
    const cacheKey = `user:${slug}:reservations`;

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

    const reservations = await prisma.reservation.findMany({
      where: { user_id: +slug },
      include: {
        class: true
      }
    });

    await redisClient.set(cacheKey, JSON.stringify(reservations), 'EX', 86400);

    return json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST({ request, params }) {
  try {
    const { slug } = params;
    const body = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: +slug }
    });
    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    const dateTimeStr = `${body.date}T${body.time}:00`;
    const dateTime = new Date(dateTimeStr);

    const clase = await prisma.class.findFirst({
      where: {
        date: dateTime
      }
    });

    if (!clase) {
      return json({ error: 'Class not found' }, { status: 404 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        classId: clase.id
      }
    });

    await redisClient.del(`user:${slug}:reservations`);

    return json({ message: 'Reservation confirmed', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE({ request, params }) {
  try {
    const { slug } = params;
    const body = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: +slug }
    });
    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    const dateTimeStr = `${body.date}T${body.time}:00`;
    const dateTime = new Date(dateTimeStr);

    const clase = await prisma.class.findFirst({
      where: { date: dateTime }
    });
    if (!clase) {
      return json({ error: 'Class not found' }, { status: 404 });
    }

    await prisma.reservation.deleteMany({
      where: {
        userId: user.id,
        classId: clase.id
      }
    });

    await redisClient.del(`user:${slug}:reservations`);

    return json({ message: 'Reservation cancelled' });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}