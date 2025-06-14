import mercadopago from 'mercadopago';
import prisma from '$lib/database';
import dotenv from 'dotenv';

dotenv.config();
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function POST({ request }) {
  try {
    const { planId } = await request.json();

    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return new Response(JSON.stringify({ error: 'Plan no encontrado' }), {
        status: 404
      });
    }

    const preference = {
      items: [{
        title: plan.name,
        description: plan.description || '',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: Number(plan.price)
      }],
      back_urls: {
        success: 'https://bee-box-crossfit.netlify.app/bee-box/success',
        failure: 'https://bee-box-crossfit.netlify.app/bee-box/success',
        pending: 'https://bee-box-crossfit.netlify.app/bee-box/success'
      },
      auto_return: 'approved',
      binary_mode: true,
      external_reference: String(plan.id)
    };

    const response = await mercadopago.preferences.create(preference);

    return new Response(JSON.stringify({
      id: response.body.id,
      init_point: response.body.init_point
    }));

  } catch (error) {
    console.error('Error creando preferencia:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}