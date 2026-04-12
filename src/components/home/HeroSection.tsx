'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { HERO_CONTENT } from '@/constants/home/hero.constants'
import { AnimatedStat } from '@/components/home/AnimatedStat'
import { HeroContent } from '@/types/home/hero.types'

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

interface HeroSectionProps {
  data?: HeroContent
}

export function HeroSection({ data }: HeroSectionProps) {
  // fallback to constants if no API data
  const heading  = data?.heading  ?? HERO_CONTENT.heading
  const imageSrc = data?.imageSrc ?? HERO_CONTENT.imageSrc
  const imageAlt = data?.imageAlt ?? HERO_CONTENT.imageAlt
  const stats    = data?.stats    ?? HERO_CONTENT.stats     // ← now works

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14">

        <motion.h1
          className="text-center text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-5xl 2xl:text-6xl font-bold text-[#8F3648] leading-tight tracking-tight max-w-screen mx-auto mb-8 sm:mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {heading}  {/* ← was hardcoded before */}
        </motion.h1>

        <div className="relative w-full">

          <motion.div
            className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={imageSrc}  
              alt={imageAlt} 
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col bg-white/95 backdrop-blur-sm rounded-l-2xl shadow-xl overflow-hidden"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, i) => (   // ← was HERO_STATS before
              <div
                key={stat.label}
                className={[
                  'px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-6',
                  i < stats.length - 1 ? 'border-b border-gray-100' : '',
                ].join(' ')}
              >
                <div className="
                  [&_span:first-child]:text-[#2d6a2d]
                  [&_span:first-child]:text-[22px]
                  sm:[&_span:first-child]:text-[28px]
                  md:[&_span:first-child]:text-[34px]
                  lg:[&_span:first-child]:text-[40px]
                  xl:[&_span:first-child]:text-5xl
                  2xl:[&_span:first-child]:text-6xl
                  [&_span:last-child]:text-gray-500
                  [&_span:last-child]:text-[10px]
                  sm:[&_span:last-child]:text-[13px]
                  md:[&_span:last-child]:text-[15px]
                  lg:[&_span:last-child]:text-base
                  xl:[&_span:last-child]:text-lg
                  2xl:[&_span:last-child]:text-xl
                ">
                  <AnimatedStat stat={stat} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-3 left-[-6px] translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 lg:w-[72px] lg:h-[72px] bg-white rounded-full flex items-center justify-center z-10 shadow-md"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#2D6A2D] stroke-[2.5]" />
          </motion.div>

        </div>

        <div className="pb-10 sm:pb-12" />
      </div>
    </section>
  )
}