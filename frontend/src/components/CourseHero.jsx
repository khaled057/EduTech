import "./CourseHero.css";

const CourseHero = ({ course, isEnrolled, onEnroll, onContinue }) => {
  const {
    title,
    description,
    instructorName,
    instructorLogo,
    enrolledCount,
    startDate,
    modulesCount,
    rating,
    reviewsCount,
    level,
    duration,
    pace,
  } = course;

  return (
    <section className="course-hero">
      <div className="course-hero-content">
        {instructorLogo && ( // لو صورة الinstructor موجودة يعرض الصورة
          <img
            src={instructorLogo}
            alt={instructorName}
            className="instructor-logo"
          />
        )}
        <h2 className="course-title">{title}</h2>
        {description && <p className="course-description">{description}</p>}
        {instructorName && (
          <div className="instructor-row">
            <span>Instructor: </span>
            <a href="#" className="instructor-link">
              {instructorName}
            </a>
          </div>
        )}
        <button // لو مشترك يظهرContinue Learning لو لا يظهر Enroll for free وتاريخ الاشتراك
          className={`enroll-btn ${isEnrolled ? "enrolled" : ""}`}
          onClick={isEnrolled ? onContinue : onEnroll}
        >
          {isEnrolled ? (
            "Continue Learning"
          ) : (
            <>
              Enroll for free
              {startDate && (
                <span className="enroll-subtext">Starts {startDate}</span>
              )}
            </>
          )}
        </button>{" "}
        {/* عدد الناس الي اشتركت في الكورس */}
        {enrolledCount != null && (
          <p className="enrolled-count">
            <strong>{enrolledCount.toLocaleString()}</strong> already enrolled
            {/* 1250 = 1,250 */}
          </p>
        )}
        <div className="info-cards">
          {modulesCount && (
            <div className="info-card">
              <span className="info-title">{modulesCount} modules</span>
              <span className="info-sub">
                Gain insight into a topic and learn the fundamentals.
              </span>
            </div>
          )}
          {rating && (
            <div className="info-card">
              <span className="info-title">
                {rating} <span className="star">★</span>
              </span>
              <span className="info-sub">{reviewsCount} reviews</span>
            </div>
          )}
          {level && (
            <div className="info-card">
              <span className="info-title">{level}</span>
              <span className="info-sub">Recommended experience</span>
            </div>
          )}
          {duration && (
            <div className="info-card">
              <span className="info-title">Flexible schedule</span>
              <span className="info-sub">
                {duration}
                <br />
                {pace}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
