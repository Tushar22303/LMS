import React from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-section" id="about-section">
      <div className="container">
        <h2>About Our Library</h2>
        <p>
          Welcome to our digital library, a place where knowledge meets
          accessibility. We offer a vast collection of books across multiple
          genres, including fiction, non-fiction, academic, technology, history,
          and more.
        </p>

        <h3>Why Choose Our Library?</h3>
        <ul>
          <li>
            Extensive book collection covering various subjects and interests.
          </li>
          <li>Easy access to books anytime, anywhere.</li>
          <li>User-friendly search and filtering options.</li>
          <li>Special sections for students, researchers, and book lovers.</li>
          <li>Regularly updated content to keep up with new releases.</li>
        </ul>

        <h3>Explore More</h3>
        <p>Want to know more about our services? Check out the links below:</p>
        <ul>
          <li>
            <Link>Browse Our Books Collection</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <a
              href="https://www.goodreads.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Goodreads for More Book Recommendations
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
