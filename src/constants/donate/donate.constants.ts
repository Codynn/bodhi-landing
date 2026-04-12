import { DonateHeroContent } from "@/types/donate/donate.types";

export const DONATE_HERO_CONTENT:DonateHeroContent = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Donate', href: '/donate' },
  ],
  pageTitle: 'Donate',
  sectionTag: 'SUPPORT OUR SCHOOL',
  heading: 'Support a Child. Nurture a Future.',
  description:
    'At Bodhi International Montessori School, education is more than a service; it is a responsibility we carry with care. Although we are a private institution, our purpose goes beyond conventional schooling. Located in Lumbini, a place long associated with compassion and peace, we feel a deep commitment to making meaningful education accessible to children who might otherwise be left behind.In the communities around us, many families face financial hardship. Too often, it is girls who are the first to lose access to quality education. Economic pressure, social barriers, and generational inequality continue to limit opportunities for many bright and capable children.We believe this can and must change.',
  image: {
    src: '/donate/donate-hero.png',
    alt: 'Bodhi International Montessori School students and staff',
  },
}

