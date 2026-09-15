import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  /* 
  useEffect(() => {
  const fakeChapters = [
    {
      _id: "ch1",
      title: "Introduction",
      lessons: [
        {
          _id: "l1",
          title: "What is React?",
          content: "React is a JavaScript library.",
        },
        {
          _id: "l2",
          title: "Components",
          content: "Components are reusable pieces of UI.",
        },
      ],
    },
    {
      _id: "ch2",
      title: "Advanced React",
      lessons: [
        {
          _id: "l3",
          title: "React Hooks",
          content: "Hooks allow you to use state.",
        },
        {
          _id: "l4",
          title: "Context API",
          content: "Context allows sharing data between components.",
        },
      ],
    },
  ];

  setChapters(fakeChapters);
  setActiveLesson(fakeChapters[0].lessons[0]);
  setLoading(false);
}, [courseId]);
  */
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
        <div style={{ width: "260px", borderRight: "1px solid #eee" }}>
          <div style={{ padding: "12px 16px" }}>
            <Link to={`/learning/${courseId}/assignments`}>
              📄 View Your Assignments
            </Link>
          </div>
          <Sidebar
            chapters={chapters}
            activeLesson={activeLesson}
            onSelectLesson={(lesson) => setActiveLesson(lesson)}
          />
        </div>
        <LessonViewer lesson={activeLesson} />
      </div>
    </div>
  );
};

export default CourseLearning;
