import { describe, it, expect } from 'vitest'
import { contactSchema } from './contact-schema'

describe('contactSchema', () => {
  it('validates correct data', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('validates without optional subject', () => {
    const data = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('rejects name shorter than 2 characters', () => {
    const data = {
      name: 'J',
      email: 'john@example.com',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const nameError = result.error.flatten().fieldErrors.name?.[0]
      expect(nameError).toBe('Name must be at least 2 characters')
    }
  })

  it('rejects invalid email', () => {
    const data = {
      name: 'John Doe',
      email: 'not-an-email',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.flatten().fieldErrors.email?.[0]
      expect(emailError).toBe('Invalid email address')
    }
  })

  it('rejects message shorter than 10 characters', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Short',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      const messageError = result.error.flatten().fieldErrors.message?.[0]
      expect(messageError).toBe('Message must be at least 10 characters')
    }
  })

  it('rejects missing name', () => {
    const data = {
      email: 'john@example.com',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejects missing email', () => {
    const data = {
      name: 'John Doe',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejects missing message', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('allows empty string for subject', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: '',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('rejects name longer than 100 characters', () => {
    const data = {
      name: 'A'.repeat(101),
      email: 'john@example.com',
      message: 'This is a test message with enough content',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejects message longer than 5000 characters', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'A'.repeat(5001),
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
