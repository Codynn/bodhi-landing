"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  INTRODUCTION_CONTENT,
  INTRODUCTION_STATS,
} from "@/constants/about/introduction.constants";
import { AnimatedStat } from "@/components/home/AnimatedStat";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.2 },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.35 },
  },
};

export function IntroductionHeroSection() {
  const { breadcrumb, pageTitle, sectionTag, heading, description, image } =
    INTRODUCTION_CONTENT;

  return (
    <section className="w-full bg-white">


<div className="bg-gray-50 mb-5 max-w-screen w-full py-4">
        {/* Breadcrumb */}
        <motion.nav
          className="flex justify-center items-center gap-1.5  text-sm sm:text-base max-md:text-lg  lg:text-lg  text-gray-500 mb-4 sm:mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {i < breadcrumb.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[#8F3648] transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#8F3648] font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* Page Title */}
        <motion.h1
          className="text-center text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-14 tracking-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {pageTitle}
        </motion.h1>



</div>
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:pt-10 pb-14 sm:pb-18 lg:pb-24">

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-start">
          {/* Image */}
          <motion.div
            className="w-full lg:w-[45%] xl:w-[42%] flex-shrink-0"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            {/* Section Tag */}
            <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] font-semibold tracking-widest text-[#425190] uppercase">
              {sectionTag}
            </p>

            {/* Heading */}
            <h1 className="text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px] font-bold text-[#8F3648] leading-tight mb-2">
              {heading}
            </h1>

            {/* Description */}
            <p className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px]  text-gray-600 leading-relaxedn mb-3 lg:mb-5">
              {description}
            </p>

            {/* Stats */}
<div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
  {INTRODUCTION_STATS.map((stat) => (
    <div
      key={stat.label}
      className="
        flex flex-col items-start
        [&_span:first-child]:text-[#2d6a2d]

        /* Numbers */
        [&_span:first-child]:text-[32px]
        sm:[&_span:first-child]:text-[32px]
        md:[&_span:first-child]:text-[32px]
        lg:[&_span:first-child]:text-[40px]
  

        /* Labels */
        [&_span:last-child]:text-gray-500
        [&_span:last-child]:text-xs
        sm:[&_span:last-child]:text-sm
        md:[&_span:last-child]:text-base
        lg:[&_span:last-child]:text-base
      "
    >
      <AnimatedStat stat={stat} />
    </div>
  ))}
</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
