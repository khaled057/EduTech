import React from "react";

/**
 * An empty screen is an invitation to act — always pair the message
 * with a concrete next step (search tweak, "add your first X", etc).
 */
export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line bg-white/50 py-16 text-center">
      <h3 className="font-display text-lg text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}
