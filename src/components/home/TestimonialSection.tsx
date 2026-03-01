import { TESTIMONIALS_CONTENT, TESTIMONIALS_DATA } from '@/constants/home/testimonials.constants'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 ">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 gap-3">
          <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-bold text-[#425190] uppercase tracking-widest">
            {TESTIMONIALS_CONTENT.label}
          </p>
          <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px] font-bold text-[#8F3648] leading-snug">
            {TESTIMONIALS_CONTENT.heading}
          </h2>
          <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 leading-relaxed max-w-[80vw]">
            {TESTIMONIALS_CONTENT.description}
          </p>
        </div>

        {/* ── Row 1: 2 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 mb-8 lg:mb-10">
          {TESTIMONIALS_DATA.slice(0, 2).map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>

        {/* ── Row 2: 3 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {TESTIMONIALS_DATA.slice(2, 5).map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>

      </div>
    </section>
  )
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <div className="flex flex-col gap-5 border border-gray-100 rounded-xl px-6 py-7 bg-gray-50">

      {/* Green Quote Mark */}
      <span className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px] font-serif font-black text-[#2D6A2D] leading-none select-none">
        <Quote  className='w-8 h-8 lg:w-12 lg:h-12'/>
      </span>

      {/* Quote Text */}
      <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-600 leading-relaxed flex-1">
        {quote}
      </p>

      {/* Author */}
      <div className="flex flex-col gap-0.5 mt-2">
        <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-semibold text-gray-800">{name}</p>
        <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-400">{role}</p>
      </div>

    </div>
  )
}