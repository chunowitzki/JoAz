"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative z-10 w-full sm:max-w-sm
          rounded-t-3xl sm:rounded-3xl
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-2xl
          p-5
          mx-3
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : <div />}
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}