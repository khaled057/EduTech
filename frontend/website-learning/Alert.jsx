import React from "react";

const STYLES = {
  success: "bg-[#EAF3EC] border-success text-success",
  error: "bg-[#F7EAE8] border-danger text-danger",
  info: "bg-ink-50 border-ink-400 text-ink-600",
};

/**
 * Speaks in the interface's voice: says what happened, never apologizes,
 * never vague. e.g. status="error" message="Couldn't save the course. Check the required fields."
 */
export default function Alert({ status = "info", message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role={status === "error" ? "alert" : "status"}
      className={`flex items-start justify-between gap-3 rounded-control border-l-4 px-4 py-3 text-sm ${STYLES[status]}`}
    >
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss message" className="shrink-0">
          ✕
        </button>
      )}
    </div>
  );
}
