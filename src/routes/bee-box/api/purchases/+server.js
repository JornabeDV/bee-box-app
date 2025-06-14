import { json } from '@sveltejs/kit';
import prisma from '$lib/database';
import redisClient from '$lib/redis';
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function POST({ request, locals }) {
  const { payment_id, preference_id } = await request.json();

  const userId = locals.user.id;
  console.log(userId)
  try {
    const payment = await mercadopago.payment.get(payment_id);

    if (payment.body.status === 'approved') {
      await prisma.purchases.create({
        where: { mercadoPagoId: preference_id },
        data: {
          userId,
          mercadoPagoId: preference_id,
          status: 'approved',
          amount: payment.body.transaction_amount,
        }
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          planId,
          planStart: new Date(),
          planExpires: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }
      });

      return new Response(
        JSON.stringify({ success: true, payment: payment.body }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Pago no aprobado' }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error validando pago:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}