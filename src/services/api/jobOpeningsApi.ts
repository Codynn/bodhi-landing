
import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api/Api.types";

const SCHOOL_ID = process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "bodhi";

export interface JobOpeningQueryParams {
  page?: number;
  limit?: number;
}

export interface JobOpeningItem {
  _id: string;
  id: string;
  school: string;
  title: string;
  description: string;
  type: 'Full Time' | 'Part Time' | 'Contract';
  date: string;
  createdBy: string;
  createdByRole: "SCHOOL" | "TEACHER" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type JobOpeningApiResponse = ApiResponse<JobOpeningItem[]>;

export async function fetchJobOpenings(
  params: JobOpeningQueryParams = {},
): Promise<JobOpeningApiResponse> {
  const { page = 1, limit = 10 } = params;

  const response = await axiosInstance.get<JobOpeningApiResponse>(
    "/career/openings",
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