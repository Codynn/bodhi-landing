"use client";


import Image                           from "next/image";
import { AnimatePresence, motion }     from "framer-motion";
import { Button }                      from "@/components/ui/button";

// ─── Icon map ─────────────────────────────────────────────────────
const ICONS = {
  success: {
    src: "/icon/check-circle.svg",
    alt: "Success",
  },
  error: {
    src: "/icon/close-circle.svg",
    alt: "Error",
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────
export interface ResultPopupProps {
  open:        boolean;
  type:        "success" | "error";
  message:     string;
  title?:      string;
  closeLabel?: string;
  onClose:     () => void;
}

// ─── Component ────────────────────────────────────────────────────
export function ResultPopup({
  open,
  type,
  message,
  title,
  closeLabel = "Close",
  onClose,
}: ResultPopupProps) {
  const icon = ICONS[type];

  return (
    <AnimatePresence>
      {open && (
        /* ── Backdrop ── */
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-live="assertive"
        >
          {/* ── Card ── */}
          <motion.div
            className="
              bg-white rounded-2xl shadow-2xl
              w-full max-w-[340px] sm:max-w-[380px]
              px-8 py-10
              flex flex-col items-center gap-6 text-center
            "
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── SVG Icon ── */}
            <div className="w-24 h-24 flex items-center justify-center flex-shrink-0">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={96}
                height={96}
                priority
              />
            </div>

            {/* ── Title (optional) ── */}
            {title && (
              <p className="text-[17px] sm:text-[18px] font-bold text-gray-900 -mb-2 leading-snug">
                {title}
              </p>
            )}

            {/* ── Message ── */}
            <p className="text-[15px] sm:text-[16px] font-medium text-gray-700 leading-snug">
              {message}
            </p>

            {/* ── Close button ── */}
            <Button
              onClick={onClose}
              className="
                w-full h-12 rounded-full
                bg-[#8F3648] hover:bg-[#3D171F] text-white
                text-[15px] sm:text-[16px] font-semibold tracking-wide
                shadow-[0_5px_0_#5E1010]
                hover:shadow-[0_3px_0_#5E1010] hover:translate-y-[2px]
                active:shadow-none          active:translate-y-[5px]
                transition-all duration-150
              "
            >
              {closeLabel}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}