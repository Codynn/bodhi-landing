

import { z } from "zod";

export const admissionFormSchema = z.object({
  // ── Student details ──────────────────────────────
  studentFullName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(80, "Student name must be 80 characters or fewer"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date of birth",
    }),

  address: z
    .string()
    .min(3,   "Address must be at least 3 characters")
    .max(200, "Address must be 200 characters or fewer"),

  gradeLevel: z
    .string()
    .min(1, "Please select a grade / level"),

  // ── Parent / Guardian details ────────────────────
  parentFullName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(80, "Parent name must be 80 characters or fewer"),

  relationshipToStudent: z
    .string()
    .min(1, "Please select a relationship"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be 100 characters or fewer")
    .or(z.literal("")),          // email is optional in the API

  phoneNumber: z
    .string()
    .min(7,  "Phone number must be at least 7 digits")
    .max(15, "Phone number must be 15 digits or fewer")
    .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number"),

  // ── Optional message ─────────────────────────────
  message: z
    .string()
    .max(1000, "Message must be 1 000 characters or fewer")
    .optional(),
});

/** TypeScript type inferred directly from the Zod schema */
export type AdmissionFormValues = z.infer<typeof admissionFormSchema>;