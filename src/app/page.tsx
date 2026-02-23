import AboutSection from '@/components/home/AboutSection'
import DonationSection from '@/components/home/DonationSection'
import { GallerySection } from '@/components/home/GallerySection'
import { HeroSection } from '@/components/home/HeroSection'
import SchoolMessageSection from '@/components/home/MessageSection'
import NoticesSection from '@/components/home/NoticesSection'
import TestimonialsSection from '@/components/home/TestimonialSection'
import WhyChooseSection from '@/components/home/WhyChooseSection'
import React from 'react'

export default function HomePage() {
  return (
    <main className='relative w-full'>
       <HeroSection/>
       <AboutSection/>
       <WhyChooseSection/>
       <SchoolMessageSection/>
       <DonationSection/>
       <NoticesSection/>
       <GallerySection/>
       <TestimonialsSection/>
      
    </main>
  )
}
