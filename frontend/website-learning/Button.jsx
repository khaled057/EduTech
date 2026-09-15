import React from "react";

/**
 * Shared Button.
 * variant: "primary" | "secondary" | "ghost" | "danger"
 * size: "sm" | "md"
 */
const VARIANT_CLASSES = {
  primary: "bg-ink text-white hover:bg-ink-800 disabled:bg-ink-100 disabled:text-muted",
  secondary: "bg-white text-ink border border-line hover:border-ink-400 disabled:opacity-50",
  ghost: "bg-transparent text-ink hover:bg-ink-50 disabled:opacity-50",
  danger: "bg-danger text-white hover:bg-[#8f2d24] disabled:opacity-50",
};

const SIZE_CLASSES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-medium
        transition-colors duration-150 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
        />
      )}
      {!isLoading && Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </button>
  );
}
