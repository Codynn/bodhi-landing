// app/about/[slug]/page.tsx
import { notFound } from "next/navigation";
import { AwakeningSection } from "@/components/about/introduction/AwakeningSection";
import { OurStorySection } from "@/components/about/introduction/OurStorySection";
import { MissionVisionSection } from "@/components/about/introduction/MissionVisionSection";
import { SchoolFamilyHeroSection } from "@/components/about/our-school-family/SchoolFamilyHeroSection";
import { IntroductionHeroSection } from "@/components/about/introduction/IntroductionSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import SchoolMessageSection from "@/components/home/MessageSection";

interface AboutPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ["introduction", "school-family"].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  return {
    title: `${title} | Bodhi International Montessori School`,
    description: `Learn more about ${title} at Bodhi International Montessori School.`,
  }
}

// ── Fetch at build time ────────────────────────────────────────────
async function getAboutData(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/about/${slug}`,
      { cache: "force-cache" }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null   // fallback to constants if API fails
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { slug } = await params

  if (!["introduction", "school-family"].includes(slug)) notFound()

  // fetched at build time — null if API not ready (sections fall back to constants)
  const data = await getAboutData(slug)

  if (slug === "introduction") {
    return (
      <main className="min-h-screen">
        <IntroductionHeroSection data={data?.hero} />
        <AwakeningSection        data={data?.awakening} />
        <OurStorySection         data={data?.story} />
        <MissionVisionSection    data={data?.missionVision} />
        <WhyChooseSection        data={data?.whyChoose} />
        <SchoolMessageSection    data={data?.message} />
      </main>
    )
  }

  if (slug === "school-family") {
    return (
      <main className="min-h-screen">
        <SchoolFamilyHeroSection data={data?.hero} />
      </main>
    )
  }
}