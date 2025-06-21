import prisma from '$lib/database';

export async function load({ url }) {
  const search = url.searchParams.get('search') || '';
  const page = parseInt(url.searchParams.get('page')) || 1;
  const pageSize = 20;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const [totalUsers, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true
      }
    })
  ]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    users,
    totalUsers,
    totalPages,
    currentPage: page,
    search
  };
}
