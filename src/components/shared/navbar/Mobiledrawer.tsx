"use client";

import Link from "next/link";
import Image from "next/image";
import { X, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
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

export const MobileDrawer = ({
  open,
  pathname,
  navItems,
  onClose,
}: MobileDrawerProps) => (
  /*
    Full-screen overlay.
    mobilenav.png is the red bg with the scalloped curved bottom
    baked into the PNG shape itself — object-fill preserves it.
  */
  <aside
    className={cn(
      "fixed inset-0 z-50 flex flex-col lg:hidden",
      "transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "translate-x-full"
    )}
    aria-label="Mobile navigation"
  >

    {/* ── Background PNG — fills full screen, curve visible at bottom ── */}
    <div className="absolute inset-0 -z-10">
      <Image
        src="/home/mobilenav.png"
        alt=""
        fill
        className="object-fill"
        priority
      />
    </div>

    {/* ── X close — top right only, no logo ── */}
    <div className="flex justify-end px-5 pt-5 pb-2 flex-shrink-0">
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>

    {/* ── Nav links ── */}
    <nav className="flex-1 overflow-y-auto px-8 pt-2 pb-4">
      {navItems.map((item) => (
        <MobileNavItem
          key={item.href}
          item={item}
          pathname={pathname}
          onClose={onClose}
        />
      ))}
    </nav>

    {/* ── Footer: socials + address + phone + "Website by BetterSchool" ── */}
    <div className="flex-shrink-0 px-6 pt-2 pb-10 space-y-3">

      {/* Social icons */}
      <div className="flex items-center gap-3 mb-1">
        {SOCIAL_LINKS.map((social) => (
          <SocialIcon key={social.name} {...social} />
        ))}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-[13px] sm:text-[14px] text-white/85">
        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-white" />
        <span>{SCHOOL_INFO.address}</span>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-[13px] sm:text-[14px] text-white/85">
        <Phone className="w-3.5 h-3.5 flex-shrink-0 text-white" />
        <span>{SCHOOL_INFO.phone}</span>
      </div>

      {/* Website by BetterSchool */}
      <div className="flex items-center justify-center gap-1.5 pt-3">
        <span className="text-[18px] sm:text-[18px]  text-white/60">
          Website by
        </span>
        <div className="flex items-center gap-1">
          <div className="relative w-30 h-25">
            <Image
              src="/footer/better.svg"
              alt="BetterSchool logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

    </div>
  </aside>
);