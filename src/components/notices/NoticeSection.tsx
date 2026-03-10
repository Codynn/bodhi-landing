"use client";

import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NOTICES_CONTENT } from "@/constants/home/notices.constants";
import { NoticeModal } from "@/components/shared/NoticeModel";
import { NoticePagination } from "./NoticePagination";
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

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Notices", href: "/notices" },
];

const ITEMS_PER_PAGE = 6;

// ── noticeType → readable label ───────────────────────────────────
const NOTICE_TYPE_LABELS: Record<string, string> = {
  DEFAULT: "General",
  FEE_DUE: "Fee Due",
  EXAM_SCHEDULED: "Exam",
  HOLIDAY: "Holiday",
  EVENT: "Event",
};

// ✅ Guard against undefined/null noticeType
function formatNoticeType(type?: string): string {
  if (!type) return "General";
  return NOTICE_TYPE_LABELS[type] ?? type.replace(/_/g, " ");
}

/**
 * Adapts API NoticeItem → the Notice shape NoticeModal already expects.
 * Keeps NoticeModal untouched.
 */
function toModalNotice(item: NoticeItem): Notice {
  return {
    id: item._id as unknown as number, // Notice.id is number in your types
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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { notices, isLoading, isFetching, isError, error } = useNotices({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const hasMorePages = notices.length === ITEMS_PER_PAGE;
  const totalPages = hasMorePages ? currentPage + 1 : currentPage;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

          {/* Breadcrumb */}
          <motion.nav
            className="flex justify-center items-center gap-1.5 text-sm sm:text-base lg:text-lg text-gray-500 mb-4 sm:mb-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            aria-label="Breadcrumb"
          >
            {BREADCRUMB.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {i < BREADCRUMB.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#8F3648] transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#8F3648] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

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
              {isLoading &&
                Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}

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
                              year: "numeric",
                              month: "short",
                              day: "numeric",
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

              {!isLoading && notices.length === 0 && (
                <div className="col-span-3 text-center py-16">
                  <p className="text-[16px] lg:text-[18px] text-gray-400">
                    No notices available at the moment.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-10 sm:mt-12">
              <NoticePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

        </div>
      </section>

      <NoticeModal notice={selected} onClose={() => setSelected(null)} />
    </React.Fragment>
  );
}