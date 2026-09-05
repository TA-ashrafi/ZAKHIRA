import Subscriber from '../models/Subscriber.js';
import sendEmail from '../utils/sendEmail.js';

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (subscriber) {
      if (subscriber.status === 'Unsubscribed') {
        subscriber.status = 'Active';
        await subscriber.save();
      } else {
        return res.status(200).json({
          success: true,
          message: 'Thank you for subscribing us! You are already on our VIP list.',
        });
      }
    } else {
      subscriber = await Subscriber.create({ email: email.toLowerCase() });
    }

    // Attempt to send thank you email via Nodemailer
    try {
      await sendEmail({
        email: subscriber.email,
        subject: '✨ Welcome to ZAKHIRA Royal Circle | Subscription Confirmed',
        html: `
          <div style="background-color: #0D0D0D; color: #FFFFFF; font-family: Arial, sans-serif; padding: 40px; border-radius: 10px; max-width: 600px; margin: 0 auto; border: 1px solid #C9A86C;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h1 style="color: #C9A86C; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; letter-spacing: 4px; margin: 0;">ZAKHIRA</h1>
              <p style="color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Fine Haute Joaillerie</p>
            </div>
            <h2 style="color: #FFFFFF; font-size: 20px; font-weight: normal; margin-bottom: 15px;">Dear Esteemed Patron,</h2>
            <p style="color: #CCCCCC; font-size: 14px; line-height: 1.6;">
              Thank you for subscribing us! We are truly honored to welcome you to the exclusive <strong>ZAKHIRA Royal Circle</strong>.
            </p>
            <p style="color: #CCCCCC; font-size: 14px; line-height: 1.6;">
              As a privileged member, you will receive private invitations to new fine jewellery collection launches, bespoke bridal showcases, and special VIP offers.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://zakhira.com/shop" style="background-color: #C9A86C; color: #000000; text-decoration: none; padding: 12px 28px; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px; display: inline-block;">
                Explore Royal Collections
              </a>
            </div>
            <hr style="border: 0; border-top: 1px solid #222222; margin: 30px 0;" />
            <p style="color: #666666; font-size: 11px; text-align: center;">
              ZAKHIRA Jaipur Flagship Atelier | Johari Bazaar, Jaipur, Rajasthan 302003<br/>
              WhatsApp Concierge: +91 8527580809 | Email: tahseenashrafi29@gmail.com
            </p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error('Subscription email dispatch warning:', mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing us!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Subscription failed',
    });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve subscribers',
    });
  }
};
