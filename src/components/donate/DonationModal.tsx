'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, QrCode, ChevronLeft } from 'lucide-react'
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
import { Input }    from '@/components/ui/input'
import { Button }   from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DONATION_FORM_CONTENT } from '@/constants/donate/donationform.constants'
import { PURPOSE_OPTIONS }       from '@/types/donate/donationform.types'

// ── Validation schema ─────────────────────────────────────────────
const formSchema = z.object({
  fullName:          z.string().min(2, 'Full name is required'),
  email:             z.string().email('Enter a valid email').or(z.literal('')),
  phoneNumber:       z.string().min(7, 'Phone number is required'),
  donationAmount:    z
    .string()
    .min(1, 'Donation amount is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Enter a valid amount'),
  purposeOfDonation: z.string().min(1, 'Please select a purpose'),
  message:           z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// ── Shared style tokens ───────────────────────────────────────────
const labelClass =
  'text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] font-semibold text-gray-800'

const inputClass =
  'rounded-none border-0 border-b border-gray-300 bg-transparent px-0 shadow-none ' +
  'focus-visible:ring-0 focus-visible:border-[#8F3648] transition-colors ' +
  'placeholder:text-gray-400 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] h-8'

// ── Props ─────────────────────────────────────────────────────────
interface DonationModalProps {
  open:    boolean
  onClose: () => void
}

// ─────────────────────────────────────────────────────────────────
export function DonationModal({ open, onClose }: DonationModalProps) {
  const { qrImageSrc, submitLabel } = DONATION_FORM_CONTENT

  const [fileName,     setFileName]     = useState<string | null>(null)
  const [showMobileQR, setShowMobileQR] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '', email: '', phoneNumber: '',
      donationAmount: '', purposeOfDonation: '', message: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    console.log('Donation submitted:', values, 'File:', fileName)
    // TODO: wire to API
  }

  const handleClose = () => {
    setShowMobileQR(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        /* ── Backdrop ── */
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:px-3 sm:py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/*
            ── Modal card ──────────────────────────────────────────
            Mobile  : slides up from bottom, fills full screen height
                      (rounded top corners, flat bottom)
            sm+     : centered card, max 92vh, rounded all corners
          */}
          <motion.div
            className="
              bg-white shadow-2xl w-full
              flex flex-col
              rounded-t-2xl sm:rounded-2xl
              h-[92vh] sm:h-auto sm:max-h-[92vh]
              sm:max-w-[900px]
            "
            initial={{ opacity: 0, y: 60  }}
            animate={{ opacity: 1, y: 0   }}
            exit={{    opacity: 0, y: 60  }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── HEADER (flex-shrink-0 — never scrolls away) ──── */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
              <span className="font-bold text-gray-800 text-[13px] sm:text-[14px] lg:text-[15px]">
                {showMobileQR ? (
                  <button
                    onClick={() => setShowMobileQR(false)}
                    className="flex items-center gap-1.5 text-[#8F3648] font-semibold text-[13px] sm:text-[14px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Form
                  </button>
                ) : (
                  'Donation Form'
                )}
              </span>

              <div className="flex items-center gap-2">
                {/* View QR — mobile only */}
                {!showMobileQR && (
                  <button
                    onClick={() => setShowMobileQR(true)}
                    className="
                      md:hidden flex items-center gap-1.5
                      bg-[#8F3648] hover:bg-[#3D171F] text-white
                      rounded-full px-3 py-1.5
                      text-[11px] sm:text-[12px] font-semibold
                      transition-colors duration-150
                    "
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    View QR
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="w-7 h-7 rounded-full bg-[#8F3648] flex items-center justify-center text-white hover:bg-[#3D171F] transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/*
              ── BODY ─────────────────────────────────────────────
              flex-1 + min-h-0  →  takes remaining height, allows
              children to scroll without the parent growing
            */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">

              {/* Mobile QR panel — full height, scrollable */}
              <AnimatePresence mode="wait">
                {showMobileQR && (
                  <motion.div
                    key="mobile-qr"
                    className="md:hidden flex flex-col items-center justify-center flex-1 overflow-y-auto p-8 gap-5"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0  }}
                    exit={{    opacity: 0, x: 30  }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="relative w-full max-w-[260px] aspect-square rounded-xl overflow-hidden border border-gray-200">
                      <Image src={qrImageSrc} alt="QR Code for Donation" fill className="object-contain" />
                    </div>
                    <p className="text-center text-gray-500 text-[12px] sm:text-[13px] leading-relaxed max-w-[240px]">
                      Scan to pay, then upload the screenshot in the form.
                    </p>
                    <Button
                      onClick={() => setShowMobileQR(false)}
                      className="
                        bg-[#8F3648] hover:bg-[#3D171F] text-white
                        rounded-full px-8 h-10 text-[13px] font-semibold
                        shadow-[0_4px_0_#5E1010]
                        hover:shadow-[0_2px_0_#5E1010] hover:translate-y-[2px]
                        active:shadow-none active:translate-y-[4px]
                        transition-all duration-150
                      "
                    >
                      Back to Form
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop QR panel — fixed width, never scrolls */}
              <div className="
                hidden md:flex flex-col items-center justify-center flex-shrink-0
                bg-gray-50 border-r border-gray-100
                w-[260px] lg:w-[300px] xl:w-[320px]
                p-6 lg:p-8 gap-4
              ">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200">
                  <Image src={qrImageSrc} alt="QR Code for Donation" fill className="object-contain" />
                </div>
                <p className="text-center text-gray-500 text-[11px] sm:text-[12px] leading-relaxed">
                  Scan to pay, then upload the screenshot in the form.
                </p>
              </div>

              {/*
                ── Form column ──────────────────────────────────
                flex-1 + min-h-0  →  fills remaining width/height
                overflow-y-auto   →  THIS is the scroll container
                -webkit-overflow-scrolling: touch for iOS momentum
              */}
              <div
                className={`
                  flex-1 min-h-0 min-w-0 flex flex-col
                  ${showMobileQR ? 'hidden md:flex' : 'flex'}
                `}
              >
                {/* Scrollable area */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5">
                  <Form {...form}>
                    <form
                      id="donation-modal-form"
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-5 pb-2"
                    >

                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" autoComplete="name" className={inputClass} {...field} />
                            </FormControl>
                            <FormMessage className="text-[11px]" />
                          </FormItem>
                        )}
                      />

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={labelClass}>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email" autoComplete="email" className={inputClass} {...field} />
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
                              <FormLabel className={labelClass}>Phone Number *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Enter phone number" autoComplete="tel" className={inputClass} {...field} />
                              </FormControl>
                              <FormMessage className="text-[11px]" />
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
                            <FormLabel className={labelClass}>Donation Amount *</FormLabel>
                            <FormControl>
                              <div className="flex items-center border-b border-gray-300 focus-within:border-[#8F3648] transition-colors">
                                <span className="text-gray-500 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] pr-1.5 pb-2">
                                  Rs
                                </span>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  min="1"
                                  className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] h-8"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[11px]" />
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
                                <SelectTrigger className="rounded-none border-0 border-b border-gray-300 bg-transparent shadow-none focus:ring-0 focus:border-[#8F3648] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] px-0 text-gray-400 h-8">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PURPOSE_OPTIONS.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[11px]" />
                          </FormItem>
                        )}
                      />

                      {/* File Upload */}
                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          Upload Screenshot of Payment (required) – JPEG, PNG, or PDF file *
                        </label>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="
                              bg-[#8F3648] hover:bg-[#3D171F] text-white
                              rounded-md px-3 py-1.5 h-auto
                              text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]
                              font-medium flex items-center gap-1.5
                              transition-colors duration-150
                            "
                          >
                            <Upload className="w-3 h-3" />
                            Upload File
                          </Button>
                          {fileName && (
                            <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-600">
                              <span className="truncate max-w-[160px]">{fileName}</span>
                              <button
                                type="button"
                                onClick={() => { setFileName(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                        />
                        <div className="border-b border-gray-300 mt-2" />
                      </div>

                      {/* Message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>Message / Note (optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter message or note"
                                rows={2}
                                className="
                                  rounded-none border-0 border-b border-gray-300 bg-transparent
                                  shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
                                  resize-none px-0 transition-colors placeholder:text-gray-400
                                  text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]
                                "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[11px]" />
                          </FormItem>
                        )}
                      />

                    </form>
                  </Form>
                </div>
              </div>
            </div>

            {/* ── FOOTER: Submit — flex-shrink-0, always visible ── */}
            {!showMobileQR && (
              <div className="flex-shrink-0 px-5 py-4 sm:px-6 sm:py-5 border-t border-gray-100 bg-white rounded-b-2xl">
                <Button
                  type="submit"
                  form="donation-modal-form"
                  className="
                    w-full bg-[#8F3648] hover:bg-[#3D171F] text-white
                    rounded-full h-10 sm:h-11
                    text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]
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
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}