import { NavItem } from "@/types/layout/navbar.types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Introduction", href: "/about/introduction" },
      { label: "Our School Family", href: "/about/school-family" },
    ],
  },
  { label: "Donate", href: "/donate" },
  { label: "Notices", href: "/notices" },
  { label: "Career", href: "/career" },
  { label: "Admission", href: "/admission" },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "facebook",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: "youtube",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
  },
];

export const SCHOOL_INFO = {
  name: "Bodhi International",
  name2:"Montessori School",
  address: "LCM-10, Lumbini Bazar, Rupandehi",
  phone: "071-591633, 985-6025633",
  contactHref: "/contact",
};