import logo from "../assets/logo.png";
import "./footer.css";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const CourseFooter = () => {
  return (
    <footer className="course-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div>
            <p className="footer-column-title">Company</p>
            <ul className="footer-link-list">
              <li>
                <a className="footer-link" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Brand Center
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-column-title">Help Center</p>
            <ul className="footer-link-list">
              <li>
                <a className="footer-link" href="#">
                  Discord Server
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Twitter
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-column-title">Legal</p>
            <ul className="footer-link-list">
              <li>
                <a className="footer-link" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Licensing
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  {" "}
                  // Terms & Conditions Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-column-title">Download</p>
            <ul className="footer-link-list">
              <li>
                <a className="footer-link" href="#">
                  iOS
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Android
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Windows
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <div className="footer-brand">
            <img src={logo} alt="EduTech Logo" className="footer-logo" />
            <span className="text">EduTech</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} <a href="#">EduTech™</a>. All rights
            reserved.
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social-icon" aria-label="Facebook">
              <BsFacebook />
            </a>
            <a href="#" className="footer-social-icon" aria-label="Instagram">
              <BsInstagram />
            </a>
            <a href="#" className="footer-social-icon" aria-label="Twitter">
              <BsTwitter />
            </a>
            <a href="#" className="footer-social-icon" aria-label="Github">
              <BsGithub />
            </a>
            <a href="#" className="footer-social-icon" aria-label="Dribbble">
              <BsDribbble />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CourseFooter;
