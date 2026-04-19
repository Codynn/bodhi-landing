"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input }    from "@/components/ui/input";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// ── Zod Schema ────────────────────────────────────────────────────
const cvFormSchema = z.object({
  fullName:          z.string().min(2, "Full name must be at least 2 characters").max(100),
  currentCompany:    z.string().min(1, "Current company is required").max(100),
  email:             z.string().email("Please enter a valid email address"),
  phone:             z.string().regex(/^\+?[0-9\s\-().]{7,20}$/, "Please enter a valid phone number").optional().or(z.literal("")),
  yearsOfExperience: z.string().min(1, "Years of experience is required").refine((val) => {
    const n = Number(val);
    return !isNaN(n) && n >= 0 && n <= 60;
  }, "Please enter a valid number between 0 and 60"),
  expectedSalary:    z.string().min(1, "Expected salary is required").max(100),
  location:          z.string().min(2, "Location is required").max(150),
  coverLetter:       z.string().max(2000).optional().or(z.literal("")),
  portfolioLink:     z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  resume: z
    .custom<File>((f) => f instanceof File, "Resume is required")
    .refine((f) => (f as File).size <= 5 * 1024 * 1024, "Max 5 MB")
    .refine(
      (f) => [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes((f as File).type),
      "PDF or Word document only"
    )
    .optional(),
});

type CvFormValues = z.infer<typeof cvFormSchema>;

// ── Styles ────────────────────────────────────────────────────────
const TEXT       = "text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]";
const labelClass = `${TEXT} font-semibold text-gray-800`;
const inputClass = `
  ${TEXT} rounded-none border-0 border-b border-gray-300 bg-transparent
  px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#8F3648]
  transition-colors placeholder:text-gray-400
`;

interface CvSubmitFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export function CvSubmitForm({ onSubmit }: CvSubmitFormProps) {
  const form = useForm<CvFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      fullName: "", currentCompany: "", email: "", phone: "",
      yearsOfExperience: "", expectedSalary: "", location: "",
      coverLetter: "", portfolioLink: "", resume: undefined,
    },
  });

  const isPending    = form.formState.isSubmitting;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (values: CvFormValues) => {
    const fd = new FormData();
    fd.append("fullName",        values.fullName);
    fd.append("email",           values.email);
    fd.append("phone",           values.phone ?? "");
    fd.append("currentCompany",  values.currentCompany);
    fd.append("yearsExperience", values.yearsOfExperience);
    fd.append("expectedSalary",  values.expectedSalary);
    fd.append("location",        values.location);
    fd.append("coverletter",     values.coverLetter ?? "");   // ← CV endpoint field name
    fd.append("profoliolink",    values.portfolioLink ?? ""); // ← CV endpoint field name
    if (values.resume instanceof File) {
      fd.append("file", values.resume);
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[CvSubmitForm] FormData entries:");
      fd.forEach((value, key) => console.log(`  ${key}:`, value));
    }

    try {
      await onSubmit(fd);
      toast.success("CV submitted!", {
        description: "We'll keep your CV on file and reach out when something comes up.",
      });
      form.reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong. Please try again.";
      toast.error("Submission failed", { description: backendMessage });
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-9 w-full">
      <p className={`${TEXT} font-bold text-gray-800 mb-6 sm:mb-8`}>
        Submit Your CV
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 sm:gap-6"
          noValidate
        >
          {/* ── Personal Details ── */}
          <p className={`${TEXT} font-bold text-gray-800 border-b border-gray-300 pb-2`}>
            Personal Details
          </p>

          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" autoComplete="name" disabled={isPending} className={inputClass} {...field} />
              </FormControl>
              <FormMessage className={TEXT} />
            </FormItem>
          )} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email address" autoComplete="email" disabled={isPending} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className={TEXT} />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Optional" autoComplete="tel" disabled={isPending} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className={TEXT} />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Location *</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" autoComplete="address-level2" disabled={isPending} className={inputClass} {...field} />
              </FormControl>
              <FormMessage className={TEXT} />
            </FormItem>
          )} />

          {/* ── Professional Details ── */}
          <p className={`${TEXT} font-bold text-gray-800 border-b border-gray-300 pb-2 mt-2`}>
            Professional Details
          </p>

          <FormField control={form.control} name="currentCompany" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Current Company *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your current company" autoComplete="organization" disabled={isPending} className={inputClass} {...field} />
              </FormControl>
              <FormMessage className={TEXT} />
            </FormItem>
          )} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Years of Experience *</FormLabel>
                <FormControl>
                  <Input
                    type="number" min={0} max={60} placeholder="e.g. 3"
                    disabled={isPending}
                    className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={TEXT} />
              </FormItem>
            )} />
            <FormField control={form.control} name="expectedSalary" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Expected Salary *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. RS 60,000 / month" disabled={isPending} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className={TEXT} />
              </FormItem>
            )} />
          </div>

          {/* Portfolio Link — only in CV form */}
          <FormField control={form.control} name="portfolioLink" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Portfolio / LinkedIn</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  disabled={isPending}
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className={TEXT} />
            </FormItem>
          )} />

          {/* Resume */}
          <FormField
            control={form.control}
            name="resume"
         
render={({ field: { onChange, ref, value, ...rest } }) => (  
  <FormItem>
    <FormLabel className={labelClass}>Resume / CV</FormLabel>
    <FormControl>
      <Input
        type="file"
        accept=".pdf,.doc,.docx"
        disabled={isPending}
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        className={`...`}
        onChange={(e) => onChange(e.target.files?.[0])}
        {...rest}  // value is NOT spread here since we destructured it out
      />
    </FormControl>
    <p className="text-[13px] text-gray-400 mt-1">PDF or Word, max 5 MB</p>
    <FormMessage className={TEXT} />
  </FormItem>
)}
          />

          {/* Cover Letter */}
          <FormField control={form.control} name="coverLetter" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself and what kind of role you're looking for..."
                  rows={4}
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
          )} />

          <Button
            type="submit"
            disabled={isPending}
            className="
              w-full text-white mt-2
              bg-[#8F3648] hover:bg-[#3D171F]
              rounded-full h-12 sm:h-13 2xl:h-16
              text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px]
              font-semibold tracking-wide
              shadow-[0_6px_0_#5E1010] hover:shadow-[0_4px_0_#5E1010]
              active:shadow-[0_0px_0_#5E1010] active:translate-y-[6px]
              hover:translate-y-[2px] transition-all duration-150
              disabled:opacity-60 disabled:cursor-not-allowed
              disabled:shadow-none disabled:translate-y-0
            "
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
              </span>
            ) : (
              "Submit CV"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}