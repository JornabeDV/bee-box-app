import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';

export async function GET({ params, locals }) {
  try {
    if (!locals.user) {
      return json({ error: "Unauthorized access" }, { status: 403 });
    }
    const userId = locals.user.userId;

    const cacheKey = `user:${userId}:reservations`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return json(JSON.parse(cachedData));
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId: +slug },
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

export async function POST({ params, request, locals }) {

  const userId = locals.user.id;

  const { scheduleId } = await request.json();

  if (!scheduleId) {
    return json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    const userPlan = await prisma.userPlan.findFirst({
      where: {
        userId,
        expiresDate: { gte: new Date() },
        remainingClasses: { gt: 0 },
      }
    });

    if (!userPlan) {
      return json({
        success: false,
        error: 'No tenés un plan activo o clases disponibles. <a href="/bee-box/plans" class="underline text-blue-500">Ver planes</a>'
      });
    }

    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: {
        reservations: {
          where: { scheduleId }
        }
      }
    });

    if (!schedule) {
      return json({ success: false, error: 'Turno no encontrado' });
    }

    const alreadyReserved = schedule.reservations.some(
      (r) => r.userId === userId
    );

    if (alreadyReserved) {
      return json({ success: false, error: 'Ya estás registrado en esta clase' });
    }

    if (schedule.reservations.length >= schedule.maxCapacity) {
      return json({ success: false,  error: 'Clase completa' });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        scheduleId: schedule.id
      }
    });

    await redisClient.del(`schedule:${schedule.id}`);

    return json({ success: true, reservation });
  } catch (err) {
    console.error('Error al crear reserva:', err);
    return json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE({ request, params, locals }) {
  try {
    const userId = locals.user.id;
    const { scheduleId } = await request.json();

    if (!scheduleId) {
      return json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId }
    });

    if (!schedule) {
      return json({ error: 'Clase no encontrada' }, { status: 404 });
    }

    const deleted = await prisma.reservation.deleteMany({
      where: {
        userId,
        scheduleId: schedule.id,
      }
    });

    if (deleted.count === 0) {
      return json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    await redisClient.del(`user:${userId}:reservations`);
    await redisClient.del(`schedule:${scheduleId}`);

    return json({ success:true, message: 'Reserva cancelada con éxito' });
  } catch (err) {
    console.error('Error al cancelar reserva:', err);
    return json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
