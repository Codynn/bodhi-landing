import { z } from 'zod'

export const contactFormSchema = z.object({
  fullName:    z.string().min(2, 'Full name is required'),
  email:       z.string().email('Enter a valid email').or(z.literal('')),
  phoneNumber: z.string().min(7, 'Phone number is required'),
  message:     z.string().min(5, 'Please enter a message'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>