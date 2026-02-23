import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NOTICES_CONTENT, NOTICES_DATA } from '@/constants/home/notices.constants'

export default function NoticesSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-3">
          <p className="text-xs sm:text-sm font-bold text-[#C0392B] uppercase tracking-widest">
            {NOTICES_CONTENT.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7B1C1C] leading-snug w-full">
            {NOTICES_CONTENT.heading}
          </h2>
        </div>

        {/* ── 3×2 Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {NOTICES_DATA.map((notice) => (
            <Card
              key={notice.id}
              className="bg-white border border-gray-200 rounded-xl shadow-none hover:shadow-sm transition-shadow duration-200"
            >
              <CardContent className="flex flex-col gap-3 px-5 py-5">

                {/* ── Top Row: Badge + Date ── */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-[11px] font-medium text-gray-500 border-gray-300 rounded-sm px-2 py-0.5"
                  >
                    {notice.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {/* ── Title ── */}
                <h3 className="text-sm sm:text-[15px] font-bold text-gray-800 leading-snug">
                  {notice.title}
                </h3>

                {/* ── Description ── */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-4">
                  {notice.description}
                </p>

                {/* ── Read More ── */}
                <Link
                  href={notice.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#7B1C1C] hover:text-[#C0392B] transition-colors mt-1"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}