import React from "react";

/**
 * Wraps a form control with a label, optional hint and validation error.
 * Every shared input (Input, Select, Textarea) renders through this,
 * so label/error styling stays consistent across the whole app.
 */
export default function Field({ id, label, hint, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
