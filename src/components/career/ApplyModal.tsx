"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { ApplyForm } from "./ApplyForm";
import { JobOpening } from "@/types/career/careeropening.types";

const EASE: [number, number, number, number]      = [0.32, 0.72, 0, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants: Variants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,    transition: { duration: 0.35, ease: EASE } },
  exit:    { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2,  ease: EXIT_EASE } },
};

interface ApplyModalProps {
  open: boolean;
  job: JobOpening | null;
  onClose: () => void;
  onSubmit: (jobId: string, data: FormData) => Promise<void>;
}

export function ApplyModal({ open, job, onClose, onSubmit }: ApplyModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleFormSubmit = async (formData: FormData) => {
    if (!job?.id) throw new Error("Job ID is missing");
    await onSubmit(job.id, formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && job && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseDown={(e) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
              onClose();
            }
          }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="apply-modal-title"
        >
          <motion.div
            ref={panelRef}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90dvh] flex flex-col overflow-hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── Sticky Header ── */}
            <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 sm:px-7 sm:pt-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex flex-col gap-1">
                <p
                  id="apply-modal-title"
                  className="font-bold text-gray-900 text-[18px] sm:text-[20px] lg:text-[22px] leading-snug"
                >
                  {job.title}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block border border-gray-300 rounded-full px-2.5 py-0.5 text-[13px] text-gray-500 font-medium">
                    {job.type}
                  </span>
                  <span className="text-[13px] text-gray-400">{job.date}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="overflow-y-auto flex-1 px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed mb-6">
                {job.description}
              </p>
              <ApplyForm jobTitle={job.title} onSubmit={handleFormSubmit} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}