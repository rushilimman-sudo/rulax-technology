import { dbService } from '../services/dbService.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const newsletterController = {
  subscribe(req, res) {
    try {
      const { email, source } = req.body;

      if (!email || !EMAIL_REGEX.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: 'A valid email address is required.',
        });
      }

      const result = dbService.addSubscriber(email, source);
      if (result.alreadySubscribed) {
        return res.json({
          success: true,
          message: 'You are already subscribed to Rulax Technology updates.',
          data: result.subscriber,
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Subscribed successfully! Thank you for staying connected.',
        data: result.subscriber,
      });
    } catch (error) {
      console.error('Newsletter subscribe error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to process newsletter subscription.',
      });
    }
  },

  getSubscribers(req, res) {
    try {
      const subscribers = dbService.getAllSubscribers();
      return res.json({
        success: true,
        count: subscribers.length,
        data: subscribers,
      });
    } catch (error) {
      console.error('Newsletter fetch error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch subscribers.',
      });
    }
  },

  unsubscribe(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required.' });
      }

      const success = dbService.unsubscribe(email);
      if (!success) {
        return res.status(404).json({ success: false, error: 'Subscription not found.' });
      }

      return res.json({ success: true, message: 'Unsubscribed successfully.' });
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to process unsubscribe request.',
      });
    }
  },
};
