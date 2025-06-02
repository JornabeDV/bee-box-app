import { json } from '@sveltejs/kit';
import prisma from '$lib/database';

export async function GET({ params }) {
  try {
    const { slug } = params;

    const match = slug.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2})$/);
    if (!match) {
      return json({ error: 'Formato de slug inválido' }, { status: 400 });
    }
    const [, dateStr, timeStr] = match;

    const clase = await prisma.class.findFirst({
      where: {
        date: new Date(dateStr),
        time: timeStr
      },
      include: {
        reservations: {
          include: {
            user: true
          }
        }
      }
    });

    if (!clase) {
      return json({ error: 'Clase no encontrada' }, { status: 404 });
    }

    return json(clase);

  } catch (error) {
    console.error('Error al obtener la clase:', error);
    return json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
