"use client";

/**
 * components/ContactSection.tsx
 * ─────────────────────────────────────────────────────────────────
 * Contact-Us page section — Next.js 14 App Router, TypeScript.
 *
 * Full data flow:
 *
 *   useForm (react-hook-form + zodResolver(contactFormSchema))
 *     └─▶ onSubmit
 *           └─▶ useContactMessage  (TanStack useMutation)
 *                 └─▶ sendContactMessage  (service)
 *                       └─▶ axiosInstance.post("/contactMessage")
 *                             └─▶ POST https://api.betterschool.app/api/contactMessage
 *
 *   On success  → shadcn toast (green left border) + form.reset()
 *   On error    → shadcn toast (destructive / red)
 *   While pending → all inputs disabled + Loader2 spinner on button
 *
 * Required in app/layout.tsx:
 *   import { Toaster } from "@/components/ui/toaster"
 *   <Toaster />
 */

import { useForm }          from "react-hook-form";
import { zodResolver }      from "@hookform/resolvers/zod";
import { motion, Variants } from "framer-motion";
import {
  Phone, MapPin, Clock,
  Facebook, Youtube, Instagram, Linkedin,
  Loader2,
} from "lucide-react";
import Link from "next/link";

import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input }    from "@/components/ui/input";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact-form-schema";
import { CONTACT_CONTENT }   from "@/constants/contact/contact.constants";
import { useContactMessage } from "@/hooks/usecontactmessage";
import { ResultPopup } from "../shared/ResultPopUp";

// ── Shared responsive text size ───────────────────────────────────
const TEXT = "text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]";

const labelClass = `${TEXT} font-semibold text-gray-800`;

const inputClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
  transition-colors placeholder:text-gray-400
`;

const textareaClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
  resize-none transition-colors placeholder:text-gray-400
`;

// ── Framer Motion ─────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
};

// ── Social icons config ───────────────────────────────────────────
const SOCIAL_ICONS = [
  { key: "facebook",  Icon: Facebook,  label: "Facebook"  },
  { key: "youtube",   Icon: Youtube,   label: "YouTube"   },
  { key: "instagram", Icon: Instagram, label: "Instagram" },
  { key: "linkedin",  Icon: Linkedin,  label: "LinkedIn"  },
] as const;

// ─────────────────────────────────────────────────────────────────
export function ContactSection() {
  const {
    breadcrumb, pageTitle, sectionTag,
    heading, info, formTitle, submitLabel,
  } = CONTACT_CONTENT;

  // ── 1. Form ─────────────────────────────────────────
  const form = useForm<ContactFormValues>({
    resolver:      zodResolver(contactFormSchema),
    defaultValues: {
      fullName:    "",
      email:       "",
      phoneNumber: "",
      message:     "",
    },
  });

  // ── 2. Mutation ─────────────────────────────────────
  const { contactMutation, isPending, popup, closePopup } = useContactMessage({
    onSuccess: () => form.reset(),
  });

  // ── 3. Submit ───────────────────────────────────────
  const onSubmit = (values: ContactFormValues) => contactMutation(values);

  // ── Social hrefs ────────────────────────────────────
  const socialHrefs: Record<string, string> = {
    facebook:  info.social.facebook,
    youtube:   info.social.youtube,
    instagram: info.social.instagram,
    linkedin:  info.social.linkedin,
  };

  // ─────────────────────────────────────────────────────
  return (
    <>
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full max-w-7xl
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
          sm:pt-10 pb-16 sm:pb-20 lg:pb-24 2xl:pb-32
        "
      >
        {/* ── Breadcrumb ──────────────────────────────── */}
        <motion.nav
          className={`flex justify-center items-center gap-1.5 ${TEXT} text-gray-500 mb-4 sm:mb-5`}
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                  fill="none" stroke="currentColor" strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
                <span className="text-[#8F3648] font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* ── Page title ──────────────────────────────── */}
        <motion.h1
          className="
            text-center font-bold text-gray-900 tracking-tight
            text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]
            mb-10 sm:mb-12 lg:mb-14
          "
          variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
        >
          {pageTitle}
        </motion.h1>

        {/* ── Two-column layout ───────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">

          {/* ══ LEFT — contact info + map ══════════════ */}
          <div className="w-full lg:w-[46%] xl:w-[44%] flex-shrink-0 flex flex-col gap-6 sm:gap-7 2xl:gap-9">

            {/* Section tag */}
            <motion.p
              className={`font-semibold tracking-[0.18em] uppercase text-[#425190] ${TEXT}`}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
            >
              {sectionTag}
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="
                font-bold text-[#8F3648] leading-tight -mt-2
                text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]
              "
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            >
              {heading}
            </motion.h2>

            {/* Info blocks */}
            <motion.div
              className="flex flex-col gap-4 sm:gap-5 2xl:gap-6"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
            >
              {/* Phone */}
              <div>
                <p className={`${TEXT} font-bold text-gray-800 mb-1`}>Contact Us</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 xl:w-5 xl:h-5 text-gray-500 flex-shrink-0" />
                  <span className={`${TEXT} text-gray-600`}>{info.phone.join(", ")}</span>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className={`${TEXT} font-bold text-gray-800 mb-1`}>Address</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 xl:w-5 xl:h-5 text-gray-500 flex-shrink-0" />
                  <span className={`${TEXT} text-gray-600`}>{info.address}</span>
                </div>
              </div>

              {/* Hours */}
              <div>
                <p className={`${TEXT} font-bold text-gray-800 mb-1`}>School Hour</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 xl:w-5 xl:h-5 text-gray-500 flex-shrink-0" />
                  <span className={`${TEXT} text-gray-600`}>{info.schoolHours}</span>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className={`${TEXT} font-bold text-gray-800 mb-2`}>Stay Connected</p>
                <div className="flex items-center gap-2.5">
                  {SOCIAL_ICONS.map(({ key, Icon, label }) => (
                    <a
                      key={key}
                      href={socialHrefs[key] ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="
                        bg-[#5D8D42] text-white rounded-full
                        flex items-center justify-center flex-shrink-0
                        w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12
                        p-2 hover:opacity-85 active:opacity-70
                        transition-opacity duration-150
                      "
                    >
                      <Icon className="w-full h-full" strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Google Map embed */}
            <motion.div
              className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              style={{ height: "clamp(180px, 28vw, 280px)" }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
            >
              <iframe
                src={info.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              />
            </motion.div>
          </div>

          {/* ══ RIGHT — form ═══════════════════════════ */}
          <motion.div
            className="
              flex-1 rounded-2xl w-full max-w-[100vw]
              px-4 py-6 sm:px-7 sm:py-8 md:px-8 md:py-9 2xl:px-10 2xl:py-12
              bg-gray-100
            "
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
          >
            <p className={`${TEXT} font-bold text-gray-800 mb-6 sm:mb-8`}>
              {formTitle}
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 sm:gap-6"
                noValidate
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          autoComplete="name"
                          disabled={isPending}
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={TEXT} />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          disabled={isPending}
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={TEXT} />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          autoComplete="tel"
                          disabled={isPending}
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={TEXT} />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your message"
                          rows={4}
                          disabled={isPending}
                          className={textareaClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={TEXT} />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="
                    w-full bg-[#8F3648] hover:bg-[#3D171F] text-white
                    rounded-full h-12 sm:h-13 2xl:h-16 mt-2
                    text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
                    font-semibold tracking-wide
                    shadow-[0_6px_0_#5E1010]
                    hover:shadow-[0_4px_0_#5E1010]
                    active:shadow-[0_0px_0_#5E1010]
                    active:translate-y-[6px]
                    hover:translate-y-[2px]
                    transition-all duration-150
                    disabled:opacity-60 disabled:cursor-not-allowed
                    disabled:shadow-none disabled:translate-y-0
                  "
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    submitLabel
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>

      {/* ── Result Popup (Success / Error) ── */}
      <ResultPopup
        open={popup.open}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />
    </>
  );
}