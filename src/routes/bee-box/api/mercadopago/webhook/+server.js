import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function POST({ request }) {
  const body = await request.json();

  const paymentId = body.data.id;

  const payment = await mercadopago.payment.findById(paymentId);
  const externalReference = payment.body.external_reference;
  const status = payment.body.status; // 'approved', 'rejected', etc.

  await db.purchases.update({
    where: { id: parseInt(externalReference) },
    data: { status, mercado_pago_id: paymentId.toString() }
  });

  return json({ received: true });
}