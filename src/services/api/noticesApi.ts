/**
 * services/notice.service.ts
 * ─────────────────────────────────────────────────────────────────
 * HTTP layer for public notices.
 *
 * Endpoint : GET /notice/public?school=...&page=...&limit=...
 *
 * Real API response shape (confirmed from console log):
 * {
 *   "success": true,
 *   "message": "Notices fetched successfully",
 *   "data": [          ← flat array, NOT a nested object
 *     {
 *       "_id":           "699ef1922a37ec1709ce0959",
 *       "id":            "699ef1922a37ec1709ce0959",
 *       "school":        "668d0e8e61622439a2349377",
 *       "title":         "hshs",
 *       "content":       "sjjsj",        ← NOT "description"
 *       "noticeType":    "FEE_DUE",      ← NOT "category"
 *       "classes":       [],
 *       "createdBy":     "67447254da74d683d4bbc879",
 *       "createdByRole": "TEACHER",
 *       "createdAt":     "2026-02-25T12:56:50.496Z",
 *       "updatedAt":     "2026-02-25T12:56:50.496Z",
 *       "__v":           0
 *     },
 *     ...
 *   ]
 * }
 *
 * Note: pagination meta (total, totalPages) is NOT in the response —
 * the API returns only the array. Page/limit are still sent as params
 * to control how many items are returned.
 */

import axiosInstance        from "@/services/axios";
import type { ApiResponse } from "@/types/api/Api.types";

// ─── Env ──────────────────────────────────────────────────────────
const SCHOOL_ID =
  process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "6686afc10b4cc86c31fb6933";

// ─── Query params ─────────────────────────────────────────────────
export interface NoticeQueryParams {
  page?:  number;
  limit?: number;
}

// ─── Single notice — matches exact API response fields ────────────
export interface NoticeItem {
  _id:           string;
  id:            string;          // Mongoose virtual alias
  school:        string;
  title:         string;
  content:       string;          // body text (was "description" before)
  noticeType?:   string;          // e.g. "DEFAULT" | "FEE_DUE" | "EXAM_SCHEDULED"
  classes:       { _id: string; name?: string }[];  // targeted classes (empty = all)
  createdBy:     string;
  createdByRole: "SCHOOL" | "TEACHER" | string;
  createdAt:     string;          // ISO 8601
  updatedAt:     string;          // ISO 8601
  __v:           number;
}

// ─── API response: data is a flat NoticeItem[] ────────────────────
export type NoticeApiResponse = ApiResponse<NoticeItem[]>;

// ─── Service function ─────────────────────────────────────────────
export async function fetchNotices(
  params: NoticeQueryParams = {}
): Promise<NoticeApiResponse> {
  const { page = 1, limit = 10 } = params;

  const response = await axiosInstance.get<NoticeApiResponse>(
    "/notice/public",
    {
      params: {
        school: SCHOOL_ID,
        page,
        limit,
      },
    }
  );

  return response.data;
}