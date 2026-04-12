import { DonateCtaSection } from "@/components/donate/DonateCtaSection";
import { DonateHeroSection } from "@/components/donate/DonateHeroSection";
import { EducationChangesLivesSection } from "@/components/donate/EducationChangeSection";
import { PartnershipOpportunitiesSection } from "@/components/donate/PartnershipSection";
import { TwoWaysDonationSection } from "@/components/donate/TwoWaysDonationSection";

// fetch at build time
async function getDonateData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/donate`, {
    cache: "force-cache",
  });

  return res.json();
}

export default async function DonatePage() {
  const data = await getDonateData();

  return (
    <main className="min-h-screen bg-white">

      <DonateHeroSection data={data?.hero} />

      <TwoWaysDonationSection data={data?.twoWays} />

      <EducationChangesLivesSection data={data?.education} />

      <PartnershipOpportunitiesSection data={data?.partnership} />

      <DonateCtaSection data={data?.cta} />

    </main>
  );
}