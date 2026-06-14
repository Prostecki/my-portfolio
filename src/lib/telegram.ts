/** Escape Telegram legacy Markdown special characters in user-provided text. */
export function escapeTelegramMarkdown(text: string): string {
  return text.replace(/([_*`[\]])/g, '\\$1');
}

export function formatContactMessage(fields: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): string {
  const { name, email, subject, message } = fields;

  return [
    '📩 *New Contact Form Submission*',
    '',
    `👤 *Name:* ${escapeTelegramMarkdown(name)}`,
    `📧 *Email:* ${escapeTelegramMarkdown(email)}`,
    `📝 *Subject:* ${escapeTelegramMarkdown(subject || 'No subject')}`,
    '',
    '💬 *Message:*',
    escapeTelegramMarkdown(message),
  ].join('\n');
}
