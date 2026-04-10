import axiosInstance, { directoryAxiosInstance } from "@/services/axios";
import type { ApiResponse } from "@/types/api/Api.types";
import { useQuery } from "@tanstack/react-query";

const SCHOOL_DIRECTORY_SLUG =
  process.env.NEXT_PUBLIC_DIRECTORY_SLUG ??
  "bodhi-international-montessori-school";
const BETTERSCHOOL_ID = process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "bodhi";

const CACHE_CONFIG = {
  staleTime: 4 * 60 * 60 * 1000, // 4 hours
  gcTime: Infinity,
};

export const useGetDirectorySchool = () =>
  useQuery({
    queryKey: ["directorySchool"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}`,
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

// ========================
// SCHOOL CONTENT SECTIONS (static per school)
// ========================
export const useGetDirectoryHomePageContent = () =>
  useQuery({
    queryKey: ["directoryHomePageContent"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/content/home`,
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetDirectoryAboutPageContent = () =>
  useQuery({
    queryKey: ["directoryAboutPageContent"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/content/about`,
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetDirectoryContactDetails = () =>
  useQuery({
    queryKey: ["directoryContactDetails"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/content/contact`,
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetDirectoryFaqs = () =>
  useQuery({
    queryKey: ["directoryFaqs"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/content/faqs`,
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetDirectoryLeadershipMessages = () =>
  useQuery({
    queryKey: ["directoryLeadershipMessages"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/content/leadership`,
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

// ========================
// PAGINATED COLLECTIONS
// ========================
export const useGetDirectoryGallery = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["directoryGallery", page, limit],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/gallery`,
        { params: { page, limit } },
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetDirectoryMembers = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["directoryMembers", page, limit],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/members`,
        { params: { page, limit } },
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetDirectoryEventsAndNotices = (
  page: number = 1,
  limit: number = 10,
  type?: "event" | "notice",
) =>
  useQuery({
    queryKey: ["directoryEventsAndNotices", page, limit, type],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const params: Record<string, any> = { page, limit };
      if (type) params.type = type;

      const response = await directoryAxiosInstance.get(
        `/api/public/school/${SCHOOL_DIRECTORY_SLUG}/events`,
        { params },
      );
      return response.data;
    },
    ...CACHE_CONFIG,
  });

export const useGetSchoolStaffs = () =>
  useQuery({
    queryKey: ["school-staffs"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await axiosInstance.get(`/website/staffs`, {
        params: {
          school: BETTERSCHOOL_ID,
        },
      });
      return response.data;
    },
    ...CACHE_CONFIG,
  });
