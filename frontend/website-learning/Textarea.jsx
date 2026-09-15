import React from "react";
import Field from "./Field";

export default function Textarea({
  id,
  label,
  hint,
  error,
  required,
  rows = 4,
  className = "",
  ...rest
}) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`w-full resize-y rounded-control border bg-white px-3 py-2 text-sm text-ink
          placeholder:text-muted/70
          ${error ? "border-danger" : "border-line focus:border-ink-400"}
          outline-none transition-colors ${className}`}
        {...rest}
      />
    </Field>
  );
}
