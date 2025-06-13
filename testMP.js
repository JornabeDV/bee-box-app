import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

async function test() {
  try {
    const preference = {
      items: [
        {
          title: 'Prueba token',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 1
        }
      ],
      back_urls: {
        success: 'https://www.example.com/success',
        failure: 'https://www.example.com/failure',
        pending: 'https://www.example.com/pending'
      },
      auto_return: 'approved',
      binary_mode: true
    };

    const response = await mercadopago.preferences.create(preference);
    console.log('Preferencia creada:', response.body.id);
  } catch (error) {
    console.error('Error en test:', error);
  }
}

test();
