import prisma from '$lib/database';

export async function POST({ params }) {
  const userId = Number(params.id);

  try {
    await prisma.user.delete({ where: { id: userId } });
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error al eliminar usuario' }),
      { status: 500 }
    );
  }
}