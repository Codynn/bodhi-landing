"use client";


import { useForm }          from "react-hook-form";
import { zodResolver }      from "@hookform/resolvers/zod";
import { motion, Variants } from "framer-motion";
import { Loader2 }          from "lucide-react";
import Link                 from "next/link";

import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input }    from "@/components/ui/input";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";


import { ADMISSION_CONTENT, AdmissionContent }                    from "@/constants/admission/admission.constants";
import { GRADE_OPTIONS, RELATIONSHIP_OPTIONS }  from "@/types/admission/admission.types";
import { useAdmission }                         from "@/hooks/useAdmission";
import { admissionFormSchema, AdmissionFormValues } from "@/lib/validations/admission-form.schema";
import { ResultPopup } from "../shared/ResultPopUp";


// ── Shared styles ─────────────────────────────────────────────────
const TEXT = "text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]";

const labelClass = `${TEXT} font-semibold text-gray-800`;

const inputClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
  transition-colors placeholder:text-gray-400
`;

const selectTriggerClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  shadow-none focus:ring-0 focus:border-[#8F3648] px-0
  text-gray-400 transition-colors
`;

// ── Animations ────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

interface admissionProps {
   data?:AdmissionContent
}


// ─────────────────────────────────────────────────────────────────
export function AdmissionSection({data}:admissionProps) {
 

    const content = {
    breadcrumb: data?.breadcrumb ?? ADMISSION_CONTENT.breadcrumb,
    pageTitle: data?.pageTitle ?? ADMISSION_CONTENT.pageTitle,
    sectionTag: data?.sectionTag ?? ADMISSION_CONTENT.sectionTag,
    heading:  data?.heading ?? ADMISSION_CONTENT.heading,
    paragraphs:  data?.paragraphs ?? ADMISSION_CONTENT.paragraphs,
    formTitle:  data?.formTitle ?? ADMISSION_CONTENT.formTitle,
    studentSectionLabel:
       data?.studentSectionLabel ?? ADMISSION_CONTENT.studentSectionLabel,
    parentSectionLabel:
       data?.parentSectionLabel ?? ADMISSION_CONTENT.parentSectionLabel,
    submitLabel:  data?.submitLabel ?? ADMISSION_CONTENT.submitLabel,
  };

  // ── 1. Form ──────────────────────────────────────
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
      studentFullName:       "",
      dateOfBirth:           "",
      address:               "",
      gradeLevel:            "",
      parentFullName:        "",
      relationshipToStudent: "",
      email:                 "",
      phoneNumber:           "",
      message:               "",
    },
  });

  // ── 2. Mutation ──────────────────────────────────
  const { admissionMutation, isPending, popup, closePopup } = useAdmission({
    onSuccess: () => form.reset(),
  });

  // ── 3. Submit ─────────────────────────────────────
  const onSubmit = (values: AdmissionFormValues) => admissionMutation(values);

  // ─────────────────────────────────────────────────
  return (
    <>
      <section className="w-full bg-white">

         <div className="bg-gray-50 mb-5 max-w-screen w-full py-4">
               {/* ── Breadcrumb ──────────────────────────── */}
          
          <motion.nav
            className={`flex justify-center items-center gap-1.5 ${TEXT} text-gray-500 mb-4 sm:mb-5`}
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            aria-label="Breadcrumb"
          >
            {content.breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

          {/* ── Page Title ──────────────────────────── */}
          <motion.h1
            className="
              text-center font-bold text-gray-900 tracking-tight
              text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]
              mb-10 sm:mb-12 lg:mb-14
            "
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
          >
            {content.pageTitle}
          </motion.h1>

         </div>


        <div
          className="
            mx-auto w-full max-w-7xl
            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
            sm:pt-10 pb-16 sm:pb-20 lg:pb-24 2xl:pb-32
          "
        >
        

          {/* ── Two-column layout ───────────────────── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">

            {/* ══ LEFT — info ════════════════════════ */}
            <div className="w-full lg:w-[38%] xl:w-[36%] 2xl:w-[34%] flex-shrink-0">

              <motion.p
                className={`font-semibold tracking-[0.18em] uppercase text-[#425190] ${TEXT} mb-2 sm:mb-3`}
                variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
              >
                {content.sectionTag}
              </motion.p>

              <motion.h2
                className="
                  font-bold text-[#8F3648] leading-tight
                  text-[32px] sm:text-[34px] md:text-[34px] lg:text-[40px]
                  mb-5 sm:mb-6 2xl:mb-8
                "
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              >
                {content.heading}
              </motion.h2>

              <div className="flex flex-col gap-4 2xl:gap-5">
                {content.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className={`${TEXT} text-gray-600 leading-relaxed`}
                    variants={fadeUp} initial="hidden" animate="visible"
                    custom={0.25 + i * 0.07}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* ══ RIGHT — form ═══════════════════════ */}
            <motion.div
              className="flex-1 bg-gray-100 rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-9 2xl:px-12 2xl:py-12 max-w-screen w-full"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            >
              <p className={`${TEXT} font-bold text-gray-800 mb-6 sm:mb-8`}>
                {content.formTitle}
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 sm:gap-6"
                  noValidate
                >

                  {/* ── Student Details ─────────────── */}
                  <p className={`${TEXT} font-bold text-gray-800 border-b border-gray-300 pb-2`}>
                    {content.studentSectionLabel}
                  </p>

                  {/* Student Full Name */}
                  <FormField
                    control={form.control}
                    name="studentFullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Student&apos;s Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
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

                  {/* Date of Birth + Address — 2 col */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              disabled={isPending}
                              className={`${inputClass} text-gray-500`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className={TEXT} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Address *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter address"
                              autoComplete="street-address"
                              disabled={isPending}
                              className={inputClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className={TEXT} />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Grade / Level */}
                  <FormField
                    control={form.control}
                    name="gradeLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Applying for Grade / Level *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GRADE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className={TEXT} />
                      </FormItem>
                    )}
                  />

                  {/* ── Parent / Guardian Details ────── */}
                  <p className={`${TEXT} font-bold text-gray-800 border-b border-gray-300 pb-2 mt-2`}>
                    {content.parentSectionLabel}
                  </p>

                  {/* Parent Full Name */}
                  <FormField
                    control={form.control}
                    name="parentFullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Parent / Guardian Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
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

                  {/* Relationship */}
                  <FormField
                    control={form.control}
                    name="relationshipToStudent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Relationship to Student *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RELATIONSHIP_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className={TEXT} />
                      </FormItem>
                    )}
                  />

                  {/* Email + Phone — 2 col */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email"
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
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter phone number"
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
                  </div>

                  {/* Message / Queries */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Any Message or Questions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter message or any queries"
                            rows={3}
                            disabled={isPending}
                            className="
                              rounded-none border-0 border-b border-gray-300 bg-transparent
                              shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
                              resize-none px-0 transition-colors placeholder:text-gray-400
                              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
                            "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={TEXT} />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="
                      w-full text-white mt-2
                      bg-[#8F3648] hover:bg-[#3D171F]
                      rounded-full h-12 sm:h-13 2xl:h-16
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
                        Submitting...
                      </span>
                    ) : (
                      content.submitLabel
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