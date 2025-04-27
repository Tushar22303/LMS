import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-logo">
          <h2>LMS</h2>
          <p>Your gateway to knowledge and learning.</p>
        </div>

        {/* Navigation Links with IDs for Scrolling */}
        <nav className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#hero-section">Home</a>
            </li>
            <li>
              <a href="#about-section">About</a>
            </li>
            <li>
              <a href="#category-section">Book Categories</a>
            </li>
            <li>
              <a href="#features-section">Features</a>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <section className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </section>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {currentYear} Library Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
