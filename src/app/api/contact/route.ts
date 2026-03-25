import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram bot token or chat ID is not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const text = `
📩 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Subject:* ${subject || 'No subject'}

💬 *Message:*
${message}
    `;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API responded with status ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
