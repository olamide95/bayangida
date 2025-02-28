import { NextResponse } from 'next/server';
import brevo from '@getbrevo/brevo';

export async function POST(request) {
  const { email, name } = await request.json();

  // Initialize Brevo API client
  const defaultClient = brevo.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new brevo.TransactionalEmailsApi();

  // Email content
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = 'Welcome to Bayangida Farms!';
  sendSmtpEmail.sender = { email: process.env.EMAIL_FROM, name: 'Bayangida Farms' };
  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.textContent = `Hi ${name},\n\nThank you for joining the Bayangida Farms waitlist! We have received your submission and will keep you updated.\n\nBest regards,\nThe Bayangida Farms Team`;
  sendSmtpEmail.htmlContent = `<p>Hi ${name},</p><p>Thank you for joining the Bayangida Farms waitlist! We have received your submission and will keep you updated.</p><p>Best regards,<br>The Bayangida Farms Team</p>`;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}