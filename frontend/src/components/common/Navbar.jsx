import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import ToastNotifications from "./ToastNotifications";

const Navbar = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // Check for authentication
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    setToast({ message: "Logged out successfully", type: "success" });
    navigate("/");
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <ToastNotifications
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span
            className="navbar-brand"
            onClick={() => scrollToSection("hero-section")}
            style={{ cursor: "pointer" }}
          >
            LMS
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => scrollToSection("hero-section")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => scrollToSection("about-section")}
                  style={{ cursor: "pointer" }}
                >
                  About
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => scrollToSection("category-section")}
                  style={{ cursor: "pointer" }}
                >
                  Book Category
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => scrollToSection("features-section")}
                  style={{ cursor: "pointer" }}
                >
                  Features
                </span>
              </li>

              {/* Conditional Links based on auth status */}
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={role === "admin" ? "/admin" : "/user-dashboard"}
                    >
                      {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
