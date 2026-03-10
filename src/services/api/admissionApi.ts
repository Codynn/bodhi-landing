
import axiosInstance        from "@/services/axios";
import type { ApiResponse } from "@/types/api/Api.types";

// ─── Env ──────────────────────────────────────────────────────────
const SCHOOL_ID =
  process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "6686afc10b4cc86c31fb6933";

// ─── Request payload (matches exact API field names) ──────────────
export interface AdmissionPayload {
  school:      string;
  fullName:    string;
  email:       string;
  dateOfBirth: string;   // ISO date string e.g. "2025-01-15"
  phoneNumber: string;
  address:     string;
  class:       string;
  queries:     string;
}

// ─── Response data shape ──────────────────────────────────────────
export interface AdmissionData {
  _id:         string;
  id:          string;   // Mongoose virtual alias
  school:      string;
  fullName:    string;
  email:       string;
  dateOfBirth: string;
  phoneNumber: string;
  address:     string;
  class:       string;
  queries:     string;
  createdAt:   string;
  updatedAt:   string;
  __v:         number;
}

// ─── Service function ─────────────────────────────────────────────
/**
 * POST /admissions
 *
 * @param payload  Form data (school ID injected automatically)
 * @returns        Full typed API response envelope
 * @throws         Error with a human-readable message on any failure
 */
export async function submitAdmission(
  payload: Omit<AdmissionPayload, "school">
): Promise<ApiResponse<AdmissionData>> {
  const body: AdmissionPayload = {
    school: SCHOOL_ID,
    ...payload,
  };

  const response = await axiosInstance.post<ApiResponse<AdmissionData>>(
    "/admissions",
    body
  );

  return response.data;
}