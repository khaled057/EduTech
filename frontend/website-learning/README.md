# Task 1 & Task 2 — Shared UI Components + Courses Feature

Built to match the requirements in *Node.js + React Full-Stack Project Guide*
(Backend & API, React & Frontend, Code Quality sections).

## Folder structure

```
src/
  components/ui/        # Task 1 — shared, reusable UI & form components
    Button.jsx
    Field.jsx            # label + error + hint wrapper used by every input
    Input.jsx
    Textarea.jsx
    Select.jsx
    Card.jsx
    Modal.jsx
    Alert.jsx
    Spinner.jsx
    EmptyState.jsx
    Badge.jsx
  hooks/
    useForm.js           # shared controlled-form + validation logic
  services/
    api.js                # axios instance: auth token header + error normalizing
    courseService.js      # CRUD calls to /api/courses
  features/courses/       # Task 2 — Courses
    courseValidation.js
    CourseForm.jsx         # add/edit, built from the shared inputs
    CourseCard.jsx
    CoursesPage.jsx        # list + search/filter/pagination + CRUD + states
  styles/index.css
tailwind.config.js
```

## How this maps to the evaluation form

- **Reusable components**: every input/button/card/modal lives once in
  `components/ui` and is reused by the Courses form and grid — nothing is
  copy-pasted per screen.
- **Forms with validation**: `courseValidation.js` + `useForm` give inline,
  field-level errors (required title, description, level, non-negative
  price/duration).
- **Real API integration**: `courseService.js` calls a RESTful
  `/api/courses` endpoint (GET list w/ search+level+pagination, GET by id,
  POST, PUT, DELETE) — swap the base URL via `VITE_API_URL`.
- **Loading / Error / Empty states**: `CoursesPage` shows a spinner while
  fetching, a retry `EmptyState` on failure, and a distinct empty state for
  "no courses yet" vs. "no results for this search."
- **Responsive**: the course grid goes 1 → 2 → 3 columns from mobile to
  desktop (Tailwind's `sm:`/`lg:` breakpoints).
- **Confirmation before destructive action**: delete opens a confirm modal
  instead of deleting immediately.

## Wiring it into your app

1. `npm install axios` (React + Tailwind are assumed to already be set up).
2. Copy `src/` and `tailwind.config.js` into your project (merge the
   `theme.extend` block if you already have a config).
3. Set `VITE_API_URL` in `.env` to your Express backend, e.g.
   `VITE_API_URL=http://localhost:5000/api`.
4. Add a route: `<Route path="/courses" element={<CoursesPage />} />`.

Backend contract the frontend expects from Express:

```
GET    /api/courses?search=&level=&page=&limit=   -> { items, total, page, pages }
GET    /api/courses/:id                            -> course
POST   /api/courses                                -> created course
PUT    /api/courses/:id                             -> updated course
DELETE /api/courses/:id                            -> 204
```
