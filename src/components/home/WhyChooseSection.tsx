'use client'

import {
  WHY_CHOOSE_CONTENT,
  WHY_CHOOSE_FEATURES,
} from '@/constants/home/why-choose.constants'
import { WhyChooseCard } from '../shared/WhyChooseCard'
import type { WhyChooseContent, WhyChooseFeature } from '@/types/home/why-choose.types'

interface WhyChooseSectionProps {
  data?: WhyChooseContent
  features?: WhyChooseFeature[]
}

export default function WhyChooseSection({ data, features }: WhyChooseSectionProps) {
  const label       = data?.label       ?? WHY_CHOOSE_CONTENT.label
  const heading     = data?.heading     ?? WHY_CHOOSE_CONTENT.heading
  const description = data?.description ?? WHY_CHOOSE_CONTENT.description
  const items       = features          ?? WHY_CHOOSE_FEATURES

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-14 gap-3 w-full">
          <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-bold text-[#425190] uppercase tracking-widest">
            {label}
          </p>

          <h2 className="text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] font-bold text-[#8F3648] leading-snug w-full">
            {heading}
          </h2>

          <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-gray-500 leading-relaxed w-full">
            {description}
          </p>
        </div>

        {/* ── Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {items.map((feature) => (
            <WhyChooseCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBg={feature.iconBg}
            />
          ))}
        </div>

      </div>
    </section>
  )
}