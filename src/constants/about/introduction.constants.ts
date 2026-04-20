import type { IntroductionContent } from "@/types/about/introduction.types";

export const INTRODUCTION_CONTENT: IntroductionContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Introduction", href: "/about/introduction" },
  ],
  pageTitle: "Introduction",
  sectionTag: "WHO WE ARE",
  heading: "Building a strong foundation for learning and values",
  description:
    "Bodhi International Montessori School is committed to providing quality education in a safe, disciplined, and supportive environment. We focus on academic growth, character development, and positive student behavior while encouraging curiosity, responsibility, and confidence. Our goal is to create a welcoming space where every child feels respected, supported, and prepared to succeed both inside and outside the classroom.",
  image: {
    src: "/about/about1.png",
    alt: "Bodhi International Montessori School Staff and Students",
  },
  stats: [
    { value: 10, suffix: "+", label: "Years of Excellence" },
    { value: 100, suffix: "+", label: "Current Students" },
    { value: 15, suffix: "+", label: "Professionals" },
  ],
};
