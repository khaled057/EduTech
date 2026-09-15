import { useState } from "react";
import { Link } from "react-router-dom";

function AdminContent() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to React",
      course: "React Fundamentals",
      type: "Video"
    },
    {
      id: 2,
      title: "JavaScript Variables",
      course: "JavaScript Basics",
      type: "Article"
    },
    {
      id: 3,
      title: "CSS Flexbox",
      course: "HTML & CSS",
      type: "PDF"
    }
  ]);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState("Video");

  const addLesson = () => {
    if (title === "" || course === "") {
      alert("Please fill all fields");
      return;
    }

    const newLesson = {
      id: Date.now(),
      title,
      course,
      type
    };

    setLessons([...lessons, newLesson]);
    setTitle("");
    setCourse("");
    setType("Video");
  };

  const deleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  return (
    <div className="admin-page">
      <h1>Manage Content</h1>
      <p>Manage lessons and learning materials</p>

      <div className="admin-menu">
        <Link to="/">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/courses">Courses</Link>
      </div>

      <div className="admin-section">
        <h2>Add New Lesson</h2>

        <div className="admin-form">
          <input
            type="text"
            placeholder="Lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Video">Video</option>
            <option value="Article">Article</option>
            <option value="PDF">PDF</option>
          </select>

          <button className="admin-button" onClick={addLesson}>
            Add Lesson
          </button>
        </div>

        <h2>Lessons List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lesson Title</th>
              <th>Course</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.id}</td>
                <td>{lesson.title}</td>
                <td>{lesson.course}</td>
                <td>{lesson.type}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteLesson(lesson.id)}
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

export default AdminContent;