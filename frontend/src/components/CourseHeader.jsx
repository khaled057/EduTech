import { Link, useNavigate } from "react-router-dom"; // علشان نروح الصفحات تانية منغير منحمل الصفحة كلها
import logo from "../assets/logo.png";
import "./CourseHeader.css";
import { useState } from "react";

function CourseHeader() {
  const [showExplore, setShowExplore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="main-header">
      <div className="navbar">
        <div className="brand">
          <img src={logo} alt="EduTech Logo" className="logo-img" />
          <span className="brand-name">EduTech</span>
        </div>
        <div className="nav-menu">
          <button
            className="nav-link dropdown"
            onClick={() => setShowExplore(!showExplore)}
          >
            Explore {showExplore ? "▲" : "▼"}
          </button>

          {showExplore && (
            <div className="dropdown-menu">
              <Link to="/courses">Courses</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
          <span className="nav-link">Certificates</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to learn?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-btn"
            aria-label="Search"
            onClick={handleSearch}
          >
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
}

export default CourseHeader;
