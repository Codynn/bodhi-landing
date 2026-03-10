

import { ApiResponse } from "@/types/api/Api.types";
import axiosInstance from "./axios";


// ─── Env ──────────────────────────────────────────────────────────
const SCHOOL_ID =
  process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "6686afc10b4cc86c31fb6933";

// ─── Request payload ──────────────────────────────────────────────
export interface ContactMessagePayload {
  school:  string;
  name:    string;
  email:   string;
  message: string;
}

// ─── Response data — mirrors exact Mongoose/API shape ─────────────
export interface ContactMessageData {
  _id:       string;          // Mongoose ObjectId string
  id:        string;          // Mongoose virtual (alias of _id)
  school:    string;
  name:      string;
  email:     string;
  message:   string;
  createdAt: string;          // ISO 8601
  updatedAt: string;          // ISO 8601
  __v:       number;          // Mongoose version key
}


export async function sendContactMessage(
  payload: Omit<ContactMessagePayload, "school">
): Promise<ApiResponse<ContactMessageData>> {
  const body: ContactMessagePayload = {
    school: SCHOOL_ID,
    ...payload,
  };

  const response = await axiosInstance.post<ApiResponse<ContactMessageData>>(
    "/contactMessage",
    body
  );

  return response.data;
}