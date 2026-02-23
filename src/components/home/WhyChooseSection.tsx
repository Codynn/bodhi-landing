import { Card, CardContent } from '@/components/ui/card'
import { WHY_CHOOSE_CONTENT, WHY_CHOOSE_FEATURES } from '@/constants/home/why-choose.constants'

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-14 gap-3 w-full">

          {/* Label */}
          <p className="text-xs sm:text-sm font-bold text-[#C0392B] uppercase tracking-widest">
            {WHY_CHOOSE_CONTENT.label}
          </p>

          {/* Heading — full width, no max-w constraint */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7B1C1C] leading-snug w-full">
            {WHY_CHOOSE_CONTENT.heading}
          </h2>

          {/* Description — full width, no max-w constraint */}
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed w-full">
            {WHY_CHOOSE_CONTENT.description}
          </p>
        </div>

        {/* ── 2x2 Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {WHY_CHOOSE_FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl"
              >
                <CardContent className="flex flex-col items-center text-center gap-4 px-8 py-10">

                  {/* Colored Icon Circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: feature.iconBg }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}