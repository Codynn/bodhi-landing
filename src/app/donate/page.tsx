import { DonateCtaSection } from "@/components/donate/DonateCtaSection";
import { DonateHeroSection } from "@/components/donate/DonateHeroSection";
import { EducationChangesLivesSection } from "@/components/donate/EducationChangeSection";
import { PartnershipOpportunitiesSection } from "@/components/donate/PartnershipSection";
import { TwoWaysDonationSection } from "@/components/donate/TwoWaysDonationSection";

export default function NoticesPage() {
  return (
    <main className="min-h-screen bg-white">
       <DonateHeroSection/>
       <TwoWaysDonationSection/>
       <EducationChangesLivesSection/>
       <PartnershipOpportunitiesSection/>
       <DonateCtaSection/>
    </main>
  )
}