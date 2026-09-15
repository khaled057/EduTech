import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CourseHero from "../components/CourseHero";
import CourseFooter from "../components/footer";
import CourseHeader from "../components/CourseHeader";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/courses/${courseId}`)
      .then((res) => {
        setCourse(res.data.course);
        setIsEnrolled(res.data.isEnrolled);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error in retrieving course data", err);
        setLoading(false);
      });
  }, [courseId]);
  /* 
  useEffect(() => {
  const fakeCourse = {
    _id: courseId,
    title: "React Fundamentals",
    description: "Learn React from beginner to advanced.",
    instructor: "Ahmed Mohamed",
    price: 500,
    image: "/course-image.jpg",
  };

  setCourse(fakeCourse);
  setIsEnrolled(false);
  setLoading(false);
}, [courseId]);
  */
  const handleEnroll = async () => {
    try {
      await axios.post(`/api/courses/${courseId}/enroll`);
      setIsEnrolled(true);
      navigate(`/learning/${courseId}`);
    } catch {
      alert("Registration for the course was not possible");
    }
  };
  if (loading) return <div style={{ padding: "24px" }}>Loading...</div>;
  if (!course)
    return <div style={{ padding: "24px" }}>The course does not exist.</div>;
  return (
    <div>
      <CourseHeader />
      <CourseHero
        course={course}
        isEnrolled={isEnrolled}
        onEnroll={handleEnroll}
        onContinue={() => navigate(`/learning/${courseId}`)}
      />
      <CourseFooter />
    </div>
  );
};

export default CourseDetails;
