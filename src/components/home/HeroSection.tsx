'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { HERO_CONTENT, HERO_STATS } from '@/constants/home/hero.constants'
import { AnimatedStat } from '@/components/home/AnimatedStat'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.3 },
  },
}

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.6 },
  },
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.8 },
  },
}

const mobileStatsVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.7 },
  },
}

export function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14">

        {/* Heading */}
        <motion.h1
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#8F3648] leading-tight tracking-tight max-w-4xl mx-auto mb-8 sm:mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Shaping Confident Learners for a Better Tomorrow
        </motion.h1>

        {/* Image + overlays */}
        <div className="relative w-full">

          {/* School Image */}
          <motion.div
            className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/home/school.png"
              alt={HERO_CONTENT.imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
          </motion.div>

          {/* Stats Card — desktop */}
          <motion.div
            className="hidden sm:flex absolute top-1/2 right-0 -translate-y-1/2 flex-col bg-white/95 backdrop-blur-sm rounded-l-2xl shadow-xl overflow-hidden"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  'px-6 py-5 lg:px-8 lg:py-6',
                  i < HERO_STATS.length - 1 ? 'border-b border-gray-100' : '',
                ].join(' ')}
              >
                <div className="[&_span:first-child]:text-[#2D6A2D] [&_span:last-child]:text-gray-500 [&_span:last-child]:text-xs [&_span:first-child]:text-2xl sm:[&_span:first-child]:text-3xl lg:[&_span:first-child]:text-4xl">
                  <AnimatedStat stat={stat} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Arrow Circle */}
          <motion.div
            className="hidden sm:flex absolute bottom-3 left-[-6px] translate-y-1/2 w-14 h-14 lg:w-[72px] lg:h-[72px] bg-white rounded-full items-center justify-center z-10 shadow-md"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#2D6A2D] stroke-[2.5]" />
          </motion.div>

          {/* Stats Row — mobile */}
          <motion.div
            className="sm:hidden mt-4 bg-white rounded-2xl shadow-md border border-gray-100 flex divide-x divide-gray-100"
            variants={mobileStatsVariant}
            initial="hidden"
            animate="visible"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 py-4 [&_span:first-child]:text-[#2D6A2D] [&_span:last-child]:text-gray-500 [&_span:first-child]:text-xl [&_span:last-child]:text-[10px]"
              >
                <AnimatedStat stat={stat} />
              </div>
            ))}
          </motion.div>

        </div>

        {/* Spacing */}
        <div className="pb-10 sm:pb-12" />
      </div>
    </section>
  )
}