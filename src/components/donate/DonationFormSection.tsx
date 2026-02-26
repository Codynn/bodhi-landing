'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Upload, X, QrCode } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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
import { DONATION_FORM_CONTENT } from '@/constants/donate/donationform.constants'
import { PURPOSE_OPTIONS } from '@/types/donate/donationform.types'


// ── Validation schema ─────────────────────────────────────────────────────────
const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  phoneNumber: z.string().min(7, 'Phone number is required'),
  donationAmount: z
    .string()
    .min(1, 'Donation amount is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Enter a valid amount'),
  purposeOfDonation: z.string().min(1, 'Please select a purpose'),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// ── Label styles ──────────────────────────────────────────────────────────────
const labelClass =
  'text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-semibold text-gray-800'

const inputClass =
  'rounded-none border-0 border-b border-gray-300 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648] transition-colors placeholder:text-gray-400 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'

export function DonationFormSection() {
  const { heading, subtext, qrButtonLabel, qrImageSrc, submitLabel } = DONATION_FORM_CONTENT

  const [fileName, setFileName] = useState<string | null>(null)
  const [showQr, setShowQr] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      donationAmount: '',
      purposeOfDonation: '',
      message: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    console.log('Donation form submitted:', values, 'File:', fileName)
    // TODO: send to backend / email service
  }

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto w-full
          max-w-screen
          px-4 sm:px-6 md:px-8 lg:px-10
          pt-10 sm:pt-14 md:pt-16 lg:pt-18 2xl:pt-24
          pb-16 sm:pb-20 lg:pb-24 2xl:pb-32
        "
      >
        {/* ── Heading ── */}
        <motion.h2
          className="
            text-center font-bold text-[#8F3648]
            text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[50px]
            mb-3 sm:mb-4 2xl:mb-5
          "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heading}
        </motion.h2>

        {/* ── Subtext ── */}
        <motion.p
          className="
            text-center text-gray-500 leading-relaxed
            text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
            max-w-screen
            mx-auto
            mb-8 sm:mb-10 md:mb-12 2xl:mb-14
          "
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          {subtext}
        </motion.p>

        {/* ── Form Card ── */}
        <motion.div
          className="bg-white border mx-auto border-gray-200 rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-9 lg:px-10 lg:py-10 2xl:px-14 2xl:py-12 max-w-[80vw]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        >
          {/* ── Form header row ── */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <p
              className="
                font-bold text-gray-800
                text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
              "
            >
              Donation Form
            </p>

            {/* QR button */}
            <button
              type="button"
              onClick={() => setShowQr(true)}
              className="
                flex items-center gap-2
                text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                font-semibold text-white
                bg-[#8B1A1A] hover:bg-[#7A1717]
                px-4 py-2 sm:px-5 sm:py-2.5
                rounded-full
                shadow-[0_6px_0_#5E1010]
                hover:shadow-[0_4px_0_#5E1010]
                active:shadow-[0_0px_0_#5E1010]
                active:translate-y-[6px]
                hover:translate-y-[2px]
                transition-all duration-150
              "
            >
              <ArrowRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span>{qrButtonLabel}</span>
            </button>
          </div>

          {/* ── React Hook Form ── */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 sm:gap-7">

              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Full Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]" />
                  </FormItem>
                )}
              />

              {/* Email + Phone — 2 col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]" />
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
                      <FormMessage className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Donation Amount */}
              <FormField
                control={form.control}
                name="donationAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Donation Amount*</FormLabel>
                    <FormControl>
                      <div className="flex items-center border-b border-gray-300 focus-within:border-[#8F3648] transition-colors">
                        <span className="text-gray-500 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] pr-1.5 pb-2">
                          Rs
                        </span>
                        <Input
                          placeholder=""
                          className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]" />
                  </FormItem>
                )}
              />

              {/* Purpose of Donation */}
              <FormField
                control={form.control}
                name="purposeOfDonation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Purpose of Donation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="
                            rounded-none border-0 border-b border-gray-300 bg-transparent
                            shadow-none focus:ring-0 focus:border-[#8F3648]
                            text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                            px-0 text-gray-400
                          "
                        >
                          <SelectValue placeholder="Select" className='text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PURPOSE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]" />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  Upload Screenshot of Payment (required) – JPEG, PNG, or PDF file*
                </label>
                <div className="flex items-center gap-3 mt-1">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="
                      bg-[#8F3648] hover:bg-[#7a2e3c] text-white
                      rounded-md px-4 py-2 h-auto
                      text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                      font-medium flex items-center gap-1.5
                    "
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload File
                  </Button>
                  {fileName && (
                    <div className="flex items-center gap-1.5 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]text-gray-600">
                      <span className="truncate max-w-[200px]">{fileName}</span>
                      <button
                        type="button"
                        onClick={() => { setFileName(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    setFileName(file ? file.name : null)
                  }}
                />
                {/* Bottom border line to match other fields */}
                <div className="border-b border-gray-300 mt-3" />
              </div>

              {/* Message / Note */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Message / Note (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter message or note"
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
                    <FormMessage className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="
                  w-full bg-[#8B1A1A] hover:bg-[#7A1717] text-white
                  rounded-full h-12 sm:h-13 2xl:h-16
                  text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
                  font-semibold tracking-wide
                  shadow-[0_6px_0_#5E1010]
                  hover:shadow-[0_4px_0_#5E1010]
                  active:shadow-[0_0px_0_#5E1010]
                  active:translate-y-[6px]
                  hover:translate-y-[2px]
                  transition-all duration-150
                  mt-2
                "
              >
                {submitLabel}
              </Button>

            </form>
          </Form>
        </motion.div>
      </div>

      {/* ── QR Code Modal ── */}
      <AnimatePresence>
        {showQr && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQr(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs w-full flex flex-col items-center gap-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-[#8F3648]">
                  <QrCode className="w-5 h-5" />
                  <span className="font-bold text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]">QR Code to Donate</span>
                </div>
                <button
                  onClick={() => setShowQr(false)}
                  className="w-7 h-7 rounded-full bg-[#8B1A1A] flex items-center justify-center text-white hover:bg-[#7A1717] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-xl overflow-hidden border border-gray-100">
                <Image
                  src={qrImageSrc}
                  alt="QR Code for Donation"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-gray-500 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] leading-relaxed">
                Scan this QR code to complete your payment, then upload the screenshot in the form.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}