import { hirynnAxiosInstance } from "@/services/axios";

const SCHOOL_ID = process.env.NEXT_PUBLIC_HIRYNN_ID ?? "bodhi";

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
  type: "Full Time" | "Part Time" | "Contract";
  date: string;
  createdBy: string;
  createdByRole: "SCHOOL" | "TEACHER" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface JobOpeningApiResponse {
  total: number;
  page: number;
  limit: number;
  jobs: JobOpeningItem[];
}

export async function fetchJobOpenings(
  params: JobOpeningQueryParams = {}
): Promise<JobOpeningApiResponse> {
  const { page = 1, limit = 10 } = params;

  const response = await hirynnAxiosInstance.get<JobOpeningApiResponse>(
    `/school/job/${SCHOOL_ID}`,  // → https://voidnepal.com.np/hirynn-api/api/school/job/{id}
    { params: { page, limit } },
  );

  return response.data;
}