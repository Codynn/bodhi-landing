'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { CAREER_HERO_CONTENT } from '@/constants/career/careerhero.constants'
import { CareerHeroContent } from '@/types/career/careerhero.types'

// ── Text scale ───────────────────────────────────────────────
const TEXT = 'text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]'

// ── Animation ────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
}

// ─────────────────────────────────────────────────────────────
export function CareerHeroSection({
  data,
}: {
  data?: Partial<CareerHeroContent>
}) {


  const content: CareerHeroContent = {
    breadcrumb: data?.breadcrumb ?? CAREER_HERO_CONTENT.breadcrumb,
    pageTitle: data?.pageTitle ?? CAREER_HERO_CONTENT.pageTitle,
    poweredByLogo: data?.poweredByLogo ?? CAREER_HERO_CONTENT.poweredByLogo,
    heading: data?.heading ?? CAREER_HERO_CONTENT.heading,
    paragraphs: data?.paragraphs ?? CAREER_HERO_CONTENT.paragraphs,
    staffImage: data?.staffImage ?? CAREER_HERO_CONTENT.staffImage,
  }

  return (
    <section className="w-full bg-white">

      {/* ── Header ─────────────────────────────── */}
      <div className="bg-gray-50 mb-5 max-w-screen w-full py-4">

        {/* Breadcrumb */}
        <motion.nav
          className={`flex justify-center items-center gap-1.5 ${TEXT} text-gray-500 mb-3 sm:mb-4`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          aria-label="Breadcrumb"
        >
          {content.breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}

              {i < content.breadcrumb.length - 1 ? (
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

        {/* Page Title */}
        <motion.h1
          className="text-center font-bold text-gray-900 tracking-tight
          text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] mb-4 sm:mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.08}
        >
          {content.pageTitle}
        </motion.h1>

        {/* Powered by */}
        <motion.div
          className="flex justify-center items-center mb-10 gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.14}
        >
          <span className={`${TEXT} text-gray-900 font-bold`}>
            Powered by
          </span>

          <Link
            href={content.poweredByLogo.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative h-5 sm:h-6 xl:h-7 2xl:h-9 w-auto aspect-[3/1]">
              <Image
                src={content.poweredByLogo.src}
                alt={content.poweredByLogo.alt}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ── Body ─────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pb-16">

        {/* Heading + Paragraphs */}
        <div className="text-center flex flex-col gap-5 mb-12">

          <motion.h2
            className="font-bold text-[#8F3648]
            text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            {content.heading}
          </motion.h2>

          {content.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={`${TEXT} text-gray-600 leading-relaxed`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 + i * 0.08}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Image */}
        <motion.div
          className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <Image
            src={content.staffImage.src}
            alt={content.staffImage.alt}
            fill
            className="object-cover"
          />
        </motion.div>

      </div>
    </section>
  )
}