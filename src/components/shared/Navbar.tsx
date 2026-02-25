"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, JSX } from "react";
import { ChevronDown, MapPin, Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavItem, NavbarProps } from "@/types/layout/navbar.types";
import {
  NAV_ITEMS,
  SOCIAL_LINKS,
  SCHOOL_INFO,
} from "@/constants/layout/navbar.constants";

// Social Icons as SVGs
const SocialIcon = ({
  icon,
  href,
  name,
}: {
  icon: string;
  href: string;
  name: string;
}) => {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          fill="white"
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
        />
      </svg>
    ),
    instagram: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-3.5 h-3.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors"
    >
      {icons[icon]}
    </a>
  );
};

const NavDropdown = ({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#8B1A1A] pb-1",
          isActive
            ? "text-[#8B1A1A] border-b-2 border-[#8B1A1A]"
            : "text-gray-800",
        )}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Panel */}
      {open && item.children && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-3xl z-50 overflow-hidden"
          style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}
        >
          {/* Dark red top accent bar */}
          <div className="h-3 w-full bg-[#7B1C1C] rounded-t-3xl" />

          {/* Items */}
          <div className="px-8 py-2">
            {item.children.map((child, idx) => {
              const isChildActive = pathname === child.href;
              const isLast = idx === item.children!.length - 1;

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-5 py-6 transition-colors",
                    !isLast && "border-b border-gray-200",
                    isChildActive
                      ? "text-[#8B1A1A]"
                      : "text-gray-900 hover:text-[#8B1A1A]",
                  )}
                >
                  {/* Plain arrow — matches Figma exactly */}
                  <span className="text-2xl font-light leading-none transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>

                  {/* Label */}
                  <span className="text-xl font-semibold leading-none tracking-tight">
                    {child.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile Accordion Nav Item
const MobileNavItem = ({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const isActive = pathname === item.href;

  if (item.children) {
    return (
      <div className="border-b border-gray-100 last:border-0">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors",
            isActive ? "text-[#8B1A1A]" : "text-gray-800",
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
        {open && (
          <div className="bg-gray-50 px-4 pb-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block py-2 pl-3 text-sm text-gray-600 hover:text-[#8B1A1A] border-l-2 border-gray-200 hover:border-[#8B1A1A] transition-colors mb-1"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100 last:border-0">
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors hover:text-[#8B1A1A]",
          isActive ? "text-[#8B1A1A]" : "text-gray-800",
        )}
      >
        {item.label}
        {item.label === "Donate" && <span className="text-[#8B1A1A]">♥</span>}
      </Link>
    </div>
  );
};

// Main Navbar
export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn("w-full bg-white shadow-sm sticky top-0 z-40", className)}
      >
        {/* Top Info Bar — hidden on mobile */}
        <div className="hidden md:block border-b border-gray-100 px-6 py-2">
          <div className="max-w-[100vw] mx-auto flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.name} {...social} />
              ))}
            </div>

            <span className="text-gray-300">|</span>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <span>{SCHOOL_INFO.address}</span>
            </div>

            <span className="text-gray-300">|</span>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Phone className="w-3.5 h-3.5 text-gray-500" />
              <span>{SCHOOL_INFO.phone}</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="px-4 md:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo + School Name */}
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 flex-shrink-0"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/home/logo.svg"
                  alt={SCHOOL_INFO.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-800 leading-tight max-w-[120px] md:max-w-[140px]">
                {SCHOOL_INFO.name}
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;

                if (item.children) {
                  return (
                    <NavDropdown
                      key={item.href}
                      item={item}
                      isActive={isActive}
                    />
                  );
                }

                if (item.label === "Donate") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#8F3648] pb-1",
                        isActive
                          ? "text-[#8F3648] border-b-2 border-[#3D171F]"
                          : "text-gray-800",
                      )}
                    >
                      Donate <span className="text-[#8B1A1A]">♥</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-[#8B1A1A] pb-1",
                      isActive
                        ? "text-[#8B1A1A] border-b-2 border-[#8B1A1A]"
                        : "text-gray-800",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Contact Us — desktop only */}
              <Link href={SCHOOL_INFO.contactHref} className="hidden lg:block">
                <Button
                  className="
      bg-[#8B1A1A] 
      hover:bg-[#7A1717]
      text-white 
      rounded-full 
      px-6 py-2 
      text-sm font-medium
      shadow-[0_6px_0_#5E1010]
      hover:shadow-[0_4px_0_#5E1010]
      active:shadow-[0_0px_0_#5E1010]
      active:translate-y-[6px]
      hover:translate-y-[2px]
      transition-all duration-150
    "
                >
                  Contact Us
                </Button>
              </Link>

              {/* Hamburger — mobile/tablet only */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
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
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-[#8B1A1A]">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="relative w-9 h-9">
              <Image
                src="/home/logo.svg"
                alt={SCHOOL_INFO.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs font-semibold text-white leading-tight max-w-[160px]">
              {SCHOOL_INFO.name}
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-1 rounded-md text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Us — right below header */}
        <div className="px-4 pt-4 pb-2 border-b border-gray-100">
          <Link
            href={SCHOOL_INFO.contactHref}
            onClick={() => setMobileOpen(false)}
          >
            <Button className="w-full bg-[#8B1A1A] hover:bg-[#7a1717] text-white rounded-full py-2 text-sm font-medium transition-colors">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => (
            <MobileNavItem
              key={item.href}
              item={item}
              pathname={pathname}
              onClose={() => setMobileOpen(false)}
            />
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="px-4 py-5 border-t border-gray-100 space-y-4">
          <div className="flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon key={social.name} {...social} />
            ))}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
              <span>{SCHOOL_INFO.address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
              <span>{SCHOOL_INFO.phone}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
