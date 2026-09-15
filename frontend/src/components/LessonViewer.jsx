import styles from "./LessonViewer.module.css";

const LessonViewer = ({ lesson }) => {
  if (!lesson) {
    return (
      <div className={styles.emptyState}>
        Choose a lesson from the sidebar to get started.
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{lesson.title}</h2>
      {lesson.videoUrl ? (
        <div className={styles.videoWrapper}>
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            width="100%"
            height="480px"
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className={styles.textContent}>{lesson.content}</div>
      )}
    </div>
  );
};

export default LessonViewer;
