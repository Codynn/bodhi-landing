import { CareerHeroSection } from '@/components/career/CareerHeroSection'
import { CareerOpeningsSection } from '@/components/career/CareerOpeningSection'

async function getCareerData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/career`, {
    cache: 'force-cache',
  })

  return res.json()
}

export default async function CareerPage() {
  const data = await getCareerData()

  return (
    <main className="min-h-screen bg-white">
      <CareerHeroSection data={data?.hero} />
      <CareerOpeningsSection />
    </main>
  )
}