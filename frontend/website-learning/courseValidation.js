export const LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export function validateCourse(values) {
  const errors = {};

  if (!values.title?.trim()) {
    errors.title = "Course title is required.";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (!values.description?.trim()) {
    errors.description = "Add a short description so students know what they'll learn.";
  }

  if (!values.level) {
    errors.level = "Choose a level.";
  }

  if (values.price === "" || values.price === null || values.price === undefined) {
    errors.price = "Set a price (use 0 for a free course).";
  } else if (Number(values.price) < 0) {
    errors.price = "Price can't be negative.";
  }

  if (!values.durationHours || Number(values.durationHours) <= 0) {
    errors.durationHours = "Enter the course duration in hours.";
  }

  return errors;
}
