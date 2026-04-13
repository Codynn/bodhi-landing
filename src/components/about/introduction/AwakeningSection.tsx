'use client'

import { AWAKENING_CONTENT } from '@/constants/about/Awakening.constants'
import { motion, Variants } from 'framer-motion'
import type { AwakeningContent } from '@/types/about/awakening.types'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

interface AwakenigSectionProps {
  data?: AwakeningContent
}

export function AwakeningSection({ data }: AwakenigSectionProps) {
  
  const content = {
    sectionTag:  data?.sectionTag  ?? AWAKENING_CONTENT.sectionTag,
    heading:     data?.heading     ?? AWAKENING_CONTENT.heading,
    paragraphs:  data?.paragraphs  ?? AWAKENING_CONTENT.paragraphs,
    closingLine: data?.closingLine ?? AWAKENING_CONTENT.closingLine,
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full text-center max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32 pb-12 sm:pb-16 md:pb-18 lg:pb-20 xl:pb-24 2xl:pb-32">

        {/* Section Tag */}
        <motion.p
          className="font-semibold tracking-[0.2em] sm:tracking-[0.22em] 2xl:tracking-[0.25em] uppercase text-[#425190] text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] mb-3 sm:mb-4 md:mb-5 2xl:mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          custom={0}
        >
          {content.sectionTag}
        </motion.p>

        {/* Main Heading */}
        <motion.h2
          className="font-bold text-[#8F3648] leading-[1.15] text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] mb-6 sm:mb-8 md:mb-9 lg:mb-10 2xl:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          custom={0.1}
        >
          {content.heading}
        </motion.h2>

        {/* Paragraphs */}
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 2xl:gap-9">
          {content.paragraphs.map((para: string, i: number) => (
            <motion.p
              key={i}
              className="text-gray-900 leading-[1.85] sm:leading-[1.9] 2xl:leading-[2] text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.15 + i * 0.1}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Closing Line */}
        <motion.p
          className="text-gray-900 leading-relaxed font-normal text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] mt-6 sm:mt-7 md:mt-8 2xl:mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          custom={0.35}
        >
          {content.closingLine}
        </motion.p>

      </div>
    </section>
  )
}