import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { HERO_CONTENT, HERO_STATS } from '@/constants/home/hero.constants'

export function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14">

        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1A1A] leading-tight tracking-tight max-w-4xl mx-auto mb-8 sm:mb-10">
          Shaping Confident Learners for a Better
          Tomorrow
        </h1>

        {/* Image + overlays */}
        <div className="relative w-full">

          {/* School Image */}
          <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7]">
            <Image
              src="/home/school.png"
              alt={HERO_CONTENT.imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
          </div>

          {/* Stats Card — flush right edge of image on sm+ */}
          <div className="hidden sm:flex absolute top-1/2 right-0 -translate-y-1/2 flex-col bg-white/95 backdrop-blur-sm rounded-l-2xl shadow-xl overflow-hidden">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  'px-6 py-5 lg:px-8 lg:py-6',
                  i < HERO_STATS.length - 1 ? 'border-b border-gray-100' : '',
                ].join(' ')}
              >
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D6A2D] leading-none">
                  {stat.value}
                </span>
                <span className="block text-[10px] sm:text-xs text-gray-500 font-medium mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Arrow Circle — hidden on mobile, visible sm+ */}
          <div className="hidden sm:flex absolute bottom-3 left-[-6px] translate-y-1/2 w-14 h-14 sm:w-18 sm:h-18 lg:w-[72px] lg:h-[72px] bg-white rounded-full items-center justify-center z-10">
            <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 sm:w-12 sm:h-12 text-[#2D6A2D] stroke-[2.5]" />
            </div>
          </div>

          {/* Mobile Stats Row */}
          <div className="sm:hidden mt-4 bg-white rounded-2xl shadow-md border border-gray-100 flex divide-x divide-gray-100">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex-1 py-4 text-center">
                <span className="block text-xl font-bold text-[#2D6A2D] leading-none">
                  {stat.value}
                </span>
                <span className="block text-[10px] text-gray-500 mt-1 leading-snug px-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Spacing to clear arrow overflow */}
        <div className="pb-10 sm:pb-12" />
      </div>
    </section>
  )
}