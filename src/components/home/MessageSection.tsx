"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SCHOOL_MESSAGE_DATA } from "@/constants/home/message.constants";
import { SchoolMessageData } from "@/types/home/message.types";

interface messageSectionProps {
    data?:SchoolMessageData
}

const SchoolMessageSection = ({ data }: messageSectionProps) => {
  // 🧠 HYBRID FALLBACK SYSTEM
  const content = {
    sectionLabel: data?.sectionLabel ?? SCHOOL_MESSAGE_DATA.sectionLabel,
    heading: data?.heading ?? SCHOOL_MESSAGE_DATA.heading,
    principalImage:
      data?.principalImage ?? SCHOOL_MESSAGE_DATA.principalImage,
    messageparagraphs:
      data?.messageparagraphs ?? SCHOOL_MESSAGE_DATA.messageparagraphs,
    closing: data?.closing ?? SCHOOL_MESSAGE_DATA.closing,
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full py-10 px-6 md:px-16 my-12">

      {/* Heading */}
      <div className="text-center mb-8 max-w-7xl mx-auto">
        <p className="text-[#425190] uppercase tracking-[0.2em] font-semibold">
          {content.sectionLabel}
        </p>

        <h2 className="text-[32px] font-bold text-[#8F3648]">
          {content.heading}
        </h2>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto bg-gray-100 p-6 rounded-lg">

        {/* Image */}
        <div className="w-full md:w-[340px]">
          <Image
            src={content.principalImage.src}
            alt={content.principalImage.alt}
            width={340}
            height={415}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-[16px]">

          <div
            className={`relative overflow-hidden transition-all duration-500
            ${!isExpanded ? "max-h-[14em] lg:max-h-none" : "max-h-[2000px]"}`}
          >
            {content.messageparagraphs.map((p: string, i: number) => (
              <p key={i} className="mb-3">
                {p}
              </p>
            ))}

            {/* Closing */}
            <div className="mt-5">
              <p>{content.closing.salutation}</p>
              <p className="font-bold">{content.closing.name}</p>
              <p>{content.closing.title}</p>
              <p>{content.closing.school}</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-[#8F3648] font-semibold flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Read Less <ChevronUp />
              </>
            ) : (
              <>
                Read More <ChevronDown />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SchoolMessageSection;