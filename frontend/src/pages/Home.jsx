import React from "react";
import "../styles/Home.css";
import Button from "../components/common/Button"; // Import Button component
import Footer from "../components/common/Footer";
import Card from "../components/common/Card";
import Navbar from "../components/common/Navbar";
import About from "./About";
import scienceBookImage from "../assets/Images/science.jpg";
import fictionBookImage from "../assets/Images/fiction.jpg";
import romanceBookImage from "../assets/Images/romance.jpg";
import historyBookImage from "../assets/Images/history.jpg";
import philosopyBookImage from "../assets/Images/philosopy.jpg";
import technologyBookImage from "../assets/Images/technology.jpg";
import mysteryBookImage from "../assets/Images/mystery.jpg";
import selfhelpBookImage from "../assets/Images/selfhelp.webp";

const Home = () => {
  // Array of categories (you can replace this with dynamic data later)
  const categories = [
    {
      id: 1,
      name: "Science",
      description: "Explore scientific books",
      image: scienceBookImage,
    },
    {
      id: 2,
      name: "Fiction",
      description: "Dive into fictional worlds",
      image: fictionBookImage,
    },
    {
      id: 3,
      name: "Mystery",
      description: "Solve mysteries with us",
      image: mysteryBookImage,
    },
    {
      id: 4,
      name: "Romance",
      description: "Romantic tales and love stories",
      image: romanceBookImage,
    },
    {
      id: 5,
      name: "History",
      description: "Explore past events and civilizations",
      image: historyBookImage,
    },
    {
      id: 6,
      name: "Philosophy",
      description: "Think deep with philosophical books",
      image: philosopyBookImage,
    },
    {
      id: 7,
      name: "Technology",
      description: "Stay updated with the latest tech trends",
      image: technologyBookImage,
    },
    {
      id: 8,
      name: "Self-Help",
      description: "Improve your life with self-help books",
      image: selfhelpBookImage,
    },
  ];

  // Scroll to Book Categories Section
  const handleExploreBooks = () => {
    const categorySection = document.getElementById("category-section");
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section" id="hero-section">
          <div className="hero-content">
            <h1>Welcome to the Library Management System</h1>
            <p>Your gateway to knowledge and learning</p>
            <Button text="Explore Books" onClick={handleExploreBooks} />
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Category Section */}
        <section className="category-section" id="category-section">
          <div className="container">
            <h2>Book Categories</h2>
            <div className="category-cards">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  title={category.name}
                  description={category.description}
                  image={category.image} // Adding image to the Card component
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features-section">
          <div className="container">
            <h2>Features</h2>
            <div className="features-list">
              {[
                {
                  title: "Easy Book Search",
                  desc: "Find books quickly with our powerful search functionality.",
                },
                {
                  title: "User-Friendly Interface",
                  desc: "Navigate seamlessly through our easy-to-use system.",
                },
                {
                  title: "Secure Login",
                  desc: "Access your account securely with strong authentication.",
                },
                {
                  title: "Book Recommendations",
                  desc: "Get personalized book recommendations based on your preferences.",
                },
                {
                  title: "Borrow & Return Books",
                  desc: "Easily borrow and return books with a click.",
                },
                {
                  title: "24/7 Access",
                  desc: "Access your library anytime, anywhere.",
                },
              ].map((feature, index) => (
                <div key={index} className="feature">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
