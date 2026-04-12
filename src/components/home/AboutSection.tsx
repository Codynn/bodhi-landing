// components/home/AboutSection.tsx
'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ABOUT_CONTENT } from "@/constants/home/about.constants";
import { Button } from "../ui/button";
import type { AboutContent } from "@/types/home/about.types";

interface AboutSectionProps {
  data?: AboutContent
}

export default function AboutSection({ data }: AboutSectionProps) {
  const label       = data?.label       ?? ABOUT_CONTENT.label
  const heading     = data?.heading     ?? ABOUT_CONTENT.heading
  const description = data?.description ?? ABOUT_CONTENT.description
  const ctaLabel    = data?.ctaLabel    ?? ABOUT_CONTENT.ctaLabel
  const ctaHref     = data?.ctaHref     ?? ABOUT_CONTENT.ctaHref
  const imageSrc    = data?.imageSrc    ?? ABOUT_CONTENT.imageSrc
  const imageAlt    = data?.imageAlt    ?? ABOUT_CONTENT.imageAlt

  return (
    <section className="w-full bg-white mt-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">

          {/* ── Left: Image ── */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-4">
            <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-semibold text-[#425190] uppercase tracking-widest">
              {label}
            </p>

            <h1 className="text-[32px] sm:text-[32px] md:text-[32px] lg:text-[40px] font-bold text-[#8F3648] leading-snug">
              {heading}
            </h1>

            <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-gray-600 leading-relaxed">
              {description}
            </p>

            <Link href={ctaHref} className="hidden lg:block">
              <Button
                className="
                  bg-[#8F3648] hover:bg-[#3D171F] text-white rounded-full px-6 py-2
                  text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-medium
                  shadow-[0_6px_0_#5E1010] hover:shadow-[0_4px_0_#5E1010]
                  active:shadow-[0_0px_0_#5E1010] active:translate-y-[6px]
                  hover:translate-y-[2px] transition-all duration-150
                "
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}