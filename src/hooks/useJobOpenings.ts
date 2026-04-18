"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchJobOpenings,
  JobOpeningItem,
} from "@/services/api/jobOpeningsApi";
import { JobOpening } from "@/types/career/careeropening.types";
import { JOB_OPENINGS } from "@/constants/career/careeropening.constants";

function mapToJobOpening(item: JobOpeningItem): JobOpening {
  return {
    id: item._id,
    title: item.title,
    description: item.description,
    type: item.type,
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    href: `/career?id=${item._id}`,
  };
}

export function useJobOpenings() {
  const query = useQuery({
    queryKey: ["job-openings"],
    queryFn: async () => {
      const response = await fetchJobOpenings({ page: 1, limit: 10 });
      return (response.jobs ?? []).map(mapToJobOpening); // ← .jobs not .data
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Only fall back to constants on error, never mask loading or empty states
  const jobs = query.isError ? JOB_OPENINGS : (query.data ?? []);

  return {
    jobs,
    isLoading: query.isPending,  // ← v5: isPending, not isLoading
    isFetching: query.isFetching,
    isError: query.isError,
    isUsingFallback: query.isError,
    error: query.error as Error | null,
  };
}