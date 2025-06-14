// +server.js
import { json } from '@sveltejs/kit';
import prisma from '$lib/database';

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  const results = [];

  for (const day of days) {
    const dayOfWeek = day.getDay(); // 0-6
    const formattedDate = day.toISOString().split('T')[0];

    const schedules = await prisma.schedule.findMany({
      where: { dayOfWeek },
      include: {
        activity: true,
        reservations: {
          where: { date: day },
          select: { id: true }
        }
      }
    });

    for (const sched of schedules) {
      results.push({
        id: sched.id,
        date: formattedDate,
        time: sched.time,
        activity: sched.activity.name,
        capacity: sched.maxCapacity,
        reserved: sched.reservations.length
      });
    }
  }

  return json(results);
}