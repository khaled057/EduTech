import CourseHeader from "../components/CourseHeader";
import Footer from "../components/footer";
import { Link, useSearchParams } from "react-router-dom";
import "./Course.css";
import ui from "../assets/ui.jpg";
import ai from "../assets/ai.jpg";
import cyber from "../assets/cyber.jpg";
import python from "../assets/python.jpg";
import data from "../assets/data.jpg";
import flutter from "../assets/flutter.jpg";

const courses = [
  {
    id: 1,
    title: "UI/UX",
    provider: "DataCamp",
    rating: 4.6,
    duration: "Flexible",
    price: "Free Trial Available",
    image: ui,
  },
  {
    id: 2,
    title: "Flutter",
    provider: "Coursera",
    rating: 5,
    duration: "4 weeks, 1 hour a week",
    price: "Paid Course",
    image: flutter,
  },
  {
    id: 3,
    title: "AI Fundamentals",
    provider: "DataCamp",
    rating: 4.5,
    duration: "10 hours",
    price: "Free Trial Available",
    image: ai,
  },
  {
    id: 4,
    title: "Python for Data Science",
    provider: "Coursera",
    rating: 4.8,
    duration: "6 weeks",
    price: "Paid Course",
    image: python,
  },
  {
    id: 5,
    title: "Cyber Security",
    provider: "Google",
    rating: 4.3,
    duration: "8 weeks",
    price: "Free",
    image: cyber,
  },
  {
    id: 6,
    title: "Excel Data Analysis",
    provider: "Microsoft",
    rating: 4.7,
    duration: "5 hours",
    price: "Free",
    image: data,
  },
];

function Courses() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const filteredCourses = query
    ? courses.filter((course) => course.title.toLowerCase().includes(query))
    : courses;

  return (
    <div>
      <CourseHeader />
      <section className="courses-page">
        <h2 className="courses-title">
          {query ? `Search results for "${query}"` : "Explore Our Courses"}
        </h2>
        {filteredCourses.length === 0 ? (
          <p>No courses found matching your search.</p>
        ) : (
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <Link
                to={`/courses/${course.id}`}
                className="course-card-link"
                key={course.id}
              >
                <div className="course-card">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                  />
                  <div className="course-info">
                    <span className="course-provider">{course.provider}</span>
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-rating">
                      {"★".repeat(Math.round(course.rating))}
                      {"☆".repeat(5 - Math.round(course.rating))}
                      <span className="rating-number"> {course.rating}</span>
                    </div>
                    <p className="course-duration">{course.duration}</p>
                    <p className="course-price">{course.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Courses;
