import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import ToastNotifications from "../components/common/ToastNotifications";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../App";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.password) {
      setToast({ message: "All fields are required!", type: "error" });
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/login", formData);
      const { token, name, role, user_id, email } = res.data;

      // Store the JWT in local Storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("email", email);

      setToast({
        message: `Welcome ${role === "admin" ? "Admin" : "User"}!`,
        type: "success",
      });
      console.log("Login details : ", res.data);

      setTimeout(() => {
        login(token, role);
        navigate(role === "admin" ? "/admin" : "/user-dashboard");
      }, 3000);
    } catch (error) {
      const message = error.response?.data?.error || "Login failed. Try again!";
      setToast({ message, type: "error" });
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      {/* Show Toast Notification */}
      {toast && (
        <ToastNotifications
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)} // Hide after duration
        />
      )}

      {/* Back to Home Link */}
      <p className="back-home">
        <Link to="/">
          <FaArrowLeft /> Back to Home Page
        </Link>
      </p>

      {/* Login Page */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <InputField
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />

            {/* Password Input */}
            <InputField
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />

            {/* Submit Button */}
            <Button text="Login" type="submit" />

            {/* Register Link */}

            <p className="register-text">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
