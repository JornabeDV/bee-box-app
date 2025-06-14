import mercadopago from 'mercadopago';
import prisma from '$lib/database';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function load({ url, locals }) {

  const userId = locals.user.id;
  console.log(userId)
  const payment_id = url.searchParams.get('payment_id');
  const plan_id = url.searchParams.get('external_reference');

  if (!payment_id || !userId) {
    return {
      success: false,
      error: 'Faltan datos del pago en la URL'
    };
  }

  try {
    // Validar el pago con MercadoPago
    const payment = await mercadopago.payment.get(payment_id);

    if (payment.body.status !== 'approved') {
      return {
        success: false,
        error: 'El pago no fue aprobado'
      };
    }

    // Opcional: registrar el pago en la tabla de compras si la tenés
    await prisma.purchase.create({
      data: {
        mercadoPagoId: +payment_id,
        status: payment.body.status,
        amount: payment.body.transaction_amount,
        userId,
        planId: +plan_id
      }
    });

    // Activar plan en el usuario
    const planId = 1; // ⚠️ Reemplazá esto según tu lógica o pasalo en la preferencia

    await prisma.user.update({
      where: { id: (userId) },
      data: {
        planId: +plan_id,
        planStart: new Date(),
        planExpires: new Date(new Date().setMonth(new Date().getMonth() + 1))
      }
    });

    return {
      success: true,
      payment: payment.body
    };

  } catch (error) {
    console.error('Error al validar pago:', error);
    return {
      success: false,
      error: error.message
    };
  }
}