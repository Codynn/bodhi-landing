import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/layout/navbar.types";
import { NavDropdown } from "./Navdropdown";

interface DesktopNavLinksProps {
  items: NavItem[];
  pathname: string;
}

export const DesktopNavLinks = ({ items, pathname }: DesktopNavLinksProps) => (
  <div className="hidden lg:flex items-center gap-12">
    {items.map((item) => {
      const isActive = pathname === item.href;

      if (item.children) {
        return <NavDropdown key={item.href} item={item} isActive={isActive} />;
      }

      if (item.label === "Donate") {
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-1 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-medium transition-colors hover:text-[#8F3648] pb-0.5",
              isActive ? "text-[#8F3648] border-b-2 border-[#8F3648]" : "text-gray-700"
            )}
          >
            Donate <span className="text-[#8F3648]">♥</span>
          </Link>
        );
      }

      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-medium transition-colors hover:text-[#8F3648] pb-0.5",
            isActive ? "text-[#8F3648] border-b-2 border-[#8F3648]" : "text-gray-700"
          )}
        >
          {item.label}
        </Link>
      );
    })}
  </div>
);