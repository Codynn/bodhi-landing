'use client'

import { useRef } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useEffect } from 'react'
import { HeroStat } from '@/types/home/hero.types'

export function AnimatedStat({ stat }: { stat: HeroStat }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isInView) {
      animate(motionValue, stat.value, { duration: 2, ease: [0.25, 0.1, 0.25, 1] })
    }
  }, [isInView])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.floor(latest)}${stat.suffix}`
      }
    })
  }, [spring])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span ref={displayRef} className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
        0{stat.suffix}
      </span>
      <span className="text-sm text-white/70 mt-1">{stat.label}</span>
    </div>
  )
}