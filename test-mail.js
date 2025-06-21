import { transporter } from './src/lib/server/mail.js';

async function testMail() {
  try {
    await transporter.sendMail({
      from: 'test@example.com',
      to: 'test@to.com',
      subject: 'Test email',
      text: 'Hello from Mailtrap test!'
    });
    console.log('Test mail sent successfully');
  } catch (e) {
    console.error('Test mail error:', e);
  }
}

testMail();
