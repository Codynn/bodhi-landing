'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { CAREER_HERO_CONTENT } from '@/constants/career/careerhero.constants'

// ── Text scale ────────────────────────────────────────────────────────────────
const TEXT = 'text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'

// ── Animations ────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
}

export function CareerHeroSection() {
  const { breadcrumb, pageTitle, poweredByLogo, heading, paragraphs, staffImage } =
    CAREER_HERO_CONTENT

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full max-w-screen
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-6 sm:pt-8 md:pt-10
          pb-16 sm:pb-20 lg:pb-24 2xl:pb-32
        "
      >

        {/* ── Breadcrumb ── */}
        <motion.nav
          className={`flex justify-center items-center gap-1.5 ${TEXT} text-gray-500 mb-3 sm:mb-4`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((crumb, i) => (
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
              {i < breadcrumb.length - 1 ? (
                <Link href={crumb.href} className="hover:text-[#8F3648] transition-colors duration-200">
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
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-4 sm:mb-5
          "
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.08}
        >
          {pageTitle}
        </motion.h1>

        {/* ── Powered by badge ── */}
        <motion.div
          className="flex justify-center items-center  mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.14}
        >
          <span className={`${TEXT} text-gray-900 font-bold`}>Powered by</span>
          <Link
            href={poweredByLogo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <div className="relative h-5 sm:h-6 xl:h-7 2xl:h-9 w-auto aspect-[3/1]">
              <Image
                src={poweredByLogo.src}
                alt={poweredByLogo.alt}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </motion.div>

        {/* ── Centered text content ── */}
        <div className="max-w-screen mx-auto text-center flex flex-col gap-5 sm:gap-6 2xl:gap-8 mb-10 sm:mb-12 lg:mb-14 2xl:mb-16">

          {/* Heading */}
          <motion.h2
            className="
              font-bold text-[#8F3648] leading-tight
               text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            custom={0}
          >
            {heading}
          </motion.h2>

          {/* Paragraphs */}
          {paragraphs.map((para: string, i: number) => (
            <motion.p
              key={i}
              className={`${TEXT} text-gray-600 leading-[1.85] sm:leading-[1.9] 2xl:leading-[2]`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -30px 0px' }}
              custom={0.08 + i * 0.08}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* ── Staff Photo ── */}
        <motion.div
          className="
            relative w-full mx-auto overflow-hidden rounded-2xl
            max-w-screen
            aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7]
          "
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          custom={0.1}
        >
          <Image
            src={staffImage.src}
            alt={staffImage.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 860px"
            priority
          />
        </motion.div>

      </div>
    </section>
  )
}