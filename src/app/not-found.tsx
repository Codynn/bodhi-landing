'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* ── Decorative background circles ── */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[#8F3648]/5 pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-[#8F3648]/5 pointer-events-none" />
      <div className="absolute top-1/2 left-[-40px] w-[160px] h-[160px] rounded-full bg-[#8F3648]/3 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg xl:max-w-2xl mx-auto">

        {/* ── 404 large number ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mb-4 sm:mb-6"
        >
          <span className="
            font-bold text-[#8F3648] select-none leading-none
            text-[100px] sm:text-[130px] md:text-[160px] lg:text-[180px] xl:text-[200px] 2xl:text-[220px]
          ">
            404
          </span>

          {/* Floating leaf/dot accent */}
          <motion.div
            className="absolute top-4 right-[-16px] sm:right-[-24px] w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#8F3648]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-6 left-[-12px] sm:left-[-20px] w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#8F3648]/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </motion.div>

        {/* ── Tag line ── */}
        <motion.p
          className="
            font-semibold tracking-[0.18em] uppercase text-[#8F3648] mb-3 sm:mb-4
            text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] 2xl:text-[15px]
          "
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          PAGE NOT FOUND
        </motion.p>

        {/* ── Heading ── */}
        <motion.h1
          className="
            font-bold text-gray-900 leading-tight mb-4 sm:mb-5
            text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[44px]
          "
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
        >
          Oops! Looks like you took a wrong turn.
        </motion.h1>

        {/* ── Subtext ── */}
        <motion.p
          className="
            text-gray-500 leading-relaxed mb-8 sm:mb-10
            text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
          "
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          The page you are looking for might have been moved, renamed, or does not exist.
          Let us help you find your way back.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.38 }}
        >
          {/* Primary — Go Home */}
          <Link
            href="/"
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              bg-[#8B1A1A] hover:bg-[#7A1717] text-white
              rounded-full px-7 py-3
              text-[12px] sm:text-[14px] md:text-[15px] xl:text-[16px] 2xl:text-[18px]
              font-semibold tracking-wide
              shadow-[0_6px_0_#5E1010]
              hover:shadow-[0_4px_0_#5E1010]
              active:shadow-[0_0px_0_#5E1010]
              hover:translate-y-[2px]
              active:translate-y-[6px]
              transition-all duration-150
            "
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            Go to Homepage
          </Link>

          {/* Secondary — Go Back */}
          <button
            onClick={() => window.history.back()}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              border border-[#8F3648] text-[#8F3648]
              hover:bg-[#8F3648] hover:text-white
              rounded-full px-7 py-3
              text-[12px] sm:text-[14px] md:text-[15px] xl:text-[16px] 2xl:text-[18px]
              font-semibold tracking-wide
              transition-all duration-200
            "
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            Go Back
          </button>
        </motion.div>


      </div>


    </main>
  )
}