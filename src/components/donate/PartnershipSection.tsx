'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { PARTNERSHIP_OPPORTUNITIES_CONTENT } from '@/constants/donate/partnership.constants'
import { PartnershipOpportunitiesContent } from '@/types/donate/partnership.types'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

interface partnershipProps {
   data?:PartnershipOpportunitiesContent
}

export function PartnershipOpportunitiesSection({data}:partnershipProps) {
     
  const content = {
    tag: data?.tag ?? PARTNERSHIP_OPPORTUNITIES_CONTENT.tag,
    heading: data?.heading ?? PARTNERSHIP_OPPORTUNITIES_CONTENT.heading,
    description:
      data?.description ?? PARTNERSHIP_OPPORTUNITIES_CONTENT.description,
    cards: data?.cards ?? PARTNERSHIP_OPPORTUNITIES_CONTENT.cards,
  }


  const firstRow = content.cards.slice(0, 3)
  const secondRow = content.cards.slice(3)

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full
          max-w-7xl
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
              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] 
              mb-3
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            custom={0}
          >
            {content.tag}
          </motion.p>

          <motion.h2
            className="
              font-bold text-[#8F3648] leading-tight
              text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]
              mb-4 sm:mb-5
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            custom={0.1}
          >
            {content.heading}
          </motion.h2>

          <motion.p
            className="
              text-gray-600 leading-[1.8] mx-auto
              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
              max-w-[80vw]
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            custom={0.18}
          >
            {content.description}
          </motion.p>
        </div>

        {/* ── Row 1: 3 cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4  mb-8 lg:mb-10 xl:mb-12">
          {firstRow.map((card, i) => (
            <PartnershipCard key={card.title} card={card} delay={0.22 + i * 0.1} />
          ))}
        </div>

        {/* ── Row 2: 2 cards centered ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-4 lg:w-2/3 lg:mx-auto">
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
          text-[18px] sm:text-[20px] md:text-[24px] lg:text-[20px]
        "
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="
          text-gray-600 
          text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-medium
        "
      >
        {card.description}
      </p>
    </motion.div>
  )
}