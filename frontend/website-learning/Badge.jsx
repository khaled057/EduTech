import React from "react";

/**
 * tone maps to real category meaning, e.g. course level or publish status —
 * pass a tone key that exists in TONE_CLASSES.
 */
const TONE_CLASSES = {
  beginner: "bg-[#EAF3EC] text-success",
  intermediate: "bg-gold-100 text-gold-600",
  advanced: "bg-[#F7EAE8] text-danger",
  neutral: "bg-ink-50 text-ink-600",
};

export default function Badge({ tone = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
