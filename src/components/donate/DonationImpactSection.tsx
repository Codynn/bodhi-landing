'use client'

import { DONATION_IMPACT_CONTENT } from '@/constants/donate/donateimpact.constants'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}



export function DonationImpactSection() {
  const { leftTag, heading, paragraphs, rightTag, points } = DONATION_IMPACT_CONTENT

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full
          max-w-screen
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32
          pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36
        "
      >
        {/*
          Layout:
          - Mobile/tablet: stacked (left col on top, right col below)
          - lg+: two equal columns side by side with a divider
        */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-0">

          {/* ── LEFT: How your donation helps ── */}
          <div className="flex-1 lg:pr-12 xl:pr-16 2xl:pr-20">

            {/* Tag */}
            <motion.p
              className="
                font-semibold tracking-[0.18em] uppercase text-[#8F3648]
                text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                mb-3 sm:mb-4 2xl:mb-5
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              custom={0}
            >
              {leftTag}
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="
                font-bold text-[#8F3648] leading-tight
                text-[22px] sm:text-[26px] md:text-[30px] lg:text-[30px] xl:text-[36px] 2xl:text-[46px]
                mb-5 sm:mb-6 md:mb-7 2xl:mb-9
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              custom={0.1}
            >
              {heading}
            </motion.h2>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4 sm:gap-5 2xl:gap-7">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="
                    text-gray-600 leading-[1.8] sm:leading-[1.85] 2xl:leading-[1.95]
                    text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                  "
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  custom={0.15 + i * 0.08}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

        

          {/* ── RIGHT: Where your donation goes ── */}
          <div className="flex-1 lg:pl-12 xl:pl-16 2xl:pl-20">

            {/* Tag */}
            <motion.p
              className="
                font-semibold tracking-[0.18em] uppercase text-[#8F3648]
                text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                mb-5 sm:mb-6 2xl:mb-8
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              custom={0.05}
            >
              {rightTag}
            </motion.p>

            {/* Bullet points with arrow */}
            <ul className="flex flex-col gap-4 sm:gap-5 2xl:gap-7">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 sm:gap-4"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                  custom={0.1 + i * 0.07}
                >
                  {/* Arrow icon */}
                  <span className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <ArrowRight
                      className="
                        text-[#2D6A2D]
                        w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4
                        xl:w-5 xl:h-5 2xl:w-6 2xl:h-6
                      "
                      strokeWidth={2}
                    />
                  </span>

                  {/* Text */}
                  <span
                    className="
                      text-gray-700 leading-[1.75] sm:leading-[1.8] 2xl:leading-[1.9]
                      text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                    "
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}