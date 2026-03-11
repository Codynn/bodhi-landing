"use client";

import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoticeModal } from "@/components/shared/NoticeModel";
import { useNotices } from "@/hooks/useNotices";
import type { Notice } from "@/types/home/notices.types";
import { NoticeItem } from "@/services/api/noticesApi";

// ── Animations ────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

// ── noticeType → readable label ───────────────────────────────────
const NOTICE_TYPE_LABELS: Record<string, string> = {
  DEFAULT:        "General",
  FEE_DUE:        "Fee Due",
  EXAM_SCHEDULED: "Exam",
  HOLIDAY:        "Holiday",
  EVENT:          "Event",
};

function formatNoticeType(type?: string): string {
  if (!type) return "General";
  return NOTICE_TYPE_LABELS[type] ?? type.replace(/_/g, " ");
}

function toModalNotice(item: NoticeItem): Notice {
  return {
    id: item._id as unknown as number,
    title: item.title,
    description: item.content,
    category: formatNoticeType(item.noticeType),
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  } as Notice;
}

// ── Skeleton card ─────────────────────────────────────────────────
function SkeletonCard(): React.JSX.Element {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-5/6 bg-gray-100 rounded" />
        <div className="h-4 w-4/6 bg-gray-100 rounded" />
      </div>
      <div className="h-4 w-24 bg-gray-200 rounded mt-1" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
export default function NoticesSection(): React.JSX.Element {
  const [selected, setSelected] = useState<Notice | null>(null);

  // Fetch exactly 6 notices — no pagination needed
  const { notices, isLoading, isFetching, isError, error } = useNotices({
    page:  1,
    limit: 6,
  });

  return (
    <React.Fragment>
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

          {/* Page title */}
          <motion.h1
            className="text-center font-bold text-gray-900 tracking-tight text-[32px] sm:text-[34px] lg:text-[40px] mb-10 sm:mb-12"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Notices
          </motion.h1>

          {/* Error */}
          {isError && (
            <div className="text-center py-16">
              <p className="text-[16px] lg:text-[18px] text-red-500 font-medium">
                {error?.message ?? "Failed to load notices. Please try again later."}
              </p>
            </div>
          )}

          {/* Grid */}
          {!isError && (
            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 transition-opacity duration-300 " +
                (isFetching && !isLoading ? "opacity-60" : "opacity-100")
              }
            >
              {/* Skeletons */}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}

              {/* Cards */}
              {!isLoading &&
                notices.map((notice: NoticeItem) => (
                  <Card
                    key={notice._id}
                    onClick={() => setSelected(toModalNotice(notice))}
                    className="bg-white border border-gray-200 rounded-xl shadow-none hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                  >
                    <CardContent className="flex flex-col gap-3 px-5 py-5">

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-[13px] lg:text-[14px] font-medium text-gray-500 border-gray-300 rounded-sm px-2 py-0.5"
                        >
                          {formatNoticeType(notice.noticeType)}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[13px] lg:text-[14px] text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(notice.createdAt).toLocaleDateString("en-US", {
                              year:  "numeric",
                              month: "short",
                              day:   "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-[17px] sm:text-[16px] lg:text-[19px] font-bold text-gray-800 leading-snug group-hover:text-[#7B1C1C] transition-colors">
                        {notice.title}
                      </h3>

                      <p className="text-[15px] sm:text-[14px] lg:text-[16px] text-gray-500 leading-relaxed line-clamp-3">
                        {notice.content}
                      </p>

                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          setSelected(toModalNotice(notice));
                        }}
                        className="inline-flex items-center gap-1 text-[14px] lg:text-[15px] font-semibold text-[#7B1C1C] hover:text-[#C0392B] transition-colors mt-1 w-fit"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                    </CardContent>
                  </Card>
                ))}

              {/* Empty state */}
              {!isLoading && notices.length === 0 && (
                <div className="col-span-3 text-center py-16">
                  <p className="text-[16px] lg:text-[18px] text-gray-400">
                    No notices available at the moment.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* View All link */}
          {!isLoading && notices.length > 0 && (
            <div className="flex justify-center mt-10 sm:mt-12">
              <Link
                href="/notices"
                className="inline-flex items-center gap-1.5 text-[15px] lg:text-[16px] font-semibold text-[#7B1C1C] hover:text-[#C0392B] transition-colors"
              >
                View All Notices
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </section>

      <NoticeModal notice={selected} onClose={() => setSelected(null)} />
    </React.Fragment>
  );
}