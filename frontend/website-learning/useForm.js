import { useState, useCallback } from "react";

/**
 * Generic controlled-form hook.
 *
 * @param {object} initialValues
 * @param {(values: object) => object} validate - returns { fieldName: "error message" }
 *
 * Usage:
 *   const { values, errors, handleChange, handleSubmit, setValues } =
 *     useForm({ title: "", level: "" }, validateCourse);
 */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error the moment the user edits it again
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }, []);

  const reset = useCallback((next = initialValues) => {
    setValues(next);
    setErrors({});
  }, [initialValues]);

  const handleSubmit = (onValid) => async (e) => {
    e?.preventDefault?.();
    const validationErrors = validate ? validate(values) : {};
    const hasErrors = Object.values(validationErrors).some(Boolean);
    setErrors(validationErrors);
    if (hasErrors) return;

    try {
      setIsSubmitting(true);
      await onValid(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, setValues, errors, setErrors, isSubmitting, handleChange, handleSubmit, reset };
}
