"use client";

import { motion, Variants } from "framer-motion";
import { SCHOOL_FAMILY_CONTENT } from "@/constants/about/schoolfamily.constants";
import Link from "next/link";
import { useGetSchoolStaffs } from "@/services/api/directoryContentApi";
import SafeImage from "@/components/shared/SafeImage";
import type { SchoolFamilyContent } from "@/types/about/schoolfamily.types";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const fadeInCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

interface SchoolFamilyHeroSectionProps {
  data?: SchoolFamilyContent
}

export function SchoolFamilyHeroSection({ data }: SchoolFamilyHeroSectionProps) {
 
  const content = {
    breadcrumb: data?.breadcrumb ?? SCHOOL_FAMILY_CONTENT.breadcrumb,
    pageTitle:  data?.pageTitle  ?? SCHOOL_FAMILY_CONTENT.pageTitle,
    sectionTag: data?.sectionTag ?? SCHOOL_FAMILY_CONTENT.sectionTag,
    heading:    data?.heading    ?? SCHOOL_FAMILY_CONTENT.heading,
  }

  // 🔄 Dynamic — always client-side fetched
  const { data: schoolStaffs, isLoading: loadingStaffs } = useGetSchoolStaffs();
  const SCHOOL_FAMILY_MEMBERS = schoolStaffs?.data || [];

  return (
    <section className="w-full bg-white">
      <div className="bg-gray-50 mb-5 max-w-screen w-full py-4">
        <motion.nav
          className="flex justify-center items-center gap-1.5 text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-500 mb-4 sm:mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          aria-label="Breadcrumb"
        >
          {content.breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              {i < content.breadcrumb.length - 1 ? (
                <Link href={crumb.href} className="hover:text-[#8F3648] transition-colors duration-200">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#8F3648] font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.h1
          className="text-center font-bold text-gray-900 tracking-tight text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] mb-8 sm:mb-10 lg:mb-14"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {content.pageTitle}
        </motion.h1>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 sm:pt-10 pb-14 sm:pb-18 lg:pb-24">

        <motion.div
          className="text-center mb-8 sm:mb-10 lg:mb-12 2xl:mb-16"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <p className="font-semibold tracking-[0.18em] uppercase text-[#425190] text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] mb-2 sm:mb-3">
            {content.sectionTag}
          </p>
          <h2 className="font-bold text-[#8F3648] leading-tight text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]">
            {content.heading}
          </h2>
        </motion.div>

        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8">

          {/* Skeletons */}
          {loadingStaffs && Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              className="flex flex-col items-center text-center bg-gray-100 px-6 py-6 rounded-2xl"
              variants={fadeInCard}
              initial="hidden"
              animate="visible"
              custom={0.05 * i}
            >
              <div className="relative w-full overflow-hidden rounded-xl aspect-[3/4] mb-2 sm:mb-3 2xl:mb-4 bg-gray-300 animate-pulse" />
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-5 bg-gray-300 rounded w-1/2 animate-pulse" />
            </motion.div>
          ))}

          {/* Staff Cards */}
          {!loadingStaffs && SCHOOL_FAMILY_MEMBERS.map((member: any, i: number) => (
            <motion.div
              key={`${member.username}-${i}`}
              className="flex flex-col items-center text-center bg-gray-100 px-6 py-6 rounded-2xl"
              variants={fadeInCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              custom={0.05 * (i % 5)}
            >
              <div className="relative w-full overflow-hidden rounded-xl aspect-[3/4] mb-2 sm:mb-3 2xl:mb-4 shadow-sm">
                <SafeImage
                  src={member.photo || "/staff/dummy.png"}
                  fallback="/staff/dummy.png"
                  alt={member.username}
                  fill
                  unoptimized
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>

              <p className="font-semibold text-[#8F3648] leading-tight text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] mb-0.5">
                {member.username}
              </p>

              <p className="text-gray-500 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]">
                {member.role}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}