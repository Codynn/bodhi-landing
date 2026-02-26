'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

interface NoticePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function NoticePagination({
  currentPage,
  totalPages,
  onPageChange,
}: NoticePaginationProps) {
  const getPages = (): (number | '...')[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | '...')[] = []
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) pages.push(i)
    if (end < totalPages - 1) pages.push('...')
    if (end < totalPages) pages.push(totalPages)
    if (pages[0] !== 1) pages.unshift(1)

    return pages
  }

  const pages = getPages()

  const btnBase = `
    w-8 h-8 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11
    flex items-center justify-center rounded-md
    border border-gray-200 text-gray-500
    hover:border-[#8F3648] hover:text-[#8F3648] hover:bg-transparent
    transition-colors duration-150
  `

  return (
    <motion.div
      className="pb-14 sm:pb-16 lg:pb-20"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
    >
      <Pagination>
        <PaginationContent className="gap-1 sm:gap-1.5">

          {/* Prev — arrow only */}
          <PaginationItem>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`${btnBase} ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>
          </PaginationItem>

          {/* Page numbers */}
          {pages.map((page, i) =>
            page === '...' ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis
                  className="
                    w-8 h-8 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11
                    text-[13px] sm:text-[14px] 2xl:text-[17px] text-gray-400
                  "
                />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page as number)}
                  isActive={currentPage === page}
                  aria-current={currentPage === page ? 'page' : undefined}
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11
                    text-[13px] sm:text-[14px] 2xl:text-[17px] font-medium
                    border transition-colors duration-150 cursor-pointer
                    ${
                      currentPage === page
                        ? 'bg-[#8F3648] text-white border-[#8F3648] hover:bg-[#8F3648] hover:text-white'
                        : 'border-gray-200 text-gray-600 hover:border-[#8F3648] hover:text-[#8F3648] hover:bg-transparent'
                    }
                  `}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next — arrow only */}
          <PaginationItem>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className={`${btnBase} ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </motion.div>
  )
}