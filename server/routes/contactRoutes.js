import express from 'express';
import { contactController } from '../controllers/contactController.js';

const router = express.Router();

// Public: Submit inquiry & get channel links
router.get('/channels', contactController.getChannels);
router.post('/', contactController.submitContact);

// Admin / Management endpoints
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContact);
router.patch('/:id/status', contactController.updateStatus);
router.delete('/:id', contactController.deleteContact);

export default router;
