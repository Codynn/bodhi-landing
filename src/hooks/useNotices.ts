"use client";

import { fetchNotices, NoticeItem, NoticeQueryParams } from "@/services/api/noticesApi";
import { useQuery } from "@tanstack/react-query";

// ─── Hook ─────────────────────────────────────────────────────────
export function useNotices(params: NoticeQueryParams = {}) {
  const { page = 1, limit = 10 } = params;

  const query = useQuery({
    queryKey: ["notices", page, limit],
    queryFn:  async () => {
      const response = await fetchNotices({ page, limit });

      // ── Console log for inspection ────────────────────────────
      console.log("─── [useNotices] Raw API response ───────────────");
      console.log("success :", response.success);
      console.log("message :", response.message);
      console.log("data    :", response.data);          // flat NoticeItem[]
      console.log("count   :", response.data?.length);
      if (response.data?.length) {
        console.log("first item fields:", Object.keys(response.data[0]));
        console.log("first item sample:", response.data[0]);
      }
      console.log("─────────────────────────────────────────────────");

      return response;
    },
    placeholderData: (prev) => prev,  // no flicker on page change
    staleTime: 1000 * 60 * 5,         // cache 5 min
  });

  // data is a flat NoticeItem[] — unwrap safely
  const notices = (query.data?.data ?? []) as NoticeItem[];

  return {
    notices,
    count:      notices.length,

    isLoading:  query.isLoading,
    isFetching: query.isFetching,
    isError:    query.isError,
    error:      query.error as Error | null,
  };
}