import mercadopago from 'mercadopago';
import { json } from '@sveltejs/kit';
import db from '$lib/server/db'; // adapta esto a tu cliente DB

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function POST({ request }) {
  const { userId, planId } = await request.json();
  console.log(userId, planId)
  // Obtén el plan desde tu DB
  const plan = await db.plans.findUnique({
    where: { id: planId }
  });

  if (!plan) return json({ error: 'Plan no encontrado' }, { status: 404 });

  const purchase = await db.purchases.create({
    data: {
      user_id: userId,
      plan_id: plan.id,
      amount: plan.price * 1000,
      status: 'pending'
    }
  });

  const preference = {
    items: [{
      title: plan.name,
      quantity: 1,
      unit_price: plan.price * 1000
    }],
    back_urls: {
      success: `https://tuapp.com/bee-box/thank-you`,
      failure: `https://tuapp.com/bee-box/error`,
    },
    notification_url: 'https://tuapp.com/api/mercadopago/webhook',
    external_reference: purchase.id.toString()
  };

  const response = await mercadopago.preferences.create(preference);
  return json({ init_point: response.body.init_point });
}