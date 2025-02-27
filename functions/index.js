const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Mailjet = require('node-mailjet');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Mailjet
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

// Cloud Function to send email
exports.sendWelcomeEmail = functions.firestore
  .document('waitlist/{docId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const { email, name } = data;

    // Email content
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

    // Send email
    try {
      await request;
      console.log('Email sent successfully to:', email);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });