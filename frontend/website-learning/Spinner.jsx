import React from "react";

export default function Spinner({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted">
      <span
        aria-hidden="true"
        className="h-8 w-8 rounded-full border-2 border-ink-100 border-t-ink-600 animate-spin"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
