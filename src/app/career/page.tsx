import { CareerHeroSection } from '@/components/career/CareerHeroSection'
import { CareerOpeningsSection } from '@/components/career/CareerOpeningSection'

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-white">
      <CareerHeroSection />
      <CareerOpeningsSection/>
    </main>
  )
}