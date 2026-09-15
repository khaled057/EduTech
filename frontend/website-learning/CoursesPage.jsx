import React, { useEffect, useState, useCallback } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Alert from "../../components/ui/Alert";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import CourseCard from "./CourseCard";
import CourseForm from "./CourseForm";
import { LEVEL_OPTIONS } from "./courseValidation";
import { courseService } from "../../services/courseService";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [loadError, setLoadError] = useState("");

  const [modalMode, setModalMode] = useState(null); // null | "create" | "edit" | "delete"
  const [activeCourse, setActiveCourse] = useState(null);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState(null); // { status, message }

  const fetchCourses = useCallback(async (page = 1) => {
    setStatus("loading");
    setLoadError("");
    try {
      const data = await courseService.list({ search, level, page });
      setCourses(data.items ?? []);
      setMeta({ page: data.page ?? 1, pages: data.pages ?? 1, total: data.total ?? 0 });
      setStatus("ready");
    } catch (err) {
      setLoadError(err.message || "Couldn't load courses.");
      setStatus("error");
    }
  }, [search, level]);

  // Refetch whenever the search term or level filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => fetchCourses(1), 300); // debounce typing
    return () => clearTimeout(timeoutId);
  }, [fetchCourses]);

  const openCreate = () => {
    setActiveCourse(null);
    setFormError("");
    setModalMode("create");
  };

  const openEdit = (course) => {
    setActiveCourse(course);
    setFormError("");
    setModalMode("edit");
  };

  const openDelete = (course) => {
    setActiveCourse(course);
    setModalMode("delete");
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveCourse(null);
  };

  const handleCreateOrUpdate = async (values) => {
    setFormError("");
    try {
      if (activeCourse) {
        await courseService.update(activeCourse._id, values);
        setToast({ status: "success", message: "Course updated." });
      } else {
        await courseService.create(values);
        setToast({ status: "success", message: "Course added." });
      }
      closeModal();
      fetchCourses(meta.page);
    } catch (err) {
      setFormError(err.message || "Couldn't save the course.");
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await courseService.remove(activeCourse._id);
      setToast({ status: "success", message: "Course deleted." });
      closeModal();
      fetchCourses(courses.length === 1 && meta.page > 1 ? meta.page - 1 : meta.page);
    } catch (err) {
      setToast({ status: "error", message: err.message || "Couldn't delete the course." });
      closeModal();
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Courses</h1>
          <p className="mt-1 text-sm text-muted">
            {status === "ready" ? `${meta.total} course${meta.total === 1 ? "" : "s"}` : "\u00A0"}
          </p>
        </div>
        <Button onClick={openCreate}>Add course</Button>
      </header>

      {toast && (
        <div className="mb-4">
          <Alert status={toast.status} message={toast.message} onDismiss={() => setToast(null)} />
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_200px]">
        <Input
          id="course-search"
          placeholder="Search courses by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search courses"
        />
        <Select
          id="course-level-filter"
          placeholder="All levels"
          options={LEVEL_OPTIONS}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          aria-label="Filter by level"
        />
      </div>

      {status === "loading" && <Spinner label="Loading courses..." />}

      {status === "error" && (
        <EmptyState
          title="Couldn't load courses"
          description={loadError}
          action={<Button onClick={() => fetchCourses(meta.page)}>Try again</Button>}
        />
      )}

      {status === "ready" && courses.length === 0 && (
        <EmptyState
          title="No courses found"
          description={
            search || level
              ? "No courses match your search and filters. Try clearing them."
              : "Add your first course to get started."
          }
          action={
            search || level ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setLevel("");
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Button onClick={openCreate}>Add course</Button>
            )
          }
        />
      )}

      {status === "ready" && courses.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} onEdit={openEdit} onDelete={openDelete} />
            ))}
          </div>

          {meta.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                disabled={meta.page <= 1}
                onClick={() => fetchCourses(meta.page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted">
                Page {meta.page} of {meta.pages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={meta.page >= meta.pages}
                onClick={() => fetchCourses(meta.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={modalMode === "create" || modalMode === "edit"}
        onClose={closeModal}
        title={modalMode === "edit" ? "Edit course" : "Add course"}
      >
        <CourseForm
          initialValues={activeCourse}
          onSubmit={handleCreateOrUpdate}
          onCancel={closeModal}
          submitError={formError}
        />
      </Modal>

      <Modal
        isOpen={modalMode === "delete"}
        onClose={closeModal}
        title="Delete this course?"
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Delete course
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          "{activeCourse?.title}" will be permanently removed. This can't be undone.
        </p>
      </Modal>
    </div>
  );
}
