import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CourseDetails from "./pages/CourseDetails";
import CourseLearning from "./pages/CourseLearning";
import ProtectedRoute from "./components/ProtectedRoute";

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