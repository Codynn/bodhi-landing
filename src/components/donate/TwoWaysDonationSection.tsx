'use client'

import { TWO_WAYS_CONTENT } from '@/constants/donate/twodaysdonation.constants'
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

export function TwoWaysDonationSection() {
  const { tag, heading, description, left, right } = TWO_WAYS_CONTENT

  return (
    <section className="w-full bg-white">
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32
          pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36
          font-semibold
        "
      >
        {/* ── Header ── */}
        <div className="mb-10 sm:mb-12 lg:mb-14 2xl:mb-16">
          <motion.p
            className="
              font-semibold text-center tracking-[0.18em] uppercase text-[#425190]
              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
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
              text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] text-center
              mb-5 sm:mb-6
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
              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
              max-w-[80vw] text-center
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

        {/* ── Two Columns ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">

          {/* ── LEFT ── */}
          <div className="flex-1 lg:pr-10 xl:pr-14 2xl:pr-18">
            <motion.h3
              className="
                font-bold text-gray-900
                text-[22px] sm:text-[24px] md:text-[24px] lg:text-[30px]
                mb-2 sm:mb-3
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.2}
            >
              {left.title}
            </motion.h3>

            <motion.p
              className="
                font-semibold text-gray-800 leading-snug
                 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
                mb-5 sm:mb-6
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.26}
            >
              {left.subtitle}
            </motion.p>

            <ul className="flex flex-col gap-4 sm:gap-5 2xl:gap-6">
              {left.points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 sm:gap-4"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                  custom={0.3 + i * 0.07}
                >
                  <span className="flex-shrink-0 mt-0.5 sm:mt-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2D6A2D] flex items-center justify-center">
                    <ArrowRight className="text-white w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                  </span>
                  <span
                    className="
                      text-gray-700 leading-[1.75] sm:leading-[1.8]
                      text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
                    "
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>


          {/* ── RIGHT ── */}
          <div className="flex-1 lg:pl-10 xl:pl-14 2xl:pl-18">
            <motion.h3
              className="
                font-bold text-gray-900
                text-[22px] sm:text-[24px] md:text-[24px] lg:text-[30px]
                mb-2 sm:mb-3
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.22}
            >
              {right.title}
            </motion.h3>

            <motion.p
              className="
                font-semibold text-gray-800 leading-snug
                text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
                mb-5 sm:mb-6
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.28}
            >
              {right.subtitle}
            </motion.p>

            <ul className="flex flex-col gap-4 sm:gap-5 2xl:gap-6">
              {right.points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 sm:gap-4"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                  custom={0.32 + i * 0.07}
                >
                  <span className="flex-shrink-0 mt-0.5 sm:mt-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#5D8D42] flex items-center justify-center">
                    <ArrowRight className="text-white w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={2.5} />
                  </span>
                  <span
                    className="
                      text-gray-700 leading-[1.75] sm:leading-[1.8]
                      text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
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