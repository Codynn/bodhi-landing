import { useQuery } from "@tanstack/react-query";
import { hirynnAxiosInstance } from "@/services/axios";
import { JobOpening } from "@/types/career/careeropening.types";

const SCHOOL_ID = process.env.NEXT_PUBLIC_HIRYNN_ID ?? "";

// "FULL_TIME" → "Full Time"
function formatEmploymentType(type: string): string {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function useJobOpenings() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["job-openings", SCHOOL_ID],
    queryFn:  async () => {
      const res = await hirynnAxiosInstance.get(
        `/school/job/${SCHOOL_ID}`,
        { params: { page: 1, limit: 20 } },
      );
      return res.data;
    },
    enabled: !!SCHOOL_ID,
  });

  const jobs: JobOpening[] = (data?.jobs ?? []).map((item: any) => ({
    id:          item.id,                                    // ✅ API returns "id" not "_id"
    title:       item.title,
    description: item.description,
    type:        formatEmploymentType(item.employmentType ?? ""), // ✅ API field is "employmentType"
    date:        new Date(item.createdAt).toLocaleDateString("en-US", {
                   year: "numeric", month: "short", day: "numeric",
                 }),
  }));

  return { jobs, isLoading, isError };
}