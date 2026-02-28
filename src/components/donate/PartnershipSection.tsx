'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { PARTNERSHIP_OPPORTUNITIES_CONTENT } from '@/constants/donate/partnership.constants'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

export function PartnershipOpportunitiesSection() {
  const { tag, heading, description, cards } = PARTNERSHIP_OPPORTUNITIES_CONTENT

  // Split into rows: first row 3 cards, second row 2 cards centered
  const firstRow = cards.slice(0, 3)
  const secondRow = cards.slice(3)

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full
          max-w-screen
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32
          pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36
          font-semibold
        "
      >
        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14 2xl:mb-16">
          <motion.p
            className="
              font-semibold tracking-[0.18em] uppercase text-[#425190]
              text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
              mb-3
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            custom={0}
          >
            {tag}
          </motion.p>

          <motion.h2
            className="
              font-bold text-[#8F3648] leading-tight
              text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[46px]
              mb-4 sm:mb-5
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            custom={0.1}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="
              text-gray-600 leading-[1.8] mx-auto
              text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
              max-w-[80vw]
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            custom={0.18}
          >
            {description}
          </motion.p>
        </div>

        {/* ── Row 1: 3 cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 mb-8 lg:mb-10 xl:mb-12">
          {firstRow.map((card, i) => (
            <PartnershipCard key={card.title} card={card} delay={0.22 + i * 0.1} />
          ))}
        </div>

        {/* ── Row 2: 2 cards centered ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 lg:w-2/3 lg:mx-auto">
          {secondRow.map((card, i) => (
            <PartnershipCard key={card.title} card={card} delay={0.52 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Card sub-component ──
function PartnershipCard({
  card,
  delay,
}: {
  card: { icon: string; title: string; description: string }
  delay: number
}) {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (d: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: d },
    }),
  }

  return (
    <motion.div
      className="flex flex-col gap-2 bg-gray-50 px-4 py-4 rounded-2xl"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      custom={delay}
    >
      {/* Icon */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 relative flex-shrink-0">
        <Image
          src={card.icon}
          alt={card.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className="
          font-bold text-gray-900 
          text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[32px]
        "
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="
          text-gray-600 
          text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
        "
      >
        {card.description}
      </p>
    </motion.div>
  )
}