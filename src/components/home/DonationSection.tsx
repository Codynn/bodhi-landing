import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { DONATION_CONTENT } from '@/constants/home/donation.constants'

export default function DonationSection() {
  return (
    <section className="w-full bg-gray-50 overflow-hidden mt-8">
      {/* Flex container */}
      <div className="flex flex-col lg:flex-row items-stretch">

        {/* ── Left: Image (full edge-to-edge) ── */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-[580px]">
          <Image
            src={DONATION_CONTENT.imageSrc}
            alt={DONATION_CONTENT.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* ── Right: Content ── */}
        <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 sm:py-12 lg:py-0">
          <div className="flex flex-col gap-4 sm:gap-5 max-w-lg">

            {/* Label */}
            <p className="text-xs sm:text-sm font-bold text-[#C0392B] uppercase tracking-widest">
              {DONATION_CONTENT.label}
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-[#7B1C1C] leading-snug">
              {DONATION_CONTENT.heading}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              {DONATION_CONTENT.description}
            </p>

            {/* Donate Now Button */}
            <Link
              href={DONATION_CONTENT.ctaHref}
              className="
                self-start inline-flex items-center gap-2
                bg-[#7B1C1C] hover:bg-[#C0392B]
                text-white text-sm sm:text-base font-semibold
                px-5 sm:px-6 py-2 sm:py-3 rounded-full
                transition-colors duration-200 mt-2
              "
            >
              {DONATION_CONTENT.ctaLabel}
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            </Link>

          </div>
        </div>

      </div>
    </section>
  )
}