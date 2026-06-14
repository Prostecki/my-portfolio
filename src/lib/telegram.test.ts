import { describe, it, expect } from 'vitest';
import { escapeTelegramMarkdown, formatContactMessage } from './telegram';

describe('escapeTelegramMarkdown', () => {
  it('escapes markdown special characters', () => {
    expect(escapeTelegramMarkdown('hello *world* _test_ `code` [link]')).toBe(
      'hello \\*world\\* \\_test\\_ \\`code\\` \\[link\\]',
    );
  });

  it('leaves plain text unchanged', () => {
    expect(escapeTelegramMarkdown('Hello world')).toBe('Hello world');
  });
});

describe('formatContactMessage', () => {
  it('formats a contact message with escaped user input', () => {
    const message = formatContactMessage({
      name: 'John *Doe*',
      email: 'john@example.com',
      subject: 'Hello _there_',
      message: 'Test `message`',
    });

    expect(message).toContain('John \\*Doe\\*');
    expect(message).toContain('Hello \\_there\\_');
    expect(message).toContain('Test \\`message\\`');
  });

  it('uses default subject when omitted', () => {
    const message = formatContactMessage({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello there!',
    });

    expect(message).toContain('No subject');
  });
});
