'use client'

import { OUR_STORY_CONTENT } from '@/constants/about/ourstory.constants'
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



export function OurStorySection() {
  const { sectionTag, heading, paragraphs } = OUR_STORY_CONTENT

  return (
    <section className="w-full">
      {/* Top divider — subtle separator from previous section */}
      <div className="w-full border-t border-white/10" />

      <div
        className="
          mx-auto w-full text-center
          max-w-screen
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32
          pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36
        "
      >

        {/* Section Tag */}
        <motion.p
          className="
            font-semibold tracking-[0.2em] sm:tracking-[0.22em] 2xl:tracking-[0.25em]
            uppercase text-[#8F3648]
             text-[12px] sm:text-[14px] md:text-[15px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px]
            mb-3 sm:mb-4 md:mb-5 2xl:mb-6
          "
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          custom={0}
        >
          {sectionTag}
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="
            font-bold text-[#8F3648] leading-[1.15]
            text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl
            mb-6 sm:mb-8 md:mb-9 lg:mb-10 2xl:mb-14
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
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 2xl:gap-9">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="
                text-gray-900 leading-[1.85] sm:leading-[1.9] 2xl:leading-[2]
                text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
              "
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

      </div>
    </section>
  )
}