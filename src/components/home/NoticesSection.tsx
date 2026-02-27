'use client'

import { useState } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NOTICES_CONTENT, NOTICES_DATA } from '@/constants/home/notices.constants'
import { Notice } from '@/types/home/notices.types'
import { NoticeModal } from '../shared/NoticeModel'

export default function NoticesSection() {
  const [selected, setSelected] = useState<Notice | null>(null)

  return (
    <>
      <section className="w-full bg-white">
        <div className="max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-3">
            <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-bold text-[#425190] uppercase tracking-widest">
              {NOTICES_CONTENT.label}
            </p>
            <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px]  font-bold text-[#8F3648] leading-snug w-full">
              {NOTICES_CONTENT.heading}
            </h2>
          </div>

          {/* ── 3×2 Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {NOTICES_DATA.slice(0,6).map((notice) => (
              <Card
                key={notice.id}
                onClick={() => setSelected(notice)}
                className="bg-white border border-gray-200 rounded-xl shadow-none hover:shadow-md transition-shadow duration-200 cursor-pointer group"
              >
                <CardContent className="flex flex-col gap-3 px-5 py-5">

                  {/* ── Top Row: Badge + Date ── */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]  font-medium text-gray-500 border-gray-300 rounded-sm px-2 py-0.5"
                    >
                      {notice.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{notice.date}</span>
                    </div>
                  </div>

                  {/* ── Title ── */}
                  <h3 className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-bold text-gray-800 leading-snug group-hover:text-[#7B1C1C] transition-colors">
                    {notice.title}
                  </h3>

                  {/* ── Description ── */}
                  <p className="text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 leading-relaxed line-clamp-3">
                    {notice.description}
                  </p>

                  {/* ── Read More ── */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(notice) }}
                    className="inline-flex items-center gap-1 text-[18px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-semibold text-[#7B1C1C] hover:text-[#C0392B] transition-colors mt-1 w-fit"
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* ── Modal ── */}
      <NoticeModal notice={selected} onClose={() => setSelected(null)} />
    </>
  )
}