import React from "react";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import useForm from "../../hooks/useForm";
import { LEVEL_OPTIONS, validateCourse } from "./courseValidation";

const EMPTY_COURSE = {
  title: "",
  description: "",
  level: "",
  price: "",
  durationHours: "",
};

/**
 * Same form drives both "Add course" and "Edit course" —
 * pass `initialValues` (a course) to edit, omit it to create.
 */
export default function CourseForm({ initialValues, onSubmit, onCancel, submitError }) {
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    initialValues || EMPTY_COURSE,
    validateCourse
  );

  const isEditing = Boolean(initialValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Alert status="error" message={submitError} />

      <Input
        id="title"
        name="title"
        label="Course title"
        placeholder="e.g. React for Beginners"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <Textarea
        id="description"
        name="description"
        label="Description"
        placeholder="What will students be able to do after this course?"
        value={values.description}
        onChange={handleChange}
        error={errors.description}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="level"
          name="level"
          label="Level"
          options={LEVEL_OPTIONS}
          value={values.level}
          onChange={handleChange}
          error={errors.level}
          required
        />
        <Input
          id="durationHours"
          name="durationHours"
          type="number"
          min="0"
          label="Duration (hours)"
          value={values.durationHours}
          onChange={handleChange}
          error={errors.durationHours}
          required
        />
      </div>

      <Input
        id="price"
        name="price"
        type="number"
        min="0"
        step="0.01"
        label="Price (USD)"
        hint="Use 0 for a free course."
        value={values.price}
        onChange={handleChange}
        error={errors.price}
        required
      />

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isEditing ? "Save changes" : "Add course"}
        </Button>
      </div>
    </form>
  );
}
