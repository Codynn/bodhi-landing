
import { HeroContent, HeroStat } from "@/types/home/hero.types"

export const HERO_STATS: HeroStat[] = [
  { value: 100, suffix: '+', label: 'Current Students' },
  { value: 10,  suffix: '',  label: 'Years of Excellence' },
  { value: 15,  suffix: '+', label: 'Professionals' },
]

export const HERO_CONTENT: HeroContent = {
  heading:  'Shaping Confident Learners for a Better Tomorrow',
  imageSrc: '/home/school.png',
  imageAlt: 'Bodhi International Montessori School Building',
  stats: HERO_STATS,  // ← add this
}