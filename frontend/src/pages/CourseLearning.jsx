import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LearningHeader from "../components/LearningHeader";
import Sidebar from "../components/Sidebar";
import LessonViewer from "../components/LessonViewer";

const CourseLearning = () => {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/courses/${courseId}/lessons`)
      .then((res) => {
        setChapters(res.data.chapters || []);
        if (res.data.chapters?.[0]?.lessons?.[0]) {
          setActiveLesson(res.data.chapters[0].lessons[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error in bringing up the lessons", err);
        setError(
          "An error occurred while loading the lessons, please try again.",
        );
        setLoading(false);
      });
  }, [courseId]);
  if (loading)
    return <div style={{ padding: "24px" }}>Lessons are loading...</div>;
  if (error)
    return <div style={{ padding: "24px", color: "red" }}>{error}</div>;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <LearningHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          chapters={chapters}
          activeLesson={activeLesson}
          onSelectLesson={(lesson) => setActiveLesson(lesson)}
        />
        <LessonViewer lesson={activeLesson} />
      </div>
    </div>
  );
};

export default CourseLearning;
