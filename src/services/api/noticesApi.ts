import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api/Api.types";

const SCHOOL_ID = process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "bodhi";

export interface NoticeQueryParams {
  page?: number;
  limit?: number;
}

export interface NoticeItem {
  _id: string;
  id: string;
  school: string;
  title: string;
  content: string;
  noticeType?: string;
  classes: { _id: string; name?: string }[];
  createdBy: string;
  createdByRole: "SCHOOL" | "TEACHER" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type NoticeApiResponse = ApiResponse<NoticeItem[]>;

export async function fetchNotices(
  params: NoticeQueryParams = {},
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
    },
  );

  return response.data;
}
