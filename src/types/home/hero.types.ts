
export interface HeroStat {
  value: number
  suffix: string
  label: string
}

export interface HeroContent {
  heading: string
  imageSrc: string
  imageAlt: string
  stats: HeroStat[]  // ← add this
}
