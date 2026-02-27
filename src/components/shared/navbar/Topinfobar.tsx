import { MapPin, Phone } from "lucide-react";
import { SOCIAL_LINKS, SCHOOL_INFO } from "@/constants/layout/navbar.constants";
import { SocialIcon } from "./Socialicon";

export const TopInfoBar = () => (
  <div className="hidden lg:flex items-center justify-end gap-4 text-xs text-gray-500">
      <div className="flex items-center gap-2">
        {SOCIAL_LINKS.map((social) => (
          <SocialIcon key={social.name} {...social} />
        ))}
      </div>

      <div className="h-4 w-px bg-gray-300" />

      <div className="flex items-center gap-1.5 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-gray-500">
        <MapPin className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5  flex-shrink-0" />
        <span>{SCHOOL_INFO.address}</span>
      </div>

      <div className="h-4 w-px bg-gray-300" />

      <div className="flex items-center gap-1.5 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-gray-500">
        <Phone className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 flex-shrink-0" />
        <span>{SCHOOL_INFO.phone}</span>
      </div>
    </div>
);
