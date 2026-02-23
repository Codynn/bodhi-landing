import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ABOUT_CONTENT } from '@/constants/home/about.constants'

export default function AboutSection() {
  return (
    <section className="w-full bg-white mt-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Left: Image ── */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
              <Image
                src={ABOUT_CONTENT.imageSrc}
                alt={ABOUT_CONTENT.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-4">

            {/* Label */}
            <p className="text-xs sm:text-sm font-semibold text-[#C0392B] uppercase tracking-widest">
              {ABOUT_CONTENT.label}
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7B1C1C] leading-snug">
              {ABOUT_CONTENT.heading}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {ABOUT_CONTENT.description}
            </p>

            {/* Learn More Button */}
            <Link
              href={ABOUT_CONTENT.ctaHref}
              className="
                inline-flex items-center gap-2
                bg-[#7B1C1C] hover:bg-[#C0392B]
                text-white text-sm font-medium
                px-6 py-3 rounded-full
                transition-colors duration-200
                mt-2
              "
            >
              {ABOUT_CONTENT.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}