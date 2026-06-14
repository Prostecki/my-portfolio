import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { formatContactMessage } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`contact:${ip}`);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: rateLimit.retryAfter
            ? { 'Retry-After': String(rateLimit.retryAfter) }
            : undefined,
        },
      );
    }

    const data = await req.json();

    const validationResult = contactSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fields: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const { name, email, subject, message, website } = validationResult.data;

    // Honeypot triggered — silently accept without sending
    if (website) {
      return NextResponse.json({ success: true });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram bot token or chat ID is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    const text = formatContactMessage({ name, email, subject, message });

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Telegram API responded with status ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error sending message to Telegram:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
