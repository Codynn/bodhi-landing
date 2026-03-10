"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarProps } from "@/types/layout/navbar.types";
import { NAV_ITEMS, SCHOOL_INFO } from "@/constants/layout/navbar.constants";
import { TopInfoBar } from "./Topinfobar";
import { DesktopNavLinks } from "./Desktopnavlinks";
import { MobileDrawer } from "./Mobiledrawer";

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={cn("w-full bg-white sticky top-0 z-40", className)}>


        <nav className="border-b border-gray-200 bg-white shadow-sm">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center">
              <div className="relative w-10 h-10 md:w-15 md:h-15">
                <Image src="/home/logo.svg" alt={SCHOOL_INFO.name} fill className="object-contain" priority />
              </div>
              <span className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]  font-bold text-gray-900  max-w-45 lg:max-w-xs">
                {SCHOOL_INFO.name}
              </span>
              <span className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]  font-bold text-gray-900 leading-tight max-w-45 lg:max-w-xs">
                {SCHOOL_INFO.name2}
              </span>
            </Link>

            <div className="flex flex-col justify-between py-2">

            <TopInfoBar />

            <div className="flex gap-12 items-center justify-between py-2">

            {/* Desktop Links */}
            <DesktopNavLinks items={NAV_ITEMS} pathname={pathname} />

            {/* Right — CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link href={SCHOOL_INFO.contactHref} className="hidden lg:block">
                <Button className="bg-[#8F3648] hover:bg-[#3D171F] text-white rounded-full px-6 py-2 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-medium shadow-[0_6px_0_#5E1010] hover:shadow-[0_4px_0_#5E1010] active:shadow-none hover:translate-y-[2px] active:translate-y-[6px] transition-all duration-150">
                  Contact Us
                </Button>
              </Link>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-8 h-8 md:w-10 md:h-10" />}
              </button>
            </div>

                </div>
          </div>
            </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      <MobileDrawer
        open={mobileOpen}
        pathname={pathname}
        navItems={NAV_ITEMS}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}