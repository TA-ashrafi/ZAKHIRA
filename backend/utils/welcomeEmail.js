const getWelcomeEmailHTML = (name, email) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ZAKHIRA</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0D0D0D;
      font-family: 'Georgia', serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%);
      border: 1px solid #C9A86C/30;
      border-radius: 16px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #2B080C, #1A0306);
      padding: 40px 30px 20px;
      text-align: center;
      border-bottom: 2px solid #C9A86C;
    }
    .header h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 36px;
      font-weight: 700;
      color: #C9A86C;
      margin: 0;
      letter-spacing: 4px;
    }
    .header p {
      color: #F5E6D3/70;
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .body-content {
      padding: 40px 35px;
    }
    .body-content h2 {
      color: #F5E6D3;
      font-size: 22px;
      font-weight: 400;
      margin: 0 0 8px 0;
      font-family: 'Georgia', serif;
    }
    .body-content .name {
      color: #C9A86C;
      font-size: 28px;
      font-weight: 700;
      font-family: 'Playfair Display', Georgia, serif;
      margin: 0 0 16px 0;
      display: block;
    }
    .body-content p {
      color: #B9B9B9;
      font-size: 15px;
      line-height: 1.8;
      margin: 0 0 16px 0;
    }
    .body-content .highlight {
      color: #C9A86C;
      font-weight: 600;
    }
    .divider {
      border: none;
      height: 1px;
      background: linear-gradient(to right, transparent, #C9A86C/40, transparent);
      margin: 24px 0;
    }
    .features {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 20px 0;
    }
    .feature-item {
      background: #1A1A1A;
      border: 1px solid #C9A86C/15;
      border-radius: 8px;
      padding: 14px 16px;
      text-align: center;
    }
    .feature-item span {
      display: block;
      font-size: 22px;
      margin-bottom: 4px;
    }
    .feature-item .label {
      color: #C9A86C;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    .feature-item .value {
      color: #F5E6D3;
      font-size: 12px;
      font-weight: 300;
      margin-top: 2px;
    }
    .cta-btn {
      display: inline-block;
      background: #C9A86C;
      color: #0D0D0D !important;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 40px;
      border-radius: 6px;
      text-decoration: none;
      margin: 16px 0 8px 0;
      transition: background 0.3s;
    }
    .cta-btn:hover {
      background: #b8975b;
    }
    .footer {
      background: #0A0A0A;
      padding: 24px 35px;
      text-align: center;
      border-top: 1px solid #C9A86C/15;
    }
    .footer .brand {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18px;
      color: #C9A86C;
      font-weight: 700;
      letter-spacing: 2px;
    }
    .footer p {
      color: #4D4D4D;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 6px 0 0 0;
    }
    .footer .social {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .footer .social a {
      color: #4D4D4D;
      font-size: 10px;
      text-decoration: none;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: color 0.3s;
    }
    .footer .social a:hover {
      color: #C9A86C;
    }
    @media only screen and (max-width: 480px) {
      .body-content { padding: 24px 18px; }
      .header h1 { font-size: 28px; }
      .features { grid-template-columns: 1fr; }
      .cta-btn { display: block; text-align: center; }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D0D0D; padding:20px 10px;">
    <tr>
      <td align="center">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>ZAKHIRA</h1>
            <p>Timeless Jewellery • Royal Atelier</p>
          </div>

          <!-- Body -->
          <div class="body-content">
            <h2>Welcome to ZAKHIRA,</h2>
            <span class="name">${name}</span>

            <p>
              We are absolutely <span class="highlight">delighted</span> to welcome you to 
              <span class="highlight">ZAKHIRA</span> — a world of timeless elegance, 
              handcrafted in pure gold and precious gems.
            </p>

            <p>
              Your journey with us begins today. As a valued member of our community, 
              you'll be the first to discover our <span class="highlight">signature collections</span>, 
              receive <span class="highlight">exclusive offers</span>, and experience 
              the art of fine jewellery like never before.
            </p>

            <hr class="divider">

            <div class="features">
              <div class="feature-item">
                <span>📿</span>
                <div class="label">Exclusive Access</div>
                <div class="value">Early access to new collections</div>
              </div>
              <div class="feature-item">
                <span>💎</span>
                <div class="label">Member Benefits</div>
                <div class="value">Special discounts &amp; offers</div>
              </div>
              <div class="feature-item">
                <span>📦</span>
                <div class="label">Insured Shipping</div>
                <div class="value">Complimentary worldwide delivery</div>
              </div>
              <div class="feature-item">
                <span>👑</span>
                <div class="label">Private Concierge</div>
                <div class="value">24/7 dedicated support</div>
              </div>
            </div>

            <hr class="divider">

            <p style="text-align:center; font-size:13px; color:#B9B9B9;">
              Start exploring our <span class="highlight">royal collections</span> 
              and discover the perfect piece for your precious moments.
            </p>

            <div style="text-align:center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/shop" class="cta-btn">
                ✦ Explore Collections ✦
              </a>
            </div>

            <p style="text-align:center; font-size:12px; color:#666; margin-top:20px;">
              Your ZAKHIRA account is now active with email: <strong style="color:#C9A86C;">${email}</strong>
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="brand">✦ ZAKHIRA ✦</div>
            <p>Timeless Beauty. Made to Shine.</p>
            <div class="social">
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
              <a href="#">Facebook</a>
            </div>
            <p style="margin-top:12px;">&copy; ${new Date().getFullYear()} ZAKHIRA. All rights reserved.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export default getWelcomeEmailHTML;