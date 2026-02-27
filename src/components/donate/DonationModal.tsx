'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X } from 'lucide-react'
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

// ── Shared style tokens ───────────────────────────────────────────────────────
const labelClass =
  'text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold text-gray-800'

const inputClass =
  'rounded-none border-0 border-b border-gray-300 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648] transition-colors placeholder:text-gray-400 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] h-8'

// ── DonationModal ─────────────────────────────────────────────────────────────
interface DonationModalProps {
  open: boolean
  onClose: () => void
}

export function DonationModal({ open, onClose }: DonationModalProps) {
  const { qrImageSrc, submitLabel } = DONATION_FORM_CONTENT

  const [fileName, setFileName] = useState<string | null>(null)
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
    console.log('Donation submitted:', values, 'File:', fileName)
    // TODO: send to backend
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-3 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="
              bg-white rounded-2xl shadow-2xl
              w-full max-w-[900px]
              max-h-[92vh] overflow-hidden
              flex flex-col md:flex-row
            "
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── LEFT: QR Code ── */}
            <div className="
              hidden md:flex
              flex-col items-center justify-center
              bg-gray-50 border-r border-gray-100
              w-[300px] lg:w-[340px] flex-shrink-0
              p-8
            ">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src={qrImageSrc}
                  alt="QR Code for Donation"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-gray-500 text-[11px] sm:text-[12px] mt-4 leading-relaxed">
                Scan to pay, then upload the screenshot in the form.
              </p>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="flex-1 flex flex-col min-h-0">

              {/* Form header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                <span className="font-bold text-gray-800 text-[13px] sm:text-[14px] lg:text-[15px]">
                  Donation Form
                </span>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-[#8F3648] flex items-center justify-center text-white hover:bg-[#3D171F] transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable form body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <Form {...form}>
                  <form
                    id="donation-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >

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

                    {/* Donation Amount */}
                    <FormField
                      control={form.control}
                      name="donationAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Donation Amount*</FormLabel>
                          <FormControl>
                            <div className="flex items-center border-b border-gray-300 focus-within:border-[#8F3648] transition-colors">
                              <span className="text-gray-500 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] pr-1.5 pb-2">
                                Rs
                              </span>
                              <Input
                                placeholder=""
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
                              <SelectTrigger
                                className="
                                  rounded-none border-0 border-b border-gray-300 bg-transparent
                                  shadow-none focus:ring-0 focus:border-[#8F3648]
                                  text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]
                                  px-0 text-gray-400 h-8
                                "
                              >
                                <SelectValue placeholder="Select" />
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
                          <FormMessage className="text-[11px]" />
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
                            bg-[#8F3648] hover:bg-[#3D171F] text-white
                            rounded-md px-3 py-1.5 h-auto
                            text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]
                            font-medium flex items-center gap-1.5
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
                              onClick={() => {
                                setFileName(null)
                                if (fileInputRef.current) fileInputRef.current.value = ''
                              }}
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
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          setFileName(file ? file.name : null)
                        }}
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

              {/* ── Sticky Submit Footer ── */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white">
                <Button
                  type="submit"
                  form="donation-form"
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
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}