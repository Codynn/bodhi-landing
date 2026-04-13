
export interface IntroductionStat {
  value: number
  suffix: string
  label: string
}

export interface IntroductionContent {
  breadcrumb: {
    label: string
    href: string
  }[]
  pageTitle: string
  sectionTag: string
  heading: string
  description: string
  image: {
    src: string
    alt: string
  }
  stats: IntroductionStat[]
}