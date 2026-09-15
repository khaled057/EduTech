import "./LearningHearder.css";
import logo from "../assets/logo.png";

const LearningNavbar = ({ progress = 0, userName = "User" }) => {
  // Default values
  return (
    <header className="learning-navbar">
      <div className="brand">
        <img src={logo} alt="EduTech Logo" className="logo-img" />
        <span className="brand-name">EduTech</span>
      </div>
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}% Learnt</span>
      </div>
      <div className="nav-actions">
        <div className="user-info">
          <div className="user-avatar">{userName.charAt(0)}</div>
          {/* اول حرف من اسم المستخدم */}
          <span className="user-name">{userName}</span>
          <span className="dropdown-arrow">▾</span>
        </div>
      </div>
    </header>
  );
};

export default LearningNavbar;
