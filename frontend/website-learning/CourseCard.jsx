import React from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const LEVEL_ACCENT = {
  beginner: "#2F6846",
  intermediate: "#D9A441",
  advanced: "#B23A2E",
};

export default function CourseCard({ course, onEdit, onDelete }) {
  return (
    <Card accentColor={LEVEL_ACCENT[course.level]} className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge tone={course.level}>{course.level}</Badge>
          <span className="text-sm text-muted">{course.durationHours}h</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink">{course.title}</h3>
        <p className="mt-1.5 text-sm text-muted line-clamp-3">{course.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="font-display text-base font-semibold text-ink">
          {Number(course.price) === 0 ? "Free" : `$${Number(course.price).toFixed(2)}`}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => onEdit(course)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(course)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
