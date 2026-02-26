import { DonateHeroSection } from "@/components/donate/DonateHeroSection";
import { DonationFormSection } from "@/components/donate/DonationFormSection";
import { DonationImpactSection } from "@/components/donate/DonationImpactSection";

export default function NoticesPage() {
  return (
    <main className="min-h-screen bg-white">
       <DonateHeroSection/>
       <DonationFormSection/>
       <DonationImpactSection/>
    </main>
  )
}