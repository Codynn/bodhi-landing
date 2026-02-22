import type { NavLink, TopBarInfo } from '@/types/layout/navbar.types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    dropdown: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Mission & Vision', href: '/about/mission-vision' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Our School Family', href: '/about/school-family' },
    ],
  },
  { label: 'Academics', href: '/academics' },
  { label: 'Donate', href: '/donate' },
  { label: 'Notices', href: '/notices' },
  { label: 'Career', href: '/career' },
  { label: 'Admission', href: '/admission' },
]

export const TOP_BAR_INFO: TopBarInfo = {
  address: 'LCM-10, Lumbini Bazar, Rupandehi',
  phone: ['071-591633', '985-6025633'],
  socials: [
    { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
    { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
    { icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
    { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
  ],
}

export const SITE_NAME = 'Bodhi International Montessori School'
export const CONTACT_HREF = '/contact'