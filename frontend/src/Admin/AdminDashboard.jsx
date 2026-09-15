import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Student Learning Website Admin Dashboard</p>

      <div className="admin-menu">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/courses">Manage Courses</Link>
        <Link to="/admin/content">Manage Content</Link>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>24</h2>
          <p>Total Users</p>
        </div>

        <div className="dashboard-card">
          <h2>8</h2>
          <p>Total Courses</p>
        </div>

        <div className="dashboard-card">
          <h2>42</h2>
          <p>Total Lessons</p>
        </div>

        <div className="dashboard-card">
          <h2>3</h2>
          <p>Administrators</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;