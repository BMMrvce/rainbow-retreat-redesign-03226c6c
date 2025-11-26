import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple Vercel serverless function to send emails via SendGrid.
// Requires environment variable: SENDGRID_API_KEY
// Optional: ADMIN_EMAIL (defaults to tantravruksha@gmail.com)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !phone) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tantravruksha@gmail.com';

  if (!SENDGRID_API_KEY) {
    res.status(500).json({ error: 'Server missing SENDGRID_API_KEY' });
    return;
  }

  try {
    // Send admin notification
    const adminBody = {
      personalizations: [
        {
          to: [{ email: ADMIN_EMAIL }],
          subject: `New contact request from ${name}`,
        },
      ],
      from: { email: 'no-reply@7colorbow.com', name: '7colorbow' },
      content: [
        {
          type: 'text/plain',
          value: `New contact submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || '(none)'}\n`,
        },
      ],
    };

    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminBody),
    });

    // Send confirmation to customer
    const customerBody = {
      personalizations: [
        {
          to: [{ email }],
          subject: 'We have received your booking request',
        },
      ],
      from: { email: 'no-reply@7colorbow.com', name: '7colorbow' },
      content: [
        {
          type: 'text/plain',
          value: `Hi ${name},\n\nThank you — we have received your booking request.\n\nDetails you submitted:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message || '(none)'}\n\nWe will get back to you within 24 hours.\n\nRegards,\n7colorbow Team`,
        },
      ],
    };

    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerBody),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error sending mail', err);
    res.status(500).json({ error: 'Failed to send emails' });
  }
}
