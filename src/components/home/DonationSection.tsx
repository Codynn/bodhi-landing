"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DONATION_CONTENT } from "@/constants/home/donation.constants"
import { DonationContent } from "@/types/home/donation.types"

interface donationSectionProps{
    data?:DonationContent
}

export default function DonationSection({data}:donationSectionProps) {

     // 🧠 HYBRID FALLBACK SYSTEM
  const content = {
    label: data?.label ?? DONATION_CONTENT.label,
    heading: data?.heading ?? DONATION_CONTENT.heading,
    description: data?.description ?? DONATION_CONTENT.description,
    ctaLabel: data?.ctaLabel ?? DONATION_CONTENT.ctaLabel,
    ctaHref: data?.ctaHref ?? DONATION_CONTENT.ctaHref,
    imageSrc: data?.imageSrc ?? DONATION_CONTENT.imageSrc,
    imageAlt: data?.imageAlt ?? DONATION_CONTENT.imageAlt,
  };

  return (
    <section className="w-full bg-gray-50 overflow-hidden mt-12">
      <div className="flex flex-col lg:flex-row items-stretch">

        {/* ───────── Left: Image ───────── */}
        <div className="relative w-full lg:w-1/2 min-h-[320px] sm:min-h-[420px] lg:min-h-120 2xl:min-h-200">
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
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
            <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-bold text-[#425190] uppercase tracking-[0.2em]">
              {content.label}
            </p>

            {/* Heading */}
            <h2 className="text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] font-bold text-[#8F3648] leading-snug">
              {content.heading}
            </h2>

            {/* Description */}
            <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-gray-600 leading-relaxed">
              {content.description}
            </p>

            {/* 3D Donate Button */}
            <Link href={content.ctaHref} className="self-start mt-3">
              <Button
                className="
                  bg-[#7B1C1C]
                  hover:bg-[#681616]
                  text-white
                  text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-semibold
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
                {content.ctaLabel}
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              </Button>
            </Link>

          </div>
        </div>

      </div>
    </section>
  )
}