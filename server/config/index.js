import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or server
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  dataDir: path.resolve(__dirname, '../data'),
  social: {
    whatsappNumber: (process.env.WHATSAPP_NUMBER || '918838099509').replace(/[^0-9]/g, ''),
    instagramHandle: (process.env.INSTAGRAM_HANDLE || 'rulaxtechnology').replace('@', ''),
  },
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '"Rulax Technology" <noreply@rulaxtechnology.com>',
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'contact@rulaxtechnology.com',
  },
};
