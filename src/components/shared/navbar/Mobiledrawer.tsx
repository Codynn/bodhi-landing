import Link from "next/link";
import Image from "next/image";
import { X, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/types/layout/navbar.types";
import { SOCIAL_LINKS, SCHOOL_INFO } from "@/constants/layout/navbar.constants";
import { MobileNavItem } from "./Mobilenavitem";
import { SocialIcon } from "./Socialicon";

interface MobileDrawerProps {
  open: boolean;
  pathname: string;
  navItems: NavItem[];
  onClose: () => void;
}

export const MobileDrawer = ({ open, pathname, navItems, onClose }: MobileDrawerProps) => (
  <aside
    className={cn(
      "fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
      open ? "translate-x-0" : "translate-x-full"
    )}
    aria-label="Mobile navigation"
  >
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 bg-[#8F3648]">
      <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
        <div className="relative w-9 h-9">
          <Image src="/home/logo.svg" alt={SCHOOL_INFO.name} fill className="object-contain" />
        </div>
        <span className="text-sm font-semibold text-white leading-tight max-w-[160px]">
          {SCHOOL_INFO.name}
        </span>
      </Link>
      <button onClick={onClose} aria-label="Close menu" className="p-1 rounded-md text-white hover:bg-white/20 transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Contact CTA */}
    <div className="px-5 py-4 border-b border-gray-100">
      <Link href={SCHOOL_INFO.contactHref} onClick={onClose}>
        <Button className="w-full bg-[#8F3648] hover:bg-[#3D171F] text-white rounded-full py-2 text-sm font-medium transition-colors">
          Contact Us
        </Button>
      </Link>
    </div>

    {/* Nav Items */}
    <div className="flex-1 overflow-y-auto py-2">
      {navItems.map((item) => (
        <MobileNavItem key={item.href} item={item} pathname={pathname} onClose={onClose} />
      ))}
    </div>

    {/* Footer */}
    <div className="px-5 py-5 border-t border-gray-100 space-y-4 bg-gray-50">
      <div className="flex items-center justify-center gap-3">
        {SOCIAL_LINKS.map((social) => (
          <SocialIcon key={social.name} {...social} />
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-gray-500">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#8F3648]" />
          <span>{SCHOOL_INFO.address}</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-gray-500">
          <Phone className="w-3.5 h-3.5 flex-shrink-0 text-[#8F3648]" />
          <span>{SCHOOL_INFO.phone}</span>
        </div>
      </div>
    </div>
  </aside>
);