'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import {
  SCHOOL_FAMILY_CONTENT,
  SCHOOL_FAMILY_MEMBERS,
} from '@/constants/about/schoolfamily.constants'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

const fadeInCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
}



export function SchoolFamilyHeroSection() {
  const { breadcrumb, pageTitle, sectionTag, heading } = SCHOOL_FAMILY_CONTENT

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full
          max-w-screen
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          sm:pt-10 pb-14 sm:pb-18 lg:pb-24
        "
      >

        {/* ── Breadcrumb — centred, same pattern as IntroductionHeroSection ── */}
        <motion.nav
          className="
            flex justify-center items-center gap-1.5
            text-sm sm:text-base md:text-base
            lg:text-lg xl:text-xl 2xl:text-2xl
            text-gray-500 mb-4 sm:mb-5
          "
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
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              {i < breadcrumb.length - 1 ? (
                <a
                  href={crumb.href}
                  className="hover:text-[#8F3648] transition-colors duration-200"
                >
                  {crumb.label}
                </a>
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
            mb-8 sm:mb-10 lg:mb-14
          "
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {pageTitle}
        </motion.h1>

        {/* ── Section Tag + Sub-heading ── */}
        <motion.div
          className="text-center mb-8 sm:mb-10 lg:mb-12 2xl:mb-16"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <p
            className="
              font-semibold tracking-[0.18em] uppercase text-[#8F3648]
              text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] 2xl:text-[15px]
              mb-2 sm:mb-3
            "
          >
            {sectionTag}
          </p>
          <h2
            className="
              font-bold text-[#8F3648] leading-tight
              text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[44px]
            "
          >
            {heading}
          </h2>
        </motion.div>

        {/* ── Photo Grid ── */}
        {/*
          Layout mirrors Figma:
          mobile:   2 columns
          sm:       3 columns
          md:       4 columns
          lg+:      5 columns
          2xl:      5 columns (larger cards)
        */}
        <div
          className="
            grid gap-5
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8
          "
        >
          {SCHOOL_FAMILY_MEMBERS.map((member, i) => (
            <motion.div
              key={`${member.name}-${i}`}
              className="flex flex-col items-center text-center bg-gray-100 px-6 py-6 rounded-2xl"
              variants={fadeInCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.05 * (i % 5)}
            >
              {/* Photo */}
              <div
                className="
                  relative w-full overflow-hidden rounded-xl
                  aspect-[3/4]
                  mb-2 sm:mb-3 2xl:mb-4
                  shadow-sm
                "
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="
                    (max-width: 640px)  50vw,
                    (max-width: 768px)  33vw,
                    (max-width: 1024px) 25vw,
                    20vw
                  "
                />
              </div>

              {/* Name */}
              <p
                className="
                  font-semibold text-[#8F3648] leading-tight
                  text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[18px]
                  mb-0.5
                "
              >
                {member.name}
              </p>

              {/* Role */}
              <p
                className="
                  text-gray-500
                  text-[11px] sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[15px]
                "
              >
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}