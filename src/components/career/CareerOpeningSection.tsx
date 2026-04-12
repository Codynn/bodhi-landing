
'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { ArrowUpRight, CalendarDays, ArrowRight } from 'lucide-react'

import { CAREER_OPENINGS_CONTENT } from '@/constants/career/careeropening.constants'
import { JobOpening } from '@/types/career/careeropening.types'
import { useJobOpenings } from '@/hooks/useJobOpenings'

const TEXT = 'text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]'
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE, delay: d },
  }),
}

// ── Skeleton Card ─────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-gray-100 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-3 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-4/5 bg-gray-200 rounded" />
      </div>
      <div className="h-6 w-24 bg-gray-200 rounded-full" />
      <div className="border-t border-gray-200" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-9 w-28 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

// ── Job Card ──────────────────────────────────────────────────────
function JobCard({ job, index }: { job: JobOpening; index: number }) {
  return (
    <motion.div
      className="bg-gray-100 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 2xl:px-8 2xl:py-7 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow duration-200"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      custom={index * 0.06}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-gray-900 leading-snug flex-1 text-[20px] sm:text-[20px] md:text-[20px] lg:text-[22px]">
          {job.title}
        </h3>
        <Link
          href={job.href}
          aria-label={`View details for ${job.title}`}
          className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 rounded-full bg-[#8F3648] text-white flex items-center justify-center hover:bg-[#3D171F] transition-colors duration-150"
        >
          <ArrowUpRight className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" strokeWidth={2} />
        </Link>
      </div>

      <p className={`${TEXT} text-gray-500 leading-relaxed line-clamp-2`}>
        {job.description}
      </p>

      <div>
        <span className="inline-block border border-gray-300 rounded-full px-3 py-0.5 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-gray-600 font-medium">
          {job.type}
        </span>
      </div>

      <div className="border-t border-gray-100" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-gray-400">
          <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-[16px] sm:text-[16px] lg:text-[18px]">{job.date}</span>
        </div>
        <Link
          href={job.href}
          className="flex items-center gap-1.5 text-[16px] sm:text-[16px] lg:text-[18px] font-semibold text-white bg-[#8F3648] hover:bg-[#3D171F] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-[0_4px_0_#5E1010] hover:shadow-[0_2px_0_#5E1010] active:shadow-none active:translate-y-[4px] hover:translate-y-[2px] transition-all duration-150"
        >
          View Details
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </motion.div>
  )
}

// ── Main Section ──────────────────────────────────────────────────
export function CareerOpeningsSection() {
  // 🧠 HYBRID FALLBACK SYSTEM
  const { sectionHeading, emptyState } = CAREER_OPENINGS_CONTENT
  const { jobs, isLoading } = useJobOpenings()
  const isEmpty = !isLoading && jobs.length === 0

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pb-16 sm:pb-20 lg:pb-24 2xl:pb-32">

        <motion.h2
          className="text-center font-bold text-[#8F3648] text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] mb-8 sm:mb-10 lg:mb-12 2xl:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          custom={0}
        >
          {sectionHeading}
        </motion.h2>

        {/* Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6 mb-5 sm:mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Job Cards */}
        {!isLoading && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6 mb-5 sm:mb-6">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        )}

        {/* Empty State / Submit CV Banner */}
        <motion.div
          className="border border-gray-200 rounded-2xl px-5 py-5 sm:px-7 sm:py-6 md:px-8 2xl:px-10 2xl:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          custom={0.1}
        >
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <p className="font-bold text-gray-800 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]">
              {emptyState.heading}
            </p>
            <p className={`${TEXT} text-gray-500 leading-relaxed`}>
              {emptyState.subtext}
            </p>
          </div>

          <Link
            href={emptyState.submitHref}
            className="shrink-0 flex items-center gap-2 text-[16px] sm:text-[16px] lg:text-[18px] font-semibold text-white bg-[#8F3648] hover:bg-[#3D171F] px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-[0_5px_0_#5E1010] hover:shadow-[0_3px_0_#5E1010] active:shadow-none active:translate-y-[5px] hover:translate-y-[2px] transition-all duration-150 w-full sm:w-auto justify-center"
          >
            {emptyState.submitLabel}
            <ArrowRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}