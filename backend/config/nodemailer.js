import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

// Helper to get SMTP transporter with environment variables
export const getTransporter = () => {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp-relay.brevo.com";
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587;
  const isSecure = process.env.SMTP_SECURE === "true" || port === 465;

  return createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });
};

const sendEmail = async ({ to, subject, body, html }) => {
  try {
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const rawSender = process.env.SENDER_EMAIL || process.env.EMAIL_FROM || smtpUser || "tahseenashrafi29@gmail.com";

    if (!smtpUser || !smtpPass) {
      console.warn("⚠️ SMTP Credentials missing in environment variables.");
      return { success: false, error: "Missing SMTP credentials" };
    }

    const formattedSender = rawSender?.includes("<")
      ? rawSender
      : `"ZAKHIRA Royal Atelier" <${rawSender}>`;

    const transporter = getTransporter();

    const response = await transporter.sendMail({
      from: formattedSender,
      to,
      subject,
      html: body || html,
    });

    console.log(`✉️ Email successfully sent to ${to}. Message ID: ${response?.messageId}`);
    return { success: true, response, messageId: response?.messageId };
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    return { success: false, error: error.message || error };
  }
};

export default sendEmail;
export { sendEmail };
