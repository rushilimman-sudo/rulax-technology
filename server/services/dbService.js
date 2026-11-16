import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../config/index.js';

const CONTACTS_FILE = path.join(config.dataDir, 'contacts.json');
const SUBSCRIBERS_FILE = path.join(config.dataDir, 'subscribers.json');

// Ensure data directory and files exist
function ensureStorage() {
  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
  }

  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Helper to safely read JSON
function readJSON(filePath) {
  ensureStorage();
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Helper to safely write JSON atomically
function writeJSON(filePath, data) {
  ensureStorage();
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

export const dbService = {
  // CONTACT INQUIRIES
  createContact(data) {
    const contacts = readJSON(CONTACTS_FILE);
    const newContact = {
      id: `inq_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: (data.phone || '').trim(),
      serviceRequired: data.serviceRequired || 'Web Development',
      projectDescription: data.projectDescription.trim(),
      channel: data.channel || 'WEB',
      socialForwarded: data.socialForwarded || null,
      status: 'NEW', // NEW | IN_REVIEW | CONTACTED | CLOSED
      submittedAt: new Date().toISOString(),
      metadata: {
        ip: data.ip || '127.0.0.1',
        userAgent: data.userAgent || 'unknown',
      },
    };

    contacts.unshift(newContact);
    writeJSON(CONTACTS_FILE, contacts);
    return newContact;
  },

  getAllContacts(filters = {}) {
    let contacts = readJSON(CONTACTS_FILE);

    if (filters.status) {
      contacts = contacts.filter((c) => c.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      contacts = contacts.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.serviceRequired.toLowerCase().includes(q) ||
          c.projectDescription.toLowerCase().includes(q)
      );
    }

    return contacts;
  },

  getContactById(id) {
    const contacts = readJSON(CONTACTS_FILE);
    return contacts.find((c) => c.id === id) || null;
  },

  updateContactStatus(id, status) {
    const contacts = readJSON(CONTACTS_FILE);
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return null;

    contacts[index].status = status;
    contacts[index].updatedAt = new Date().toISOString();
    writeJSON(CONTACTS_FILE, contacts);
    return contacts[index];
  },

  deleteContact(id) {
    const contacts = readJSON(CONTACTS_FILE);
    const filtered = contacts.filter((c) => c.id !== id);
    if (filtered.length === contacts.length) return false;

    writeJSON(CONTACTS_FILE, filtered);
    return true;
  },

  // NEWSLETTER SUBSCRIBERS
  addSubscriber(email, source = 'website') {
    const subscribers = readJSON(SUBSCRIBERS_FILE);
    const normalizedEmail = email.trim().toLowerCase();

    const existing = subscribers.find((s) => s.email === normalizedEmail);
    if (existing) {
      return { subscriber: existing, alreadySubscribed: true };
    }

    const newSubscriber = {
      id: `sub_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      email: normalizedEmail,
      source,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    subscribers.unshift(newSubscriber);
    writeJSON(SUBSCRIBERS_FILE, subscribers);
    return { subscriber: newSubscriber, alreadySubscribed: false };
  },

  getAllSubscribers() {
    return readJSON(SUBSCRIBERS_FILE);
  },

  unsubscribe(email) {
    const subscribers = readJSON(SUBSCRIBERS_FILE);
    const normalizedEmail = email.trim().toLowerCase();
    const sub = subscribers.find((s) => s.email === normalizedEmail);
    if (!sub) return false;

    sub.active = false;
    sub.unsubscribedAt = new Date().toISOString();
    writeJSON(SUBSCRIBERS_FILE, subscribers);
    return true;
  },
};
