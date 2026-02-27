"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/layout/navbar.types";

interface NavDropdownProps {
  item: NavItem;
  isActive: boolean;
}

export const NavDropdown = ({ item, isActive }: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-medium transition-colors hover:text-[#8F3648] pb-0.5",
          isActive ? "text-[#8F3648] border-b-2 border-[#8F3648]" : "text-gray-700"
        )}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && item.children && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-3xl z-50 overflow-hidden"
          style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.15)" }}
        >
          <div className="h-3 w-full bg-[#8F3648] rounded-t-3xl" />
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
                    !isLast && "border-b border-gray-100",
                    isChildActive ? "text-[#8F3648]" : "text-gray-900 hover:text-[#8F3648]"
                  )}
                >
                  <span className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-light leading-none transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
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