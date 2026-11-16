// Configuration for Social & Direct Messaging Channels
export const SOCIAL_CONFIG = {
  whatsappNumber: '918838099509',
  whatsappDisplay: '+91 88380 99509',
  instagramHandle: 'rulaxtechnology',
  instagramDisplay: '@rulaxtechnology',
  instagramUrl: 'https://instagram.com/rulaxtechnology',
  instagramDmUrl: 'https://ig.me/m/rulaxtechnology',
  email: 'contact@rulaxtechnology.com',
};

/**
 * Builds a formatted WhatsApp direct enquiry link
 */
export function buildWhatsAppLink(data = {}) {
  const { fullName, email, phone, serviceRequired, projectDescription, inquiryId } = data;

  let text = `👋 *Hi Rulax Technology!*\n`;
  text += `I would like to inquire about your services.\n\n`;

  if (fullName) text += `👤 *Name:* ${fullName.trim()}\n`;
  if (email) text += `📧 *Email:* ${email.trim()}\n`;
  if (phone) text += `📱 *Phone:* ${phone.trim()}\n`;
  if (serviceRequired) text += `🛠️ *Service Required:* ${serviceRequired}\n`;
  if (projectDescription) text += `📝 *Project Brief:*\n${projectDescription.trim()}\n\n`;
  if (inquiryId) text += `🔖 *Inquiry ID:* ${inquiryId}\n`;

  text += `\nLooking forward to discussing my project!`;

  const number = SOCIAL_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a formatted Instagram direct message or copyable brief
 */
export function buildInstagramBrief(data = {}) {
  const { fullName, email, phone, serviceRequired, projectDescription, inquiryId } = data;
  let text = `🚀 Project Inquiry - Rulax Technology\n\n`;
  if (fullName) text += `Name: ${fullName.trim()}\n`;
  if (email) text += `Email: ${email.trim()}\n`;
  if (phone) text += `Phone: ${phone.trim()}\n`;
  if (serviceRequired) text += `Service: ${serviceRequired}\n`;
  if (projectDescription) text += `Brief: ${projectDescription.trim()}\n`;
  if (inquiryId) text += `ID: ${inquiryId}\n`;
  return text;
}
