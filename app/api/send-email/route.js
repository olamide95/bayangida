import { NextResponse } from 'next/server';
const Mailjet = require('node-mailjet');

export async function POST(request) {
  const { email, name } = await request.json();

  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
  );

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.EMAIL_FROM,
          Name: 'Bayangida Farms',
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: 'Welcome to Bayangida Farms!',
        TextPart: `Hi ${name},\n\nThank you for joining the Bayangida Farms waitlist! We have received your submission and will keep you updated.\n\nBest regards,\nThe Bayangida Farms Team`,
        HTMLPart: `<p>Hi ${name},</p><p>Thank you for joining the Bayangida Farms waitlist! We have received your submission and will keep you updated.</p><p>Best regards,<br>The Bayangida Farms Team</p>`,
      },
    ],
  });

  try {
    await request;
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}