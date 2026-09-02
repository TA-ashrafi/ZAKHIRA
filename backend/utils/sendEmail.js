import nodemailer from 'nodemailer';

/**
 * Send Email utility supporting SMTP / Brevo or fallback
 * Env vars required for active dispatch:
 * SMTP_USER, SMTP_PASS, SENDER_EMAIL
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const senderEmail = process.env.SENDER_EMAIL || 'tahseenashrafi29@gmail.com';

    // If SMTP credentials are configured, send real email via Nodemailer / Brevo SMTP
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"ZAKHIRA Royal Atelier" <${senderEmail}>`,
        to,
        subject,
        text,
        html
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL DISPATCH] Email sent successfully to ${to}. Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } else {
      // Mock log when SMTP credentials are not yet set in environment
      console.log(`[EMAIL MOCK DISPATCH] SMTP credentials not fully provided. Simulated dispatch to ${to}:`);
      console.log(`Subject: ${subject}`);
      return { success: true, mock: true };
    }
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Generate Welcome Email Template for new ZAKHIRA members
 */
export const getWelcomeEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Playfair Display', Georgia, serif; background-color: #0d0d0d; color: #f8f6f1; margin: 0; padding: 40px 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #141414; border: 1px solid #C9A86C; border-radius: 8px; padding: 40px; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #C9A86C; margin-bottom: 20px; }
        .gold-divider { width: 60px; height: 2px; background-color: #C9A86C; margin: 20px auto; }
        h1 { color: #ffffff; font-size: 24px; margin-bottom: 16px; font-weight: 300; }
        p { color: #d1d5db; font-size: 15px; line-height: 1.8; margin-bottom: 24px; font-family: 'Inter', sans-serif; }
        .cta-btn { display: inline-block; background: linear-gradient(135deg, #C9A86C 0%, #A38048 100%); color: #000000; font-weight: bold; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; }
        .footer { font-size: 12px; color: #71717a; margin-top: 40px; font-family: 'Inter', sans-serif; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">ZAKHIRA</div>
        <div class="gold-divider"></div>
        <h1>Welcome to Royal Haute Joaillerie, ${name}</h1>
        <p>We are delighted to welcome you into the inner sanctum of ZAKHIRA. Your journey into handcrafted 18K & 22K hallmarked fine gold and certified diamond treasures begins today.</p>
        <p>As a valued connoisseur, enjoy complimentary insured worldwide shipping, private consultations, and priority access to our limited high jewelry drop collections.</p>
        <a href="https://zakhira.com/shop" class="cta-btn">Explore Royal Collections</a>
        <div class="footer">
          <p>© 2026 ZAKHIRA Atelier Jaipur. All rights reserved.</p>
          <p>Jaipur • Delhi • Mumbai • Dubai</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
