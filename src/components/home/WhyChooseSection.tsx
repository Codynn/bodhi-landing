import {
  WHY_CHOOSE_CONTENT,
  WHY_CHOOSE_FEATURES,
} from '@/constants/home/why-choose.constants'
import { WhyChooseCard } from '../shared/WhyChooseCard'

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-14 gap-3 w-full">
          <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-bold text-[#8F3648] uppercase tracking-widest">
            {WHY_CHOOSE_CONTENT.label}
          </p>

          <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px] font-bold text-[#8F3648] leading-snug w-full">
            {WHY_CHOOSE_CONTENT.heading}
          </h2>

          <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 leading-relaxed w-full">
            {WHY_CHOOSE_CONTENT.description}
          </p>
        </div>

        {/* ── Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {WHY_CHOOSE_FEATURES.map((feature) => (
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