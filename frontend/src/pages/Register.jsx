import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import ToastNotifications from "../components/common/ToastNotifications";
import { BASE_URL } from "../App";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.gender
    ) {
      setToast({ message: "All fields are required!", type: "error" });
      return;
    }

    // Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setToast({
        message: "Password does not match, Try again",
        type: "error",
      });
      return;
    }

    setError("");

    try {
      const res = await axios.post(BASE_URL + "/register", formData);
      setToast({ message: "Registration Successful!", type: "success" });
      console.log("Registered User Data : ", res.data);
      setTimeout(() => navigate("/user-dashboard"), 3000);
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
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

      {/* Back to home link */}
      <p className="back-home">
        <Link to="/">
          <FaArrowLeft />
          Back to Home Link
        </Link>
      </p>
      {/* Register Form */}
      <div className="register-container">
        <div className="register-box">
          <h2>Create an Account</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <InputField
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />

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

            {/* Confirm Password Input */}
            <InputField
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm your password"
              onChange={handleChange}
            />

            {/* Gender Selection */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Submit Button */}
            <Button text="Register" type="submit" />

            {/* Login Link */}
            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login">
                <strong>Login Here</strong>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
