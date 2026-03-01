'use client'

import { WhyChooseCard } from '@/components/shared/WhyChooseCard'
import { PARENT_CHOOSE_CONTENT, WHY_CHOOSE_FEATURES } from '@/constants/home/why-choose.constants'
import { motion, Variants } from 'framer-motion'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}



export function ParentChooseSection() {
  const { label, heading, description, descriptionB } = PARENT_CHOOSE_CONTENT

  return (
    <section className="w-full">
      {/* Top divider */}
      <div className="w-full border-t border-white/10" />

      <div
        className="
          mx-auto w-full
          max-w-7xl
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32
          pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36
        "
      >
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-10 xl:gap-14 2xl:gap-20 items-start">

          {/* ── Left: Text content ── */}
          <div className="w-full lg:w-[38%] xl:w-[36%] 2xl:w-[34%] flex-shrink-0">

            {/* Label */}
            <motion.p
              className="
                font-semibold tracking-[0.18em] uppercase text-[#8F3648]
                text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] 2xl:text-[22px]
                mb-3 sm:mb-4 2xl:mb-5
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              custom={0}
            >
              {label}
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="text-[#8F3648]
                font-bold leading-[1.1]
                text-[26px] sm:text-[32px] md:text-[36px] lg:text-[36px] xl:text-[42px] 2xl:text-[54px]
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

            {/* Description A */}
            <motion.p
              className="
                text-gray-900 leading-[1.85] sm:leading-[1.9] 2xl:leading-[2]
                text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] 2xl:text-[22px]
                mb-5 sm:mb-6 2xl:mb-7
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.2}
            >
              {description}
            </motion.p>

            {/* Description B */}
            {descriptionB && (
              <motion.p
                className="
                  text-gray-900 leading-[1.85] sm:leading-[1.9] 2xl:leading-[2]
                  text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] 2xl:text-[22px]
                "
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                custom={0.3}
              >
                {descriptionB}
              </motion.p>
            )}
          </div>

          {/* ── Right: 2×2 card grid ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-5 xl:gap-6 2xl:gap-8">
            {WHY_CHOOSE_FEATURES.map((feature) => (
              <WhyChooseCard
                key={feature.title}
                {...feature}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}