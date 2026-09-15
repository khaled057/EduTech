import React from "react";

/**
 * accentColor is a real hex/tailwind class tied to meaning (e.g. course level),
 * not decoration — omit it for cards with no such category.
 */
export default function Card({ children, accentColor, className = "", ...rest }) {
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line bg-surface p-5 ${className}`}
      {...rest}
    >
      {accentColor && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className={accentColor ? "pl-2" : ""}>{children}</div>
    </div>
  );
}
