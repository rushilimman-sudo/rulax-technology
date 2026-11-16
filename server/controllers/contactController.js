import { dbService } from '../services/dbService.js';
import { emailService } from '../services/emailService.js';
import { config } from '../config/index.js';

// Basic email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactController = {
  getChannels(req, res) {
    return res.json({
      success: true,
      channels: {
        whatsappNumber: config.social.whatsappNumber,
        instagramHandle: config.social.instagramHandle,
        whatsappUrl: `https://wa.me/${config.social.whatsappNumber}`,
        instagramUrl: `https://instagram.com/${config.social.instagramHandle}`,
        instagramDmUrl: `https://ig.me/m/${config.social.instagramHandle}`,
        email: config.email.notificationEmail,
      },
    });
  },

  async submitContact(req, res) {
    try {
      const { fullName, email, phone, serviceRequired, projectDescription, channel, socialForwarded } = req.body;

      // Validation
      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Full name is required and must be at least 2 characters.',
        });
      }

      if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: 'A valid email address is required.',
        });
      }

      if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 10) {
        return res.status(400).json({
          success: false,
          error: 'Project description is required and must be at least 10 characters long.',
        });
      }

      const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || 'unknown';

      // Store in DB
      const newContact = dbService.createContact({
        fullName,
        email,
        phone,
        serviceRequired,
        projectDescription,
        channel: channel || 'WEB',
        socialForwarded: socialForwarded || null,
        ip: clientIp,
        userAgent,
      });

      // Send email notification asynchronously
      emailService.sendContactNotification(newContact).catch((err) => {
        console.error('Background email notification error:', err);
      });

      // Formatted WhatsApp & Instagram deep links for the client
      const whatsappText = encodeURIComponent(
        `🚀 *New Inquiry - Rulax Technology*\n\n` +
        `👤 *Name:* ${newContact.fullName}\n` +
        `📧 *Email:* ${newContact.email}\n` +
        `📱 *Phone:* ${newContact.phone || 'Not provided'}\n` +
        `🛠️ *Service:* ${newContact.serviceRequired}\n` +
        `📝 *Brief:* ${newContact.projectDescription}\n\n` +
        `🔖 *Inquiry ID:* ${newContact.id}`
      );

      const whatsappUrl = `https://wa.me/${config.social.whatsappNumber}?text=${whatsappText}`;
      const instagramDmUrl = `https://ig.me/m/${config.social.instagramHandle}`;
      const instagramProfileUrl = `https://instagram.com/${config.social.instagramHandle}`;

      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Our team has received your project details and will be in touch shortly.',
        data: {
          id: newContact.id,
          fullName: newContact.fullName,
          serviceRequired: newContact.serviceRequired,
          submittedAt: newContact.submittedAt,
          whatsappUrl,
          instagramDmUrl,
          instagramProfileUrl,
          whatsappNumber: config.social.whatsappNumber,
          instagramHandle: config.social.instagramHandle,
        },
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      return res.status(500).json({
        success: false,
        error: 'An internal server error occurred while processing your request.',
      });
    }
  },

  async getContacts(req, res) {
    try {
      const { status, search } = req.query;
      const contacts = dbService.getAllContacts({ status, search });
      return res.json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch contacts.' });
    }
  },

  async getContact(req, res) {
    try {
      const { id } = req.params;
      const contact = dbService.getContactById(id);
      if (!contact) {
        return res.status(404).json({ success: false, error: 'Contact inquiry not found.' });
      }
      return res.json({ success: true, data: contact });
    } catch (error) {
      console.error('Error fetching contact:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch contact.' });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        });
      }

      const updated = dbService.updateContactStatus(id, status);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Contact inquiry not found.' });
      }

      return res.json({ success: true, data: updated });
    } catch (error) {
      console.error('Error updating contact status:', error);
      return res.status(500).json({ success: false, error: 'Failed to update contact status.' });
    }
  },

  async deleteContact(req, res) {
    try {
      const { id } = req.params;
      const deleted = dbService.deleteContact(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Contact inquiry not found.' });
      }

      return res.json({ success: true, message: 'Inquiry deleted successfully.' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      return res.status(500).json({ success: false, error: 'Failed to delete contact.' });
    }
  },
};
