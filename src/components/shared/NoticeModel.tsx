'use client'

import { X, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Notice } from '@/types/home/notices.types'

interface NoticeModalProps {
  notice: Notice | null
  onClose: () => void
}

export function NoticeModal({ notice, onClose }: NoticeModalProps) {
  return (
    <AnimatePresence>
      {notice && (
        // Backdrop
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Card */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-500">
                {notice.category}
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-[#8B1A1A] flex items-center justify-center text-white hover:bg-[#C0392B] transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Title ── */}
            <div className="px-6 pb-4 flex-shrink-0 border-b border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {notice.title}
              </h2>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {notice.fullContent}
              </p>
            </div>

            {/* ── Footer: Date ── */}
            <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{notice.date}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}