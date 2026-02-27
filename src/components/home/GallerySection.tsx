'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { GALLERY_CONTENT } from '@/constants/home/gallery.constants'

const IMAGES_PER_PAGE = 6

type WipeDir = 'ltr' | 'rtl' | 'ttb' | 'btt'

const SLOT_WIPE_DIRS: WipeDir[] = [
  'ttb',
  'ltr',
  'btt',
  'ttb',
  'ttb',
  'ltr',
]

const SLOT_DELAYS = [0, 0.07, 0.14, 0.07, 0.21, 0.21]

const GRID_STYLES = [
  { gridColumn: '1',     gridRow: '1 / 3', sizes: '33vw' },
  { gridColumn: '2 / 4', gridRow: '1',     sizes: '66vw' },
  { gridColumn: '2',     gridRow: '2',     sizes: '33vw' },
  { gridColumn: '3',     gridRow: '2 / 4', sizes: '33vw' },
  { gridColumn: '1',     gridRow: '3',     sizes: '33vw' },
  { gridColumn: '2',     gridRow: '3',     sizes: '33vw' },
]

const EASE_SHARP:  [number, number, number, number] = [0.76, 0, 0.24, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1]

function getClipPath(dir: WipeDir, state: 'hidden' | 'visible' | 'exitHidden'): string {
  switch (dir) {
    case 'ltr':
      return state === 'visible' ? 'inset(0 0% 0 0)' : state === 'hidden' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
    case 'rtl':
      return state === 'visible' ? 'inset(0 0% 0 0)' : state === 'hidden' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
    case 'ttb':
      return state === 'visible' ? 'inset(0 0 0% 0)' : state === 'hidden' ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)'
    case 'btt':
      return state === 'visible' ? 'inset(0 0 0% 0)' : state === 'hidden' ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)'
  }
}

function getVariants(dir: WipeDir, delay: number): Variants {
  return {
    initial: {
      clipPath: getClipPath(dir, 'hidden'),
      opacity: 1,
    },
    animate: {
      clipPath: getClipPath(dir, 'visible'),
      opacity: 1,
      transition: {
        clipPath: { duration: 0.75, ease: EASE_SHARP, delay },
      },
    },
    exit: {
      clipPath: getClipPath(dir, 'exitHidden'),
      opacity: 1,
      transition: {
        clipPath: { duration: 0.6, ease: EASE_SHARP, delay },
      },
    },
  }
}

export function GallerySection() {
  const { sectionLabel, heading, images } = GALLERY_CONTENT
  const [page, setPage]           = useState(0)
  const [direction, setDirection] = useState(1)

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)
  const start      = page * IMAGES_PER_PAGE
  const visible    = images.slice(start, start + IMAGES_PER_PAGE)
  const slots      = [...visible, ...Array(Math.max(0, 6 - visible.length)).fill(null)]

  const prev = () => {
    if (page === 0) return
    setDirection(-1)
    setPage((p) => p - 1)
  }
  const next = () => {
    if (page === totalPages - 1) return
    setDirection(1)
    setPage((p) => p + 1)
  }

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[100vw] mx-auto">

        {/* Label */}
        <p className="text-center text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-semibold tracking-widest text-[#425190] uppercase mb-3">
          {sectionLabel}
        </p>

        {/* Heading */}
        <h2 className="text-center text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px] font-bold text-[#8F3648] mb-8 sm:mb-10">
          {heading}
        </h2>

        {/* ── Desktop Masonry Grid ── */}
        <div
          className="hidden sm:grid gap-1.5"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows:    'repeat(3, 1fr)',
            height:              '560px',
          }}
        >
          {slots.map((img, i) => {
            const variants = getVariants(SLOT_WIPE_DIRS[i], SLOT_DELAYS[i])
            return (
              <div
                key={i}
                className="relative overflow-hidden bg-gray-100 group"
                style={{
                  gridColumn: GRID_STYLES[i].gridColumn,
                  gridRow:    GRID_STYLES[i].gridRow,
                }}
              >
                <AnimatePresence mode="sync">
                  {img && (
                    <motion.div
                      key={`page-${page}-slot-${i}`}
                      className="absolute inset-0"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                    >
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.08 }}
                        animate={{
                          scale: 1,
                          transition: { duration: 0.95, ease: EASE_SMOOTH, delay: SLOT_DELAYS[i] },
                        }}
                        exit={{
                          scale: 1.05,
                          transition: { duration: 0.6, ease: EASE_SHARP, delay: SLOT_DELAYS[i] },
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes={GRID_STYLES[i].sizes}
                        />
                      </motion.div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-6 h-[2px] bg-white/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-[2px] h-6 bg-white/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        {/* ── Mobile Grid ── */}
        <div className="sm:hidden grid grid-cols-2 gap-1.5">
          {slots.map((img, i) => {
            const mobileDir: WipeDir = i % 2 === 0 ? 'ttb' : 'ltr'
            const variants = getVariants(mobileDir, i * 0.07)
            return img ? (
              <div key={i} className="relative h-40 overflow-hidden bg-gray-100">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={`page-${page}-slot-${i}`}
                    className="absolute inset-0"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.08 }}
                      animate={{
                        scale: 1,
                        transition: { duration: 0.85, ease: EASE_SMOOTH, delay: i * 0.07 },
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : null
          })}
        </div>

        {/* ── Arrows ── */}
        <div className="flex items-center justify-center gap-6 mt-6 sm:mt-8">
          <button
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous"
            className="text-[#2D6A2D] hover:text-[#1a4a1a] disabled:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-7 h-7 sm:w-12 sm:h-12 stroke-[1.8]" />
          </button>
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            aria-label="Next"
            className="text-[#2D6A2D] hover:text-[#1a4a1a] disabled:text-gray-300 transition-colors"
          >
            <ArrowRight className="w-7 h-7 sm:w-12 sm:h-12 stroke-[1.8]" />
          </button>
        </div>

      </div>
    </section>
  )
}