export interface CareerHeroContent {
  breadcrumb: { label: string; href: string }[]
  pageTitle: string
  poweredByLogo: {
    src: string
    alt: string
    href: string
  }
  heading: string
  paragraphs: string[]
  staffImage: {
    src: string
    alt: string
  }
}