import React from "react";
import Field from "./Field";

/**
 * options: [{ value, label }]
 */
export default function Select({
  id,
  label,
  hint,
  error,
  required,
  options = [],
  placeholder = "Select...",
  className = "",
  ...rest
}) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink
          ${error ? "border-danger" : "border-line focus:border-ink-400"}
          outline-none transition-colors ${className}`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
