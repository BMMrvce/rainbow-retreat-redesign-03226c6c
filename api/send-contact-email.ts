// Vercel serverless function (use generic any types to avoid build-time type issues)
// Note: avoid importing '@vercel/node' to prevent type resolution errors during the Vercel build.
// Provide a minimal `process` declaration so TypeScript in the build does not require @types/node.
declare const process: any;

// Simple Vercel serverless function to send emails via SendGrid.
// Requires environment variable: SENDGRID_API_KEY
// Optional: ADMIN_EMAIL (defaults to tantravruksha@gmail.com)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, phone, message } = req.body || {};

  if (!name || !email) {
    res.status(400).json({ error: 'Missing required fields (name, email)' });
    return;
  }

  const SENDGRID_API_KEY = (process as any)?.env?.SENDGRID_API_KEY;
  const ADMIN_EMAIL = (process as any)?.env?.ADMIN_EMAIL || 'tantravruksha@gmail.com';
  const FROM_EMAIL = (process as any)?.env?.FROM_EMAIL || 'no-reply@7colorbow.com';
  const BRAND_IMG = (process as any)?.env?.EMAIL_BRANDING_IMAGE ||
    'https://excited-emerald-im8x8qlfvz-0zawstv4m4.edgeone.dev/herosection.jpg';

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

    // Admin HTML
    const adminHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #111;">
        <div style="max-width:700px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
          <div style="background:#fafafa;padding:12px;text-align:center">
            <img src="${BRAND_IMG}" alt="7colorbow" style="width:100%;height:auto;display:block;object-fit:cover;" />
          </div>
          <div style="padding:20px">
            <h2 style="margin:0 0 8px">New contact request from ${name}</h2>
            <p style="margin:0 0 16px;color:#444">A new booking/contact request was submitted via the website.</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;border:1px solid #eee"><strong>Name</strong></td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee"><strong>Email</strong></td><td style="padding:8px;border:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;border:1px solid #eee"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #eee">${phone || '(none)'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee"><strong>Message</strong></td><td style="padding:8px;border:1px solid #eee">${(message||'(none)').replace(/\n/g, '<br/>')}</td></tr>
            </table>
            <p style="margin:16px 0 0;color:#666;font-size:13px">View/manage requests: <a href="/7colorbow/cr">Admin panel</a></p>
          </div>
        </div>
      </div>
    `;

    await sendViaSendGrid({
      personalizations: [{ to: [{ email: ADMIN_EMAIL }], subject: `New contact request from ${name}` }],
      from: { email: FROM_EMAIL, name: '7colorbow' },
      reply_to: { email: ADMIN_EMAIL },
      content: [
        { type: 'text/plain', value: `New Booking Request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '(none)'}\n\nMessage:\n${message || '(none)'}\n` },
        { type: 'text/html', value: adminHtml }
      ]
    });

    // Customer confirmation HTML
    const customerHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif;color:#111;max-width:700px;margin:0 auto">
        <div style="text-align:center;padding:12px;background:#fafafa;border-radius:8px 8px 0 0;overflow:hidden">
          <img src="${BRAND_IMG}" alt="7colorbow" style="width:100%;height:auto;display:block;object-fit:cover" />
        </div>
        <div style="background:#fff;padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
          <h2 style="margin-top:0">Thanks, ${name} — we received your request</h2>
          <p style="color:#444">We received your booking request and will respond within 24 hours. Summary of your submission is below.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:12px">
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Name</strong></td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #eee">${phone || '(none)'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Email</strong></td><td style="padding:8px;border:1px solid #eee">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Message</strong></td><td style="padding:8px;border:1px solid #eee">${(message||'(none)').replace(/\n/g, '<br/>')}</td></tr>
          </table>
          <p style="margin-top:16px;color:#666;font-size:13px">If you need immediate assistance, reply to this email or call us.</p>
          <p style="color:#999;font-size:12px">7colorbow</p>
        </div>
      </div>
    `;

    await sendViaSendGrid({
      personalizations: [{ to: [{ email }], subject: 'We have received your booking request🖐' }],
      from: { email: FROM_EMAIL, name: '7colorbow' },
      reply_to: { email: ADMIN_EMAIL },
      content: [
        { type: 'text/plain', value: `Hi ${name},\n\nThank you — we have received your booking request.\n\nWe will get back to you within 24 hours.` },
        { type: 'text/html', value: customerHtml }
      ]
    });

    res.status(200).json({ ok: true });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending mail', err?.message || err);
    res.status(500).json({ error: err?.message || 'Failed to send emails' });
  }
}
