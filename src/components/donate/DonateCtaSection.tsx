'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { Heart } from 'lucide-react'
import { DONATE_CTA_CONTENT } from '@/constants/donate/donateCta.constants'
import { DonationModal } from './DonationModal'


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
  hidden: { opacity: 0, x: -32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
}

export function DonateCtaSection() {
  const { heading, paragraphs, buttonLabel, image } = DONATE_CTA_CONTENT
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="w-full bg-[#F5F5F0] relative overflow-hidden">
        <div className="mx-auto w-full max-w-screen px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pt-12 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-24 2xl:pt-32">
          <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row items-center">

              {/* LEFT: Illustration */}
              <motion.div
                className="w-full lg:w-[38%] xl:w-[36%] 2xl:w-[34%] flex items-center justify-center px-8 py-10 sm:px-12 sm:py-12 lg:py-0 flex-shrink-0"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                custom={0}
              >
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96">
                  <Image src={image.src} alt={image.alt} fill className="object-contain" />
                </div>
              </motion.div>

              {/* RIGHT: Text + Button */}
              <div className="flex-1 min-w-0 px-6 pb-10 sm:px-10 sm:pb-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16 2xl:px-20 2xl:py-20">
                <motion.h2
                  className="font-bold text-[#8F3648] leading-tight text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[36px] 2xl:text-[44px] mb-5 sm:mb-6"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  custom={0.1}
                >
                  {heading}
                </motion.h2>

                <div className="flex flex-col gap-3 sm:gap-4 mb-7 sm:mb-8 2xl:mb-10">
                  {paragraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      className="text-gray-600 leading-[1.8] sm:leading-[1.85] text-[12px] sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                      custom={0.18 + i * 0.08}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Donate Now — opens modal */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  custom={0.34}
                >
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#8F3648] hover:bg-[#3D171F] text-white rounded-full px-6 py-2.5 text-[13px] sm:text-[14px] md:text-[15px] xl:text-[16px] 2xl:text-[18px] font-medium shadow-[0_6px_0_#5E1010] hover:shadow-[0_4px_0_#5E1010] active:shadow-[0_0px_0_#5E1010] hover:translate-y-[2px] active:translate-y-[6px] transition-all duration-150 cursor-pointer"
                  >
                    {buttonLabel}
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Green hill footer */}
        <div className="relative w-full mt-0 leading-none">
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,100 C200,40 400,130 600,80 C800,30 1000,110 1200,70 C1320,48 1400,80 1440,90 L1440,160 L0,160 Z" fill="#2D6A2D" />
            <path d="M0,130 C150,90 300,150 500,120 C700,90 900,145 1100,115 C1250,95 1370,125 1440,118 L1440,160 L0,160 Z" fill="#3D8B3D" />
            <g fill="#2D6A2D">
              <ellipse cx="180" cy="127" rx="10" ry="6" />
              <ellipse cx="195" cy="122" rx="7" ry="5" />
              <ellipse cx="700" cy="112" rx="10" ry="6" />
              <ellipse cx="715" cy="107" rx="7" ry="5" />
              <ellipse cx="1050" cy="118" rx="10" ry="6" />
              <ellipse cx="1065" cy="113" rx="7" ry="5" />
            </g>
          </svg>
        </div>
      </section>

      <DonationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}