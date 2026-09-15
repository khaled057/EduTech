import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CourseDetails from "./pages/CourseDetails";
import CourseLearning from "./pages/CourseLearning";
import ProtectedRoute from "./components/ProtectedRoute";
import Assignments from "./pages/Assignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import InstructorAssignments from "./pages/InstructorAssignments";
import CreateAssignment from "./pages/CreateAssignment";
import AssignmentSubmissions from "./pages/AssignmentSubmissions";
import ReviewSubmission from "./pages/ReviewSubmission";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminUsers from "./Admin/AdminUsers";
import AdminCourses from "./Admin/AdminCourses";
import AdminContent from "./Admin/AdminContent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import "./Admin/admin.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />

        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route
          path="/learning/:courseId"
          element={
            <ProtectedRoute>
              <CourseLearning />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/learning/:courseId/assignments" 
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/:courseId/assignments/:assignmentId"
          element={
            <ProtectedRoute>
              <AssignmentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/assignments"
          element={
            <ProtectedRoute>
              <InstructorAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/assignments/create"
          element={
            <ProtectedRoute>
              <CreateAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/assignments/:assignmentId/submissions"
          element={
            <ProtectedRoute>
              <AssignmentSubmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/submissions/:submissionId/review"
          element={
            <ProtectedRoute>
              <ReviewSubmission />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/content" element={<AdminContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;