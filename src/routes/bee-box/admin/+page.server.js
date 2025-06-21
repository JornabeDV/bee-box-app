import prisma from '$lib/database';

export async function load({ url }) {
  const locationId = url.searchParams.get('locationId');
  const dateParam = url.searchParams.get('date');
  const date = dateParam ? new Date(dateParam) : new Date();
  const dayOfWeek = date.getDay();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const scheduleWhere = {
    dayOfWeek,
  };

  if (locationId) {
    scheduleWhere.locationId = Number(locationId);
  }

  const [activeUsers, todayReservations, todaySchedules, locations] = await Promise.all([
    prisma.user.count({ where: { isActive: true } }),
    prisma.reservation.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    }),
    prisma.schedule.findMany({
      where: scheduleWhere,
      include: {
        activity: true,
        coach: true,
        reservations: true
      }
    }),
    prisma.location.findMany()
  ]);

  const totalCapacity = todaySchedules.reduce((acc, s) => acc + s.maxCapacity, 0);
  const usedCapacity = todaySchedules.reduce((acc, s) => acc + s.reservations.length, 0);
  const nowHour = new Date().getHours();

  const remainingSchedules = todaySchedules.filter(s => {
    const [hour] = s.time.split(':');
    return parseInt(hour) > nowHour;
  }).length;

  return {
    stats: {
      activeUsers,
      todayReservations,
      occupancyRate: totalCapacity > 0 ? Math.round((usedCapacity / totalCapacity) * 100) : 0,
      remainingSchedules
    },
    todaySchedules,
    locations,
    selectedDate: dateParam,
    selectedLocationId: locationId || ''
  };
}