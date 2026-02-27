'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, Clock, CheckCircle, Facebook, Youtube, Instagram, Linkedin } from 'lucide-react'
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

import { contactFormSchema, ContactFormValues } from '@/lib/validations/contact-form-schema'
import { CONTACT_CONTENT } from '@/constants/contact/contact.constants'

// ── Shared text size ──────────────────────────────────────────────────────────
const TEXT = 'text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'

const labelClass = `${TEXT} font-semibold text-gray-800`
const inputClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
  transition-colors placeholder:text-gray-400
`

// ── Animations ────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
}

// ── Social icons — lucide-react ───────────────────────────────────────────────
const SOCIAL_ICONS = [
  { key: 'facebook',  Icon: Facebook,  bg: 'bg-[#5D8D42]', label: 'Facebook'  },
  { key: 'youtube',   Icon: Youtube,   bg: 'bg-[#5D8D42]', label: 'YouTube'   },
  { key: 'instagram', Icon: Instagram, bg: 'bg-[#5D8D42]', label: 'Instagram' },
  { key: 'linkedin',  Icon: Linkedin,  bg: 'bg-[#5D8D42]', label: 'LinkedIn'  },
]

export function ContactSection() {
  const {
    breadcrumb, pageTitle, sectionTag, heading,
    info, formTitle, submitLabel,
  } = CONTACT_CONTENT

  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: '', email: '', phoneNumber: '', message: '' },
  })

  const onSubmit = (values: ContactFormValues) => {
    console.log('Contact form submitted:', values)
    form.reset()
    setShowSuccess(true)
  }

  const socialHrefs: Record<string, string> = {
    facebook:  info.social.facebook,
    youtube:   info.social.youtube,
    instagram: info.social.instagram,
    linkedin:  info.social.linkedin,
  }

  return (
    <>
      <section className="w-full bg-white">
        <div
          className="
            mx-auto w-full max-w-screen
            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
            sm:pt-10 pb-16 sm:pb-20 lg:pb-24 2xl:pb-32
          "
        >
          {/* ── Breadcrumb ── */}
          <motion.nav
            className={`flex justify-center items-center gap-1.5 ${TEXT} text-gray-500 mb-4 sm:mb-5`}
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
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
                  <Link href={crumb.href} className="hover:text-[#8F3648] transition-colors duration-200">{crumb.label}</Link>
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
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
          >
            {pageTitle}
          </motion.h1>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">

            {/* ══ LEFT ══ */}
            <div className="w-full lg:w-[46%] xl:w-[44%] flex-shrink-0 flex flex-col gap-6 sm:gap-7 2xl:gap-9">

              {/* Tag */}
              <motion.p
                className="font-semibold tracking-[0.18em] uppercase text-[#425190] text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]"
                variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
              >
                {sectionTag}
              </motion.p>

              {/* Heading */}
              <motion.h2
                className="
                  font-bold text-[#8F3648] leading-tight -mt-2
                  text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[32px] 2xl:text-[54px]
                "
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              >
                {heading}
              </motion.h2>

              {/* ── Info blocks ── */}
              <motion.div
                className="flex flex-col gap-4 sm:gap-5 2xl:gap-6"
                variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
              >
                {/* Phone */}
                <div>
                  <p className={`${TEXT} font-bold text-gray-800 mb-1`}>Contact Us</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 xl:w-5 xl:h-5 text-gray-500 flex-shrink-0" />
                    <span className={`${TEXT} text-gray-600`}>{info.phone.join(', ')}</span>
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

                {/* School Hours */}
                <div>
                  <p className={`${TEXT} font-bold text-gray-800 mb-1`}>School Hour</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 xl:w-5 xl:h-5 text-gray-500 flex-shrink-0" />
                    <span className={`${TEXT} text-gray-600`}>{info.schoolHours}</span>
                  </div>
                </div>

                {/* Stay Connected */}
                <div>
                  <p className={`${TEXT} font-bozld text-gray-800 mb-2`}>Stay Connected</p>
                  <div className="flex items-center gap-2.5">
                    {SOCIAL_ICONS.map(({ key, Icon, bg, label }) => (
                      <a
                        key={key}
                        href={socialHrefs[key] || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`
                          ${bg} text-white rounded-full flex items-center justify-center flex-shrink-0
                          w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12
                          p-2 hover:opacity-85 active:opacity-70 transition-opacity duration-150
                        `}
                      >
                        <Icon className="w-full h-full" strokeWidth={1.8} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── Google Map ── */}
              <motion.div
                className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                style={{ height: 'clamp(180px, 28vw, 280px)' }}
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

            {/* ══ RIGHT: Form ══ */}
            <motion.div
              className="
                flex-1
                 sm:mx-0
                 rounded-2xl
                px-4 py-6 sm:px-7 sm:py-8 md:px-8 md:py-9 2xl:px-10 2xl:py-12
                bg-gray-100 max-w-[100vw] w-full
              "
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            >
              <p className={`${TEXT} font-bold text-gray-800 mb-6 sm:mb-8`}>
                {formTitle}
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">

                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className={inputClass} {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" className={inputClass} {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" className={inputClass} {...field} />
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message"
                            rows={4}
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
                      w-full bg-[#8F3648] hover:bg-[#3D171F] text-white
                      rounded-full h-12 sm:h-13 2xl:h-16 mt-2
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 sm:w-12 sm:h-12 text-green-500" strokeWidth={1.8} />
              </div>
              <p className="text-[14px] sm:text-[16px] xl:text-[18px] 2xl:text-[20px] font-semibold text-gray-800 leading-snug">
                Thank you! Your message has been sent. We will get back to you shortly.
              </p>
              <Button
                onClick={() => setShowSuccess(false)}
                className="
                  w-full bg-[#8F3648] hover:bg-[#3D171F] text-white
                  rounded-full h-10 sm:h-11
                  text-[12px] sm:text-[14px] font-semibold
                  shadow-[0_4px_0_#5E1010]
                  hover:shadow-[0_2px_0_#5E1010]
                  active:shadow-none active:translate-y-[4px]
                  hover:translate-y-[2px] transition-all duration-150
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