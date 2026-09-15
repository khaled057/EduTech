import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ chapters, activeLesson, onSelectLesson }) => {
  const [openChapterId, setOpenChapterId] = useState(
    chapters?.[0]?._id || null, // القيمة الافتراضية اول فصل لو مفيش تبقي بnull
  );
  const toggleChapter = (id) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };
  const flatLessons = chapters.flatMap((chapter) => chapter.lessons); // جميع كل الدروس في flatarray
  const currentIndex = flatLessons.findIndex(
    (lesson) => lesson._id === activeLesson?._id,
  );
  const goToLesson = (lesson) => {
    const parentChapter = chapters.find((ch) =>
      ch.lessons.some((l) => l._id === lesson._id),
    );
    if (parentChapter) setOpenChapterId(parentChapter._id);
    onSelectLesson(lesson);
  };
  const goPrev = () => {
    if (currentIndex > 0) goToLesson(flatLessons[currentIndex - 1]);
  };
  const goNext = () => {
    if (currentIndex < flatLessons.length - 1) {
      goToLesson(flatLessons[currentIndex + 1]);
    }
  };

  return (
    <aside className="sidebar">
      {chapters.map((chapter) => {
        const isOpen = openChapterId === chapter._id;
        return (
          <div key={chapter._id} className="chapter-card">
            <button
              className="chapter-header"
              onClick={() => toggleChapter(chapter._id)}
            >
              <div className="chapter-icon">📖</div>
              <div className="chapter-info">
                <span className="chapter-title">{chapter.title}</span>
                <span className="chapter-count">
                  {chapter.lessons.length} Topic
                </span>
              </div>
              <span className={`chevron ${isOpen ? "open" : ""}`}>▾</span>
            </button>
            {isOpen && (
              <ul className="lesson-list">
                {chapter.lessons.map((lesson) => (
                  <li
                    key={lesson._id}
                    onClick={() => goToLesson(lesson)}
                    className={`lesson-item ${
                      activeLesson?._id === lesson._id ? "active" : ""
                    }`}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
      <div className="lesson-nav">
        <button
          className="nav-btn prev-btn"
          onClick={goPrev}
          disabled={currentIndex <= 0}
        >
          Previous
        </button>
        <button
          className="nav-btn next-btn"
          onClick={goNext}
          disabled={
            currentIndex === -1 || currentIndex >= flatLessons.length - 1
          }
        >
          Next
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
