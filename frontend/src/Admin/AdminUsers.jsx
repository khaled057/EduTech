import { useState } from "react";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Anas Ashraf", email: "anas@gmail.com", role: "Student" },
    { id: 2, name: "Ahmed Mohamed", email: "ahmed@gmail.com", role: "Instructor" },
    { id: 3, name: "Youssef Mahmoud", email: "youssef@gmail.com", role: "Admin" }
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");

  const addUser = () => {
    if (name === "" || email === "") {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setRole("Student");
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="admin-page">
      <h1>Manage Users</h1>
      <p>View, add and delete platform users</p>

      <div className="admin-menu">
        <Link to="/">Dashboard</Link>
        <Link to="/admin/courses">Courses</Link>
        <Link to="/admin/content">Content</Link>
      </div>

      <div className="admin-section">
        <h2>Add New User</h2>

        <div className="admin-form">
          <input
            type="text"
            placeholder="User name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="User email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>

          <button className="admin-button" onClick={addUser}>
            Add User
          </button>
        </div>

        <h2>Users List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(user.id)}
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

export default AdminUsers;