"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DONATION_CONTENT } from "@/constants/home/donation.constants"

export default function DonationSection() {
  return (
    <section className="w-full bg-gray-50 overflow-hidden mt-12">
      <div className="flex flex-col lg:flex-row items-stretch">

        {/* ───────── Left: Image ───────── */}
        <div className="relative w-full lg:w-1/2 min-h-[320px] sm:min-h-[420px] lg:min-h-[600px]">
          <Image
            src={DONATION_CONTENT.imageSrc}
            alt={DONATION_CONTENT.imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* ───────── Right: Content ───────── */}
        <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-10 md:px-14 xl:px-20 py-12 lg:py-0">
          <div className="flex flex-col gap-5 max-w-screen">

            {/* Label */}
            <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-bold text-[#8F3648] uppercase tracking-[0.2em]">
              {DONATION_CONTENT.label}
            </p>

            {/* Heading */}
            <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px] font-bold text-[#8F3648] leading-snug">
              {DONATION_CONTENT.heading}
            </h2>

            {/* Description */}
            <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-600 leading-relaxed">
              {DONATION_CONTENT.description}
            </p>

            {/* 3D Donate Button */}
            <Link href={DONATION_CONTENT.ctaHref} className="self-start mt-3">
              <Button
                className="
                  bg-[#7B1C1C]
                  hover:bg-[#681616]
                  text-white
                  text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-semibold
                  px-6 py-3
                  rounded-full
                  flex items-center gap-2

                  shadow-[0_6px_0_#4E0F0F]
                  hover:shadow-[0_4px_0_#4E0F0F]
                  active:shadow-none

                  hover:translate-y-[2px]
                  active:translate-y-[6px]

                  transition-all duration-150
                "
              >
                {DONATION_CONTENT.ctaLabel}
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              </Button>
            </Link>

          </div>
        </div>

      </div>
    </section>
  )
}