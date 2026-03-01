'use client'

import { MISSION_VISION_CONTENT } from '@/constants/about/missionvision.constants'
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

export function MissionVisionSection() {
  const { items } = MISSION_VISION_CONTENT

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                className="flex flex-col bg-gray-100 px-6 py-8 rounded-lg"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                custom={i * 0.15}
              >
                {/* Icon circle */}
                <div
                  className="
                    flex items-center justify-center rounded-full flex-shrink-0
                    w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16
                    lg:w-[72px] lg:h-[72px] xl:w-20 xl:h-20 2xl:w-24 2xl:h-24
                    mb-2
                  "
                  style={{ backgroundColor: item.iconBg }}
                >
                  <Icon
                    className="
                      w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8
                      lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12
                      text-white
                    "
                    strokeWidth={1.6}
                  />
                </div>

                {/* Title */}
                <motion.h3
                  className="
                    font-bold text-[#8F3648] leading-tight
                    text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[32px] 2xl:text-[40px]
                    mb-2
                  "
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  custom={i * 0.15 + 0.1}
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="
                    text-gray-900 leading-[1.85] sm:leading-[1.9] 2xl:leading-[2]
                    text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                  "
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  custom={i * 0.15 + 0.2}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}