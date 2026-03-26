"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Heart,
  ArrowRight,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FOOTER_CONTENT } from "@/constants/layout/footer.constants";

// ── Wave Transition ─────────────────────────────────────────────
export function FooterWave() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <div className="relative w-full h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56">
        <Image
          src="/footer/footer.png"
          alt=""
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// ── Social Circle ───────────────────────────────────────────────
function SocialCircle({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-9 h-9 rounded-full lg:p-2 
        border border-white/30
        flex items-center justify-center
        text-white
        hover:bg-white/20
        transition-all duration-200
      "
    >
      {icon}
    </Link>
  );
}

// ── Footer ──────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative w-full mt-12">
      {/* Wave */}
      <FooterWave />

      {/* Main Body */}
      <div className="bg-[#22784E] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-12 pb-8">
          {/* ───── Grid ───── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* ── Logo + About ── */}
            <div className="flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/home/logo.svg"
                    alt="Bodhi Logo"
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                </div>

                <div className="leading-tight">
                  <p className="text-[20px] sm:text-[22px] md:text-[22px] lg:text-[24px] font-bold">
                    Bodhi International
                  </p>
                  <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-white/70">
                    Montessori School
                  </p>
                </div>
              </Link>

              <p className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-white/75 leading-relaxed max-w-sm">
                {FOOTER_CONTENT.description}
              </p>
            </div>

            {/* ── Quick Links ── */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[20px] sm:text-[22px] md:text-[22px] lg:text-[24px] font-bold tracking-wide">
                Quick Links
              </h4>

              <ul className="flex flex-col gap-3">
                {FOOTER_CONTENT.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                       text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-white/75 
                        hover:text-white
                        transition-colors duration-200
                        inline-flex items-center gap-2
                      "
                    >
                      {link.label}

                      {link.label === "Donate" && (
                        <Heart className="w-3.5 h-3.5 fill-white text-white" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact + Social ── */}
            <div className="flex flex-col gap-8">
              {/* Contact */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[20px] sm:text-[22px] md:text-[22px] lg:text-[24px] font-semibold tracking-wide">
                  Contact Us
                </h4>

                <div className="flex items-center gap-3 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-white/75">
                  <Phone className="w-4 h-4 text-white/60 shrink-0" />

                  <span>
                    {FOOTER_CONTENT.phone.map((phone, index) => (
                      <span key={phone}>
                        <a href={`tel:${phone}`} className="hover:underline">
                          {phone}
                        </a>
                        {index < FOOTER_CONTENT.phone.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Social */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[20px] sm:text-[22px] md:text-[22px] lg:text-[24px] font-semibold tracking-wide">
                  Follow Us
                </h4>

                <div className="flex items-center gap-3">
                  <SocialCircle
                    href={FOOTER_CONTENT.socials.facebook}
                    label="Facebook"
                    icon={<Facebook className="w-4 h-4 lg:w-8 lg:h-8" />}
                  />
                  <SocialCircle
                    href={FOOTER_CONTENT.socials.youtube}
                    label="YouTube"
                    icon={<Youtube className="w-4 h-4 lg:w-8 lg:h-8" />}
                  />
                  <SocialCircle
                    href={FOOTER_CONTENT.socials.instagram}
                    label="Instagram"
                    icon={<Instagram className="w-4 h-4 lg:w-8 lg:h-8" />}
                  />
                  <SocialCircle
                    href={FOOTER_CONTENT.socials.linkedin}
                    label="LinkedIn"
                    icon={<Linkedin className="w-4 h-4 lg:w-8 lg:h-8" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ───── Bottom Bar ───── */}
          <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] text-white/60">
            <p>{FOOTER_CONTENT.copyright}</p>

            <div className="flex items-center gap-2">
              <span>Website by</span>
              <Image
                src={FOOTER_CONTENT.builtBy}
                alt="betterschool"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────── */}
      {/* Floating Half-Hidden 3D Donate Button */}
      {/* ────────────────────────────────────────────── */}

      <Link href="/donate" className="fixed bottom-8 right-0 z-50 group">
        <div
          className="
            translate-x-1/2
            group-hover:translate-x-0
            transition-transform duration-300 ease-out
          "
        >
          <div
            className="
              bg-[#8F3648]
              hover:bg-[#681616]
              text-white
              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
              font-bold
              px-6 py-3
              rounded-l-full
              flex items-center gap-2

              shadow-[0_6px_0_#4E0F0F]
              hover:shadow-[0_4px_0_#4E0F0F]
              active:shadow-none

              hover:translate-y-[2px]
              active:translate-y-[6px]

              transition-all duration-150
            "
          >
            Donate
            <Heart className="w-4 h-4 fill-white" />
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </footer>
  );
}
