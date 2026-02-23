'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { GALLERY_CONTENT } from '@/constants/home/gallery.constants'

const IMAGES_PER_PAGE = 6

export function GallerySection() {
  const { sectionLabel, heading, images } = GALLERY_CONTENT
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)
  const start = page * IMAGES_PER_PAGE
  const visible = images.slice(start, start + IMAGES_PER_PAGE)
  const slots = [...visible, ...Array(Math.max(0, 6 - visible.length)).fill(null)]

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <p className="text-center text-xs sm:text-sm font-semibold tracking-widest text-[#8B1A1A] uppercase mb-3">
          {sectionLabel}
        </p>

        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B1A1A] mb-8 sm:mb-10">
          {heading}
        </h2>

        {/* Desktop Grid — 3×3 masonry */}
        <div
          className="hidden sm:grid gap-1.5"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            height: '560px',
          }}
        >
          {/* img1 — col 1, rows 1–2 */}
          <div className="relative overflow-hidden" style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            {slots[0] && <Image src={slots[0].src} alt={slots[0].alt} fill className="object-cover" sizes="33vw" />}
          </div>

          {/* img2 — cols 2–3, row 1 */}
          <div className="relative overflow-hidden" style={{ gridColumn: '2 / 4', gridRow: '1' }}>
            {slots[1] && <Image src={slots[1].src} alt={slots[1].alt} fill className="object-cover" sizes="66vw" />}
          </div>

          {/* img3 — col 2, row 2 */}
          <div className="relative overflow-hidden" style={{ gridColumn: '2', gridRow: '2' }}>
            {slots[2] && <Image src={slots[2].src} alt={slots[2].alt} fill className="object-cover" sizes="33vw" />}
          </div>

          {/* img4 — col 3, rows 2–3 */}
          <div className="relative overflow-hidden" style={{ gridColumn: '3', gridRow: '2 / 4' }}>
            {slots[3] && <Image src={slots[3].src} alt={slots[3].alt} fill className="object-cover" sizes="33vw" />}
          </div>

          {/* img5 — col 1, row 3 */}
          <div className="relative overflow-hidden" style={{ gridColumn: '1', gridRow: '3' }}>
            {slots[4] && <Image src={slots[4].src} alt={slots[4].alt} fill className="object-cover" sizes="33vw" />}
          </div>

          {/* img6 — col 2, row 3 */}
          <div className="relative overflow-hidden" style={{ gridColumn: '2', gridRow: '3' }}>
            {slots[5] && <Image src={slots[5].src} alt={slots[5].alt} fill className="object-cover" sizes="33vw" />}
          </div>
        </div>

        {/* Mobile Grid — 2 columns, 3 rows, all 6 images */}
        <div className="sm:hidden grid grid-cols-2 gap-1.5">
          {slots.map((img, i) =>
            img ? (
              <div key={i} className="relative h-40 overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
              </div>
            ) : null
          )}
        </div>

        {/* Arrows */}
        <div className="flex items-center justify-center gap-6 mt-6 sm:mt-8">
          <button
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous"
            className="text-[#2D6A2D] hover:text-[#1a4a1a] disabled:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
          </button>
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            aria-label="Next"
            className="text-[#2D6A2D] hover:text-[#1a4a1a] disabled:text-gray-300 transition-colors"
          >
            <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
          </button>
        </div>

      </div>
    </section>
  )
}