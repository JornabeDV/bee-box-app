import { json } from '@sveltejs/kit';
import mercadopago from 'mercadopago';
import prisma from '$lib/database';

mercadopago.default.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const mp = mercadopago; // Use mercadopago object after configure

export async function POST({ request }) {
  const { planId } = await request.json();

  const plan = await prisma.plan.findUnique({ where: { id: planId } });

  if (!plan) {
    return json({ error: 'Plan no encontrado' }, { status: 404 });
  }

  const preference = {
    items: [
      {
        title: plan.name,
        unit_price: plan.price * 1000,
        quantity: 1
      }
    ],
    back_urls: {
      success: 'https://tusitio.com/bee-box/success',
      failure: 'https://tusitio.com/bee-box/failure',
      pending: 'https://tusitio.com/bee-box/pending'
    },
    auto_return: 'approved'
  };

  const response = await mp.preferences.create(preference);

  return json({ init_point: response.body.init_point });
}
