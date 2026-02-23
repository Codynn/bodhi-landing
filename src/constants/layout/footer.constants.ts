import { FooterContent } from "@/types/layout/footer.types";

export const FOOTER_CONTENT: FooterContent = {
  description:
    'Established in 2072 B.S, Bodhi International Montessori School is committed to providing quality education in a safe, supportive, and student-focused environment that encourages academic excellence and character development.',
  phone: '071-591633, 985-6025633',
  quickLinks: [
    { label: 'About Us',   href: '/about' },
    { label: 'Donate',     href: '/donate' },
    { label: 'Notices',    href: '/notices' },
    { label: 'Career',     href: '/career' },
    { label: 'Admission',  href: '/admission' },
    { label: 'Contact Us', href: '/contact' },
  ],
  socials: {
    facebook:  'https://facebook.com/bodhimontessori',
    youtube:   'https://youtube.com/@bodhimontessori',
    instagram: 'https://instagram.com/bodhimontessori',
    linkedin:  'https://linkedin.com/company/bodhimontessori',
  },
  copyright: '©2026 Bodhi International Montessori School',
  builtBy:     '/footer/better.svg',
  builtByHref: 'https://betterso.com',
}