import sendEmail, { getTransporter } from '../config/nodemailer.js';

export { sendEmail };

/**
 * Generate Welcome Email Template for new ZAKHIRA members
 */
export const getWelcomeEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to ZAKHIRA</title>
      <style>
        body { font-family: 'Playfair Display', Georgia, serif; background-color: #0d0d0d; color: #f8f6f1; margin: 0; padding: 40px 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #141414; border: 1px solid #C9A86C; border-radius: 12px; padding: 40px; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #C9A86C; margin-bottom: 20px; }
        .gold-divider { width: 60px; height: 2px; background-color: #C9A86C; margin: 20px auto; }
        h1 { color: #ffffff; font-size: 24px; margin-bottom: 16px; font-weight: 300; }
        p { color: #d1d5db; font-size: 15px; line-height: 1.8; margin-bottom: 24px; font-family: 'Inter', sans-serif; }
        .cta-btn { display: inline-block; background: linear-gradient(135deg, #C9A86C 0%, #A38048 100%); color: #000000; font-weight: bold; padding: 14px 32px; text-decoration: none; border-radius: 30px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; }
        .footer { font-size: 12px; color: #71717a; margin-top: 40px; font-family: 'Inter', sans-serif; border-t: 1px solid #262626; pt: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">ZAKHIRA</div>
        <div class="gold-divider"></div>
        <h1>Welcome to Royal Haute Joaillerie, ${name}</h1>
        <p>We are delighted to welcome you into the inner sanctum of ZAKHIRA. Your journey into handcrafted 18K & 22K hallmarked fine gold and certified diamond treasures begins today.</p>
        <p>As a valued connoisseur, enjoy complimentary insured worldwide shipping, private consultations, and priority access to our limited high jewelry drop collections.</p>
        <a href="${process.env.VITE_BASE_URL || 'http://localhost:5173'}" class="cta-btn">Explore Royal Collections</a>
        <div class="footer">
          <p>© 2026 ZAKHIRA Atelier Jaipur. All rights reserved.</p>
          <p>Jaipur • Delhi • Mumbai • Dubai</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
