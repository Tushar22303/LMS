import React, { useState } from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import "../styles/Contact.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing data from localStorage
    const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Add new contact details
    const updatedContacts = [...existingContacts, formData];

    // Store updated contacts in localStorage
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    alert("Your message has been saved!");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Back to Home Page */}
      <p className="back-home">
        <Link to="/">
          <FaArrowLeft /> Back to Home Page
        </Link>
      </p>

      {/* Contact Page */}
      <div className="contact-page">
        <h2>Contact Us</h2>
        <p>Have a question? Feel free to reach out to us!</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <InputField
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            type="textarea"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
          />

          <Button text="Send Message" type="submit" />
        </form>
      </div>
    </>
  );
};

export default Contact;
