// src/constants/hero.constants.ts

import { HeroContent, HeroStat } from "@/types/home/hero.types"

export const HERO_STATS: HeroStat[] = [
  { value: '100+', label: 'Current Students' },
  { value: '10',   label: 'Years of Excellence' },
  { value: '15+',  label: 'Professionals' },
]

export const HERO_CONTENT: HeroContent = {
  heading:  'Shaping Confident Learners for a Better Tomorrow',
  imageSrc: '/home/school-building.jpg',
  imageAlt: 'Bodhi International Montessori School Building',
}