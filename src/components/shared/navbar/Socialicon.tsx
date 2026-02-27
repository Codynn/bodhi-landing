import Link from "next/link";
import { Facebook, Youtube, Instagram, Linkedin } from "lucide-react";
import { ReactNode } from "react";

const SOCIAL_ICON_MAP: Record<string, ReactNode> = {
  facebook: <Facebook className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />,
  youtube: <Youtube className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />,
  instagram: <Instagram className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />,
  linkedin: <Linkedin className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />,
};

interface SocialIconProps {
  icon: string;
  href: string;
  name: string;
}

export const SocialIcon = ({ icon, href, name }: SocialIconProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={name}
    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full  bg-[#5D8D42] flex items-center justify-center text-white hover:bg-[#5b8244] transition-colors"
  >
    {SOCIAL_ICON_MAP[icon]}
  </Link>
);
