/**
 * validations/contact-form.schema.ts
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for the Contact-Us form.
 *
 *  • Runtime validation  → Zod schema
 *  • Static TS type      → inferred from the schema (no duplication)
 *  • Used by             → useContactMessage hook + ContactSection component
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2,  "Full name must be at least 2 characters")
    .max(80, "Full name must be 80 characters or fewer")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name may only contain letters, spaces, hyphens and apostrophes"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be 100 characters or fewer"),

  phoneNumber: z
    .string()
    .min(7,  "Phone number must be at least 7 digits")
    .max(15, "Phone number must be 15 digits or fewer")
    .regex(
      /^\+?[0-9\s\-()]+$/,
      "Please enter a valid phone number"
    ),

  message: z
    .string()
    .min(10,   "Message must be at least 10 characters")
    .max(1000, "Message must be 1 000 characters or fewer"),
});

/** TypeScript type inferred directly from the Zod schema */
export type ContactFormValues = z.infer<typeof contactFormSchema>;