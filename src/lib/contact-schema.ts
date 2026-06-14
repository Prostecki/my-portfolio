import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  /** Honeypot field — real users leave this empty. */
  website: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
