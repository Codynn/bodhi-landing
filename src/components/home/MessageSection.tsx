import { SCHOOL_MESSAGE_DATA } from "@/constants/home/message.constants";
import Image from "next/image";

const SchoolMessageSection = () => {
  const { sectionLabel, heading, principalImage, messageparagraphs, closing } =
    SCHOOL_MESSAGE_DATA;

  return (
    <section className="w-full py-10 px-6 md:px-16 my-12">
      {/* Section Label + Heading — centered */}
      <div className="text-center mb-8">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7B1113] uppercase mb-1">
          {sectionLabel}
        </p>
        <h2 className="text-[2rem] md:text-[2.25rem] font-bold text-[#7B1113] leading-tight">
          {heading}
        </h2>
      </div>

      {/* Two-column layout: image left, text right */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start max-w-6xl mx-auto rounded-lg bg-gray-100 px-4 py-6">
        
        {/* Principal Image — left column, fixed width */}
        <div className="flex-shrink-0 w-full md:w-[340px]">
          <Image
            src={principalImage.src}
            alt={principalImage.alt}
            width={340}
            height={415}
            className="w-full h-auto object-cover object-top rounded-lg"
          />
        </div>

        {/* Message Text — right column */}
        <div className="flex-1 text-[13px] text-[#1a1a1a] leading-[1.75]">
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
        </div>
      </div>
    </section>
  );
};

export default SchoolMessageSection;