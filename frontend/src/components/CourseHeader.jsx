import { Link } from "react-router-dom"; // علشان نروح الصفحات تانية منغير منحمل الصفحة كلها
import logo from "../assets/logo.png";
import "./CourseHeader.css";

const CourseHeader = () => {
  return (
    <header className="main-header">
      <div className="navbar">
        <div className="brand">
          <img src={logo} alt="EduTech Logo" className="logo-img" />
          <span className="brand-name">EduTech</span>
        </div>
        <div className="nav-menu">
          <span className="nav-link dropdown">Explore ▾</span>
          <span className="nav-link">Certificates</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to learn?"
          />
          <button className="search-btn" aria-label="Search">
            🔍
          </button>
        </div>
        <div className="auth-links">
          <Link to="/login" className="nav-link">
            Sign In
          </Link>
          <span className="divider">OR</span>
          <Link to="/register" className="nav-link highlight">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
