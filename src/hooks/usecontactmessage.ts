"use client";

/**
 * hooks/useContactMessage.ts
 * ─────────────────────────────────────────────────────────────────
 * TanStack Query mutation hook for the Contact-Us form.
 * Uses the generic useResultPopup hook for success/error feedback.
 */

import { useMutation } from "@tanstack/react-query";

import { sendContactMessage } from "@/services/api/contactApi";
import type { ContactFormValues } from "@/lib/validations/contact-form-schema";
import type { ApiResponse } from "@/types/api/Api.types";
import { useResultPopup } from "./useResultPopUp";

// ─── Hook options ─────────────────────────────────────────────────
interface UseContactMessageOptions {
  onSuccess?: (data: ApiResponse<any>) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────
export function useContactMessage(options?: UseContactMessageOptions) {
  const { popup, showSuccess, showError, closePopup } = useResultPopup();

  const { mutate: contactMutation, isPending } = useMutation<
    ApiResponse<any>,
    Error,
    ContactFormValues
  >({
    mutationFn: (values: ContactFormValues) =>
      sendContactMessage({
        name: values.fullName,
        email: values.email,
        message: values.message,
      }),

    onSuccess: (data) => {
      showSuccess(data.message ?? "Thank you! We have received your details.");
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      showError(
        error.message ||
          "Your form could not be submitted. Please try again later.",
      );
    },
  });

  return { contactMutation, isPending, popup, closePopup };
}
