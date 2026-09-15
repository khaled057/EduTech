import React from "react";
import Field from "./Field";

export default function Input({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  ...rest
}) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink
          placeholder:text-muted/70
          ${error ? "border-danger" : "border-line focus:border-ink-400"}
          outline-none transition-colors ${className}`}
        {...rest}
      />
    </Field>
  );
}
