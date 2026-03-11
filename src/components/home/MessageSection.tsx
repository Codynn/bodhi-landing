"use client";
import { SCHOOL_MESSAGE_DATA } from "@/constants/home/message.constants";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SchoolMessageSection = () => {
  const { sectionLabel, heading, principalImage, messageparagraphs, closing } =
    SCHOOL_MESSAGE_DATA;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full py-10 px-6 md:px-16 my-12">
      {/* Section Label + Heading — centered */}
      <div className="text-center mb-8 max-w-7xl mx-auto">
        <p className="flex-1 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-semibold tracking-[0.2em] text-[#425190] uppercase mb-1">
          {sectionLabel}
        </p>
        <h2 className="text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] font-bold text-[#8F3648] leading-tight">
          {heading}
        </h2>
      </div>

      {/* Two-column layout: image left, text right */}
      <div className="w-full flex flex-col md:flex-col lg:flex-row gap-4 md:gap-6 items-start max-w-7xl mx-auto rounded-lg bg-gray-100 px-4 py-6">
        {/* Principal Image */}
        <div className="flex-shrink-0 w-full md:w-[340px]">
          <Image
            src={principalImage.src}
            alt={principalImage.alt}
            width={340}
            height={415}
            className="w-full h-auto object-cover object-top rounded-lg"
          />
        </div>

        {/* Message Text */}
        <div className="flex-1 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-[#1a1a1a]">

          {/*
            Small/medium: collapse to ~8 lines when not expanded
            Large+:       always show full text, no clamp
          */}
          <div
            className={`
              relative overflow-hidden transition-all duration-500 ease-in-out
              ${!isExpanded ? "max-h-[14em] lg:max-h-none" : "max-h-[2000px] lg:max-h-none"}
            `}
          >
            {messageparagraphs.map((paragraph, index) => (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            ))}

            {/* Closing block */}
            <div className="mt-5">
              <p className="mb-0">{closing.salutation}</p>
              <p className="font-bold">{closing.name}</p>
              <p>{closing.title}</p>
              <p>{closing.school}</p>
            </div>

            {/* Fade gradient — small/medium only, only when collapsed */}
            {!isExpanded && (
              <div className="lg:hidden absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
            )}
          </div>

          {/* Read More/Less button — small/medium only (hidden on lg+) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex lg:hidden items-center gap-1 mt-3 text-[#8F3648] font-semibold text-[15px] hover:text-[#425190] transition-colors duration-200 group"
          >
            {isExpanded ? (
              <>
                Read Less
                <ChevronUp className="w-4 h-4 transition-transform duration-200" />
              </>
            ) : (
              <>
                Read More
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SchoolMessageSection;