"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
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
      <div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between py-3 text-[17px] sm:text-[18px] font-medium text-white/90 hover:text-white transition-colors"
        >
          <span className={cn(isActive && "text-white font-semibold")}>
            {item.label}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-white/60 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="pl-3 pb-2 flex flex-col gap-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="flex items-center gap-2 py-2 text-[15px] sm:text-[16px] text-white/75 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-1.5 py-3 text-[17px] sm:text-[18px] font-medium transition-colors hover:text-white",
        isActive ? "text-white font-semibold" : "text-white/90"
      )}
    >
      {item.label}
      {item.label === "Donate" && <span className="text-red-300">♥</span>}
    </Link>
  );
};