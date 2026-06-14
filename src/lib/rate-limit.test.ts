import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkRateLimit } from './rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('allows requests within the limit', () => {
    const key = `test-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(key).allowed).toBe(true);
    }
  });

  it('blocks requests over the limit', () => {
    const key = `test-block-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      checkRateLimit(key);
    }

    const result = checkRateLimit(key);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('resets after the window expires', () => {
    const key = `test-reset-${Date.now()}`;

    for (let i = 0; i < 5; i++) {
      checkRateLimit(key);
    }

    expect(checkRateLimit(key).allowed).toBe(false);

    vi.advanceTimersByTime(15 * 60 * 1000 + 1);

    expect(checkRateLimit(key).allowed).toBe(true);
  });
});
