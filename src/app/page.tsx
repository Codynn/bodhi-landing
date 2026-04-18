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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/content/home`, {
    cache: "force-cache",
  });
  return res.json();
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