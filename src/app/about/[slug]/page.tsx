import { notFound } from 'next/navigation'
import { AwakeningSection } from '@/components/about/introduction/AwakeningSection'
import { OurStorySection } from '@/components/about/introduction/OurStorySection'
import { MissionVisionSection } from '@/components/about/introduction/MissionVisionSection'
import { SchoolFamilyHeroSection } from '@/components/about/our-school-family/SchoolFamilyHeroSection'
import { IntroductionHeroSection } from '@/components/about/introduction/IntroductionSection'
import WhyChooseSection from '@/components/home/WhyChooseSection'
import SchoolMessageSection from '@/components/home/MessageSection'
// import { NextSectionHere } from '@/components/about/introduction/NextSectionHere'

// ---------------------------------------------------------------------------
// Each key = URL slug  →  ordered array of sections rendered top → bottom
// ---------------------------------------------------------------------------
const ABOUT_PAGES: Record<string, React.ComponentType[]> = {
  introduction: [
    IntroductionHeroSection,
    AwakeningSection,
    OurStorySection,
    MissionVisionSection,
    WhyChooseSection,
    SchoolMessageSection
  ],
  'school-family': [
    SchoolFamilyHeroSection,
    // Add more sections below as you build them
  ],
}

interface AboutPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(ABOUT_PAGES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { slug } = await params
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return {
    title: `${title} | Bodhi International Montessori School`,
    description: `Learn more about ${title} at Bodhi International Montessori School.`,
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { slug } = await params
  const sections = ABOUT_PAGES[slug]
  if (!sections) notFound()
  return (
    <main className="min-h-screen">
      {sections.map((Section, index) => (
        <Section key={index} />
      ))}
    </main>
  )
}