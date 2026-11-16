import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (config.email.host && config.email.user && config.email.pass) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  return transporter;
}

export const emailService = {
  async sendContactNotification(contact) {
    const mailClient = getTransporter();

    const subject = `[New Inquiry] ${contact.fullName} - ${contact.serviceRequired}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1769FF; margin-top: 0;">New Project Inquiry Received</h2>
        <p style="color: #555;">You have received a new contact request from the <strong>Rulax Technology</strong> website.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #333;">Inquiry ID:</td>
            <td style="padding: 8px 0; color: #666; font-family: monospace;">${contact.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Full Name:</td>
            <td style="padding: 8px 0; color: #111;">${contact.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px 0; color: #1769FF;"><a href="mailto:${contact.email}">${contact.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 8px 0; color: #111;">${contact.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Service:</td>
            <td style="padding: 8px 0; color: #111;">${contact.serviceRequired}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #333;">Description:</td>
            <td style="padding: 8px 0; color: #333; line-height: 1.5; background: #f9fbfd; padding: 12px; border-radius: 6px;">
              ${contact.projectDescription.replace(/\n/g, '<br />')}
            </td>
          </tr>
        </table>

        <div style="margin-top: 24px; font-size: 12px; color: #888; text-align: center;">
          Submitted at: ${new Date(contact.submittedAt).toLocaleString()} | IP: ${contact.metadata?.ip || 'N/A'}
        </div>
      </div>
    `;

    if (mailClient) {
      try {
        const info = await mailClient.sendMail({
          from: config.email.from,
          to: config.email.notificationEmail,
          replyTo: contact.email,
          subject,
          html,
        });
        console.log(`[EmailService] Notification sent: ${info.messageId}`);
        return { sent: true, messageId: info.messageId };
      } catch (err) {
        console.error('[EmailService] Failed to send email via SMTP:', err.message);
        return { sent: false, error: err.message };
      }
    } else {
      console.log(`[EmailService] SMTP not configured. Inquiry notification logged:`);
      console.log(`  To: ${config.email.notificationEmail}`);
      console.log(`  From: ${contact.fullName} <${contact.email}>`);
      console.log(`  Service: ${contact.serviceRequired}`);
      console.log(`  Message: ${contact.projectDescription.substring(0, 100)}...`);
      return { sent: false, reason: 'SMTP not configured in .env' };
    }
  },
};
