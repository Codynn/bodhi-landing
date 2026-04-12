'use client'

import { TWO_WAYS_CONTENT } from '@/constants/donate/twodaysdonation.constants'
import { TwoWaysContent } from '@/types/donate/twodaysdonation.types'
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


interface TwoWaysContentProps {
  data?: TwoWaysContent
}

 


export function TwoWaysDonationSection({data}:TwoWaysContentProps) {
 
    // fallback system
  const content = {
    tag: data?.tag ?? TWO_WAYS_CONTENT.tag,
    heading: data?.heading ?? TWO_WAYS_CONTENT.heading,
    description: data?.description ?? TWO_WAYS_CONTENT.description,
    columns: data?.columns ?? TWO_WAYS_CONTENT.columns,
  }

      
   const left = content.columns[0]
   const right = content.columns[1]

  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32 pb-14 sm:pb-18 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-36 font-semibold">

        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-14 2xl:mb-16">
          <motion.p
            className="font-semibold text-center tracking-[0.18em] uppercase text-[#425190]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {content.tag}
          </motion.p>

          <motion.h2
            className="font-bold text-[#8F3648] text-center text-[32px] lg:text-[40px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {content.heading}
          </motion.h2>

          <motion.p
            className="text-gray-600 text-center max-w-[80vw] mx-auto"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {content.description}
          </motion.p>
        </div>

        {/* Two Columns */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">

          {/* LEFT */}
          <div className="flex-1 lg:pr-10">
            <motion.h3 className="font-bold text-gray-900 text-[24px] mb-2" variants={fadeUp}>
              {left.title}
            </motion.h3>

            <motion.p className="text-gray-800 mb-5" variants={fadeUp}>
              {left.subtitle}
            </motion.p>

            <ul className="flex flex-col gap-4">
              {left.points.map((point, i) => (
                <motion.li key={i} className="flex gap-3" variants={fadeUp}>
                  <span className="w-6 h-6 bg-[#2D6A2D] rounded-full flex items-center justify-center">
                    <ArrowRight className="text-white w-4 h-4" />
                  </span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex-1 lg:pl-10">
            <motion.h3 className="font-bold text-gray-900 text-[24px] mb-2" variants={fadeUp}>
              {right.title}
            </motion.h3>

            <motion.p className="text-gray-800 mb-5" variants={fadeUp}>
              {right.subtitle}
            </motion.p>

            <ul className="flex flex-col gap-4">
              {right.points.map((point, i) => (
                <motion.li key={i} className="flex gap-3" variants={fadeUp}>
                  <span className="w-6 h-6 bg-[#5D8D42] rounded-full flex items-center justify-center">
                    <ArrowRight className="text-white w-4 h-4" />
                  </span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}