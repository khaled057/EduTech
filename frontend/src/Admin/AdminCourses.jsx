import { useState } from "react";
import { Link } from "react-router-dom";

function AdminCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "Youssef Mahmoud",
      category: "Frontend"
    },
    {
      id: 2,
      title: "JavaScript Basics",
      instructor: "Ahmed Mohamed",
      category: "Programming"
    },
    {
      id: 3,
      title: "HTML & CSS",
      instructor: "Arwa Ali",
      category: "Web Development"
    }
  ]);

  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [category, setCategory] = useState("");

  const addCourse = () => {
    if (title === "" || instructor === "" || category === "") {
      alert("Please fill all fields");
      return;
    }

    const newCourse = {
      id: Date.now(),
      title,
      instructor,
      category
    };

    setCourses([...courses, newCourse]);
    setTitle("");
    setInstructor("");
    setCategory("");
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="admin-page">
      <h1>Manage Courses</h1>
      <p>Add and manage available courses</p>

      <div className="admin-menu">
        <Link to="/">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/content">Content</Link>
      </div>

      <div className="admin-section">
        <h2>Add New Course</h2>

        <div className="admin-form">
          <input
            type="text"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Instructor name"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button className="admin-button" onClick={addCourse}>
            Add Course
          </button>
        </div>

        <h2>Courses List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Title</th>
              <th>Instructor</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourses;