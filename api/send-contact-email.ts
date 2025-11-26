import type { VercelRequest, VercelResponse } from '@vercel/node';

// Silence TS if `process` type isn't available in this environment
declare const process: any;

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
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@7colorbow.com';

  if (!SENDGRID_API_KEY) {
    res.status(500).json({ error: 'Server missing SENDGRID_API_KEY' });
    return;
  }

  try {
    const sendViaSendGrid = async (body: any) => {
      const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (resp.status !== 202) {
        const text = await resp.text();
        // eslint-disable-next-line no-console
        console.error('SendGrid error', resp.status, text);
        throw new Error(`SendGrid send failed: ${resp.status} - ${text}`);
      }
    };

    // Send admin notification
    const adminBody = {
      personalizations: [
        {
          to: [{ email: ADMIN_EMAIL }],
          subject: `New contact request from ${name}`,
        },
      ],
      from: { email: FROM_EMAIL, name: '7colorbow' },
      content: [
        {
          type: 'text/plain',
          value: `New contact submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || '(none)'}\n`,
        },
      ],
    };

    await sendViaSendGrid(adminBody);

    // Send confirmation to customer
    const customerBody = {
      personalizations: [
        {
          to: [{ email }],
          subject: 'We have received your booking request',
        },
      ],
      from: { email: FROM_EMAIL, name: '7colorbow' },
      content: [
        {
          type: 'text/plain',
          value: `Hi ${name},\n\nThank you — we have received your booking request.\n\nDetails you submitted:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message || '(none)'}\n\nWe will get back to you within 24 hours.\n\nRegards,\n7colorbow Team`,
        },
      ],
    };

    await sendViaSendGrid(customerBody);

    res.status(200).json({ ok: true });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending mail', err?.message || err);
    res.status(500).json({ error: err?.message || 'Failed to send emails' });
  }
}
