'use client'

import { useState } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NOTICES_CONTENT, NOTICES_DATA } from '@/constants/home/notices.constants'
import { Notice } from '@/types/home/notices.types'
import { NoticeModal } from '@/components/shared/NoticeModel'
import { NoticePagination } from './NoticePagination'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Notices', href: '/notices' },
]

const ITEMS_PER_PAGE = 6

export default function NoticesSection() {
  const [selected, setSelected] = useState<Notice | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(NOTICES_DATA.length / ITEMS_PER_PAGE)
  const paginated = NOTICES_DATA.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

          {/* ── Breadcrumb ── */}
          <motion.nav
            className="
              flex justify-center items-center gap-1.5
              text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
              text-gray-500 mb-4 sm:mb-5
            "
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

          {/* ── Page Title ── */}
          <motion.h1
            className="
              text-center font-bold text-gray-900 tracking-tight
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
              mb-10 sm:mb-12
            "
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Notices
          </motion.h1>


          {/* ── 3-col card grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {paginated.map((notice) => (
              <Card
                key={notice.id}
                onClick={() => setSelected(notice)}
                className="bg-white border border-gray-200 rounded-xl shadow-none hover:shadow-md transition-shadow duration-200 cursor-pointer group"
              >
                <CardContent className="flex flex-col gap-3 px-5 py-5">

                  {/* Badge + Date */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-medium text-gray-500 border-gray-300 rounded-sm px-2 py-0.5"
                    >
                      {notice.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{notice.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-bold text-gray-800 leading-snug group-hover:text-[#7B1C1C] transition-colors">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 leading-relaxed line-clamp-3">
                    {notice.description}
                  </p>

                  {/* Read More */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(notice) }}
                    className="inline-flex items-center gap-1 text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-semibold text-[#7B1C1C] hover:text-[#C0392B] transition-colors mt-1 w-fit"
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
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

      {/* Modal */}
      <NoticeModal notice={selected} onClose={() => setSelected(null)} />
    </>
  )
}