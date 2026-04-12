'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EDUCATION_CHANGES_LIVES_CONTENT } from '@/constants/donate/educationchange.constants'
import { EducationChangesLivesContent } from '@/types/donate/educationchange.types'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
}

interface educationChangesProps{
   data?:EducationChangesLivesContent
}

export function EducationChangesLivesSection({data}:educationChangesProps) {
      
      const content = {
    tag: data?.tag ?? EDUCATION_CHANGES_LIVES_CONTENT.tag,
    heading: data?.heading ?? EDUCATION_CHANGES_LIVES_CONTENT.heading,
    description:
      data?.description ?? EDUCATION_CHANGES_LIVES_CONTENT.description,
    points: data?.points ?? EDUCATION_CHANGES_LIVES_CONTENT.points,
    closingText:
      data?.closingText ?? EDUCATION_CHANGES_LIVES_CONTENT.closingText,
    image: data?.image ?? EDUCATION_CHANGES_LIVES_CONTENT.image,
  }

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full
          max-w-7xl
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32
          pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36
        "
      >
        <div className="flex flex-col lg:flex-row items-start gap-2 lg:gap-4 font-semibold">

          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 min-w-0">

            {/* Tag */}
            <motion.p
              className="
                font-semibold tracking-[0.18em] uppercase text-[#425190]
                text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              custom={0}
            >
              {content.tag}
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="
                font-bold text-[#8F3648] leading-tight
                text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] mb-1
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              custom={0.1}
            >
              {content.heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="
                text-gray-600 leading-[1.8] sm:leading-[1.85] 2xl:leading-[1.95]
                text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] mb-1
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.18}
            >
              {content.description}
            </motion.p>

            {/* Bullet Points */}
            <ul className="flex flex-col gap-3 sm:gap-4 2xl:gap-5 mb-1">
              {content.points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                  custom={0.24 + i * 0.07}
                >
                  <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#5D8D42] flex items-center justify-center">
                    <ArrowRight
                      className="text-white w-3.5 h-3.5 sm:w-4 sm:h-4"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span
                    className="
                      text-gray-700 leading-[1.75]
                      text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
                    "
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Closing Text */}
            <motion.p
              className="
                text-gray-600 leading-[1.8] sm:leading-[1.85]
                text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] 
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              custom={0.55}
            >
              {content.closingText}
            </motion.p>
          </div>

          {/* ── RIGHT: Image ── */}
          <motion.div
            className="
              w-full lg:w-[50%]
              flex-shrink-0
            "
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            custom={0.2}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden shadow-md">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}