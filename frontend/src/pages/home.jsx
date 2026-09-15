import CourseHeader from "../components/CourseHeader";
import Footer from "../components/footer";
import heroImage from "../assets/hero2.png";
import "./Home.css";

function Home() {
  return (
    <div>
      <CourseHeader />
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Learn new skills with the best courses.{" "}
            <span className="highlight">From anywhere, anytime.</span>
            <br />
          </h1>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Learning Illustration" />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
