'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import Link from 'next/link'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ADMISSION_CONTENT } from '@/constants/admission/admission.constants'
import { GRADE_OPTIONS, RELATIONSHIP_OPTIONS } from '@/types/admission/admission.types'

// ── Validation ────────────────────────────────────────────────────────────────
const schema = z.object({
  studentFullName: z.string().min(2, 'Student name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(3, 'Address is required'),
  gradeLevel: z.string().min(1, 'Please select a grade'),
  parentFullName: z.string().min(2, 'Parent name is required'),
  relationshipToStudent: z.string().min(1, 'Please select relationship'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  phoneNumber: z.string().min(7, 'Phone number is required'),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

// ── Shared styles ─────────────────────────────────────────────────────────────
const TEXT = 'text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'

const labelClass = `${TEXT} font-semibold text-gray-800`

const inputClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
  transition-colors placeholder:text-gray-400
`

const selectTriggerClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  shadow-none focus:ring-0 focus:border-[#8F3648] px-0
  text-gray-400 transition-colors
`

// ── Animations ────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

export function AdmissionSection() {
  const {
    breadcrumb, pageTitle, sectionTag, heading, paragraphs,
    formTitle, studentSectionLabel, parentSectionLabel,
    submitLabel, successTitle,
  } = ADMISSION_CONTENT

  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      studentFullName: '', dateOfBirth: '', address: '',
      gradeLevel: '', parentFullName: '', relationshipToStudent: '',
      email: '', phoneNumber: '', message: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    console.log('Admission form submitted:', values)
    form.reset()
    setShowSuccess(true)
  }

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

          {/* ── Breadcrumb ── */}
          <motion.nav
            className={`flex justify-center items-center gap-1.5 ${TEXT} text-gray-500 mb-4 sm:mb-5`}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {i < breadcrumb.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-[#8F3648] transition-colors duration-200">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#8F3648] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* ── Page Title ── */}
          <motion.h1
            className="
              text-center font-bold text-gray-900 tracking-tight
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
              mb-10 sm:mb-12 lg:mb-14
            "
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            {pageTitle}
          </motion.h1>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">

            {/* ── LEFT: Content ── */}
            <div className="w-full lg:w-[38%] xl:w-[36%] 2xl:w-[34%] flex-shrink-0">

              {/* Tag */}
              <motion.p
                className="
                  font-semibold tracking-[0.18em] uppercase text-[#8F3648]
                  text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] 2xl:text-[15px]
                  mb-2 sm:mb-3
                "
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.15}
              >
                {sectionTag}
              </motion.p>

              {/* Heading */}
              <motion.h2
                className="
                  font-bold text-[#8F3648] leading-tight
                  text-[20px] sm:text-[24px] md:text-[28px] lg:text-[26px] xl:text-[30px] 2xl:text-[38px]
                  mb-5 sm:mb-6 2xl:mb-8
                "
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
              >
                {heading}
              </motion.h2>

              {/* Paragraphs */}
              <div className="flex flex-col gap-4 2xl:gap-5">
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className={`${TEXT} text-gray-600 leading-relaxed`}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.25 + i * 0.07}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <motion.div
              className="flex-1 bg-gray-100 rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-9 2xl:px-12 2xl:py-12 max-w-screen w-full"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              {/* Form title */}
              <p className={`${TEXT} font-bold text-gray-800 mb-6 sm:mb-8`}>
                {formTitle}
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">

                  {/* ── Student Details ── */}
                  <p className={`${TEXT} font-bold text-gray-800 border-b border-gray-100 pb-2`}>
                    {studentSectionLabel}
                  </p>

                  {/* Student Full Name */}
                  <FormField
                    control={form.control}
                    name="studentFullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Student&apos;s Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" className={inputClass} {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
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
                          <FormLabel className={labelClass}>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className={`${inputClass} text-gray-500`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[11px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter address" className={inputClass} {...field} />
                          </FormControl>
                          <FormMessage className="text-[11px]" />
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
                        <FormLabel className={labelClass}>Applying for Grade / Level*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GRADE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />

                  {/* ── Parent/Guardian Details ── */}
                  <p className={`${TEXT} font-bold text-gray-800 border-b border-gray-100 pb-2 mt-2`}>
                    {parentSectionLabel}
                  </p>

                  {/* Parent Full Name */}
                  <FormField
                    control={form.control}
                    name="parentFullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Parent / Guardian Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" className={inputClass} {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />

                  {/* Relationship */}
                  <FormField
                    control={form.control}
                    name="relationshipToStudent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Relationship to Student*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RELATIONSHIP_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[11px]" />
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
                            <Input placeholder="Enter email" className={inputClass} {...field} />
                          </FormControl>
                          <FormMessage className="text-[11px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" className={inputClass} {...field} />
                          </FormControl>
                          <FormMessage className="text-[11px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Any Message or Questions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter message"
                            rows={3}
                            className="
                              rounded-none border-0 border-b border-gray-300 bg-transparent
                              shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
                              resize-none px-0 transition-colors placeholder:text-gray-400
                              text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                            "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="
                      w-full text-white mt-2
                      bg-[#8F3648] hover:bg-[#3D171F]
                      rounded-full h-12 sm:h-13 2xl:h-16
                      text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                      font-semibold tracking-wide
                      shadow-[0_6px_0_#5E1010]
                      hover:shadow-[0_4px_0_#5E1010]
                      active:shadow-[0_0px_0_#5E1010]
                      active:translate-y-[6px]
                      hover:translate-y-[2px]
                      transition-all duration-150
                    "
                  >
                    {submitLabel}
                  </Button>

                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Success Popup ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-sm w-full flex flex-col items-center gap-5 text-center"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Green check */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 sm:w-12 sm:h-12 text-green-500" strokeWidth={1.8} />
              </div>

              {/* Message */}
              <p className="text-[14px] sm:text-[16px] xl:text-[18px] 2xl:text-[20px] font-semibold text-gray-800 leading-snug">
                {successTitle}
              </p>

              {/* Close button */}
              <Button
                onClick={() => setShowSuccess(false)}
                className="
                  w-full bg-[#8F3648] hover:bg-[#3D171F] text-white
                  rounded-full h-10 sm:h-11
                  text-[12px] sm:text-[14px] font-semibold
                  shadow-[0_4px_0_#5E1010]
                  hover:shadow-[0_2px_0_#5E1010]
                  active:shadow-none active:translate-y-[4px]
                  hover:translate-y-[2px]
                  transition-all duration-150
                "
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}