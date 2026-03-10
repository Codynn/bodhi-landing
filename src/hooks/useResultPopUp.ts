"use client";

import { ResultPopupProps } from "@/components/shared/ResultPopUp";

import { useState } from "react";


// ─── State shape ──────────────────────────────────────────────────
export type ResultPopupState = Omit<ResultPopupProps, "onClose">;

const DEFAULT_STATE: ResultPopupState = {
  open:    false,
  type:    "success",
  message: "",
  title:   undefined,
};

// ─── Hook ─────────────────────────────────────────────────────────
export function useResultPopup() {
  const [popup, setPopup] = useState<ResultPopupState>(DEFAULT_STATE);

  /** Show a success popup */
  const showSuccess = (message: string, title?: string) =>
    setPopup({ open: true, type: "success", message, title });

  /** Show an error popup */
  const showError = (message: string, title?: string) =>
    setPopup({ open: true, type: "error", message, title });

  /** Close the popup (keeps type/message so exit animation is smooth) */
  const closePopup = () =>
    setPopup((prev) => ({ ...prev, open: false }));

  return { popup, showSuccess, showError, closePopup };
}