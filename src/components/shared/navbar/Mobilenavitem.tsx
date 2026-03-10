"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/layout/navbar.types";

interface MobileNavItemProps {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}

export const MobileNavItem = ({ item, pathname, onClose }: MobileNavItemProps) => {
  const [open, setOpen] = useState(false);
  const isActive = pathname === item.href;

  if (item.children) {
    return (
      <div className="border-b border-gray-100 last:border-0">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "w-full flex items-center justify-between px-5 py-3.5 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]  font-medium transition-colors",
            isActive ? "text-[#8F3648]" : "text-gray-800"
          )}
        >
          {item.label}
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
        </button>
        {open && (
          <div className="bg-gray-50 px-5 pb-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block py-2.5 pl-3 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]  text-gray-600 hover:text-[#8F3648] border-l-2 border-gray-200 hover:border-[#8F3648] transition-colors mb-1"
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
          "flex items-center gap-1.5 px-5 py-3.5 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]  font-medium transition-colors hover:text-[#8F3648]",
          isActive ? "text-[#8F3648]" : "text-gray-800"
        )}
      >
        {item.label}
        {item.label === "Donate" && <span className="text-[#8F3648]">♥</span>}
      </Link>
    </div>
  );
};