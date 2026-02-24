import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ABOUT_CONTENT } from '@/constants/home/about.constants'
import { Button } from '../ui/button'

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
            <Link href={ABOUT_CONTENT.ctaHref} className="hidden lg:block">
  <Button
    className="
      bg-[#8B1A1A] 
      hover:bg-[#7A1717]
      text-white 
      rounded-full 
      px-6 py-2 
      text-sm font-medium
      shadow-[0_6px_0_#5E1010]
      hover:shadow-[0_4px_0_#5E1010]
      active:shadow-[0_0px_0_#5E1010]
      active:translate-y-[6px]
      hover:translate-y-[2px]
      transition-all duration-150
    "
  >
    {ABOUT_CONTENT.ctaLabel}
  </Button>
</Link>
          </div>
              <ArrowRight className="w-4 h-4" />

        </div>
      </div>
    </section>
  )
}