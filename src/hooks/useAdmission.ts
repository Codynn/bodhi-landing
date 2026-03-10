"use client";


import { useMutation }                          from "@tanstack/react-query";
import type { ApiResponse }                     from "@/types/api/Api.types";
import { useResultPopup } from "./useResultPopUp";
import { AdmissionData, submitAdmission } from "@/services/api/admissionApi";
import { AdmissionFormValues } from "@/lib/validations/admission-form.schema";

// ─── Hook options ─────────────────────────────────────────────────
interface UseAdmissionOptions {
  /** Called after a successful API response — typically used to reset the form */
  onSuccess?: (data: ApiResponse<AdmissionData>) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────
export function useAdmission(options?: UseAdmissionOptions) {
  const { popup, showSuccess, showError, closePopup } = useResultPopup();

  const { mutate: admissionMutation, isPending } = useMutation<
    ApiResponse<AdmissionData>, // TData
    Error,                      // TError
    AdmissionFormValues         // TVariables
  >({
    mutationFn: (values: AdmissionFormValues) =>
      submitAdmission({
        fullName:    values.studentFullName,
        email:       values.email,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(), // convert to ISO
        phoneNumber: values.phoneNumber,
        address:     values.address,
        class:       values.gradeLevel,
        queries:     values.message ?? "",
        // parentFullName + relationshipToStudent are client-only fields
        // add them to the payload once the API supports them
      }),

    // ── Success ───────────────────────────────────────
    onSuccess: (data) => {
      showSuccess(
        data.message ?? "Thank you! We have received your admission enquiry."
      );
      options?.onSuccess?.(data);
    },

    // ── Error ─────────────────────────────────────────
    onError: (error: Error) => {
      showError(
        error.message || "Your form could not be submitted. Please try again later."
      );
    },
  });

  return { admissionMutation, isPending, popup, closePopup };
}