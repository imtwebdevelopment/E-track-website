import React, { useState, useEffect } from "react";
import HeroImg1 from "../assets/images/1baner.png";
import HeroImg2 from "../assets/images/banner 2.png";
import HeroImg3 from "../assets/images/Banner 3.png";
import "../styles/base.css"; // ✅ Contains all animation + responsive rules

const heroData = [
  { image: HeroImg1, headline: "Title Search Services Nationwide" },
  { image: HeroImg2, headline: "Mortgage Loan Processing & Servicing" },
  { image: HeroImg3, headline: "Roof & Wall Measurement Reports" },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () =>
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);

  const handlePrev = () =>
    setCurrentImageIndex(
      (prevIndex - 1 + heroData.length) % heroData.length
    );

  // Auto-cycle every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const currentHero = heroData[currentImageIndex];

  // Hero background with smooth fade transition
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(10, 25, 49, 0.55), rgba(10, 25, 49, 0.55)), url(${currentHero.image})`,
  };

  return (
    <header
      id="home"
      className="hero-section hero-image-transition text-center d-flex align-items-center justify-content-center"
      style={heroStyle}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hero-nav-btn prev-btn"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="hero-nav-btn next-btn"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Hero Content */}
      <div className="container" style={{ zIndex: 2 }}>
        <h1
          key={currentImageIndex + "-h1"}
          className="text-white fw-bold mb-3 hero-text-slide"
        >
          {currentHero.headline}
        </h1>

        <p className="lead text-white fw-light animate-fade-delay">
          Accurate • Affordable • Nationwide Coverage
        </p>

        <a
          href="#titleservices"
          className="btn btn-lg mt-4 px-4 shadow-sm brand-btn text-white"
        >
          Explore Our Services
        </a>
      </div>
    </header>
  );
}
