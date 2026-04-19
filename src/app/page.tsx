// app/page.tsx
import AboutSection from "@/components/home/AboutSection";
import DonationSection from "@/components/home/DonationSection";
import { GallerySection } from "@/components/home/GallerySection";
import { HeroSection } from "@/components/home/HeroSection";
import SchoolMessageSection from "@/components/home/MessageSection";
import NoticesSection from "@/components/home/NoticesSection";
import TestimonialsSection from "@/components/home/TestimonialSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import FadeInSection from "@/components/shared/FadeInSection";
import React from "react";

// Static data fetched at build time
async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTORY_BASE_URL}/api/public/school/${process.env.NEXT_PUBLIC_BETTERSCHOOL_ID}/content/home`,
    {
      next: { revalidate: 3600 },
      headers: {
        "x-school-id": process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "",
        // try adding these one at a time if the above doesn't work:
        // "Authorization": `Bearer ${process.env.DIRECTORY_API_KEY}`,
        // "x-api-key": process.env.DIRECTORY_API_KEY ?? "",
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch home data:", res.status, res.statusText);
    return null;
  }

  const json = await res.json();
  return json?.data || null;
}

export default async function HomePage() {
  const data = await getHomeData();
  console.log(data)

  return (
    <main className="relative w-full font-outfit">
      
      <HeroSection data={data?.hero} />

      <FadeInSection>
        <AboutSection data={data?.about} />
      </FadeInSection>

      <FadeInSection>
        <WhyChooseSection data={data?.whyChoose} />
      </FadeInSection>

      <FadeInSection>
        <SchoolMessageSection data={data?.message} />
      </FadeInSection>

      <FadeInSection>
        <DonationSection data={data?.donation} />
      </FadeInSection>

      <FadeInSection>
        <NoticesSection />
      </FadeInSection>

      <FadeInSection>
        <GallerySection data={data?.gallery} />
      </FadeInSection>

      <FadeInSection>
        <TestimonialsSection data={data?.testimonials} />
      </FadeInSection>
    </main>
  );
}