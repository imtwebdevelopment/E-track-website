import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../styles/base.css"; // ✅ Ensures full animation + responsiveness

// Smooth scroll to section
const scrollToHash = (hash) => {
  setTimeout(() => {
    const element = document.querySelector(hash);
    if (element) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20,
        behavior: "smooth",
      });
    }
  }, 100);
};

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Navbar() {
  const navigate = useNavigate();

  const handleNav = (e, path, isAnchor = true) => {
    e.preventDefault();

    // --- NEW: Close the menu when a link is clicked ---
    const toggler = document.querySelector(".navbar-toggler");
    const collapse = document.querySelector(".navbar-collapse");
    if (collapse && collapse.classList.contains("show")) {
      toggler.click(); 
    }
    // --------------------------------------------------
    
    // Handle navigation
    if (isAnchor) {
      if (window.location.pathname !== "/") {
        navigate("/");
      }
      scrollToHash(path);
    } else {
      navigate(path);
    }
  };

  // Scroll shrink effect
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 60) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);

    // --- OLD OVERLAY LOGIC REMOVED ---
    
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
      <div className="container">
        {/* --- 1. Logo --- */}
        <div className="navbar-logo me-auto">
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none"
            onClick={scrollToTop}
          >
            <img
              src={Logo}
              alt="ETrack Logo"
              className="img-fluid"
              style={{
                height: "230px",
                width: "auto",
                padding: "4px",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Link>
        </div>

        {/* --- 2. Mobile Toggler --- */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* --- 3. Nav Links --- */}
        <div className="collapse navbar-collapse justify-content-center" id="navMenu">
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
            {/* All your list items remain the same, just the handleNav function is updated */}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={scrollToTop}>
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#about"
                onClick={(e) => handleNav(e, "#about")}
              >
                ABOUT US
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#titleservices"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SERVICES
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#titleservices"
                    onClick={(e) => handleNav(e, "#titleservices")}
                  >
                    Title Services
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#mortgageservices"
                    onClick={(e) => handleNav(e, "#mortgageservices")}
                  >
                    Mortgage Services
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#roofingservices"
                    onClick={(e) => handleNav(e, "#roofingservices")}
                  >
                    Roofing Reports
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#why"
                onClick={(e) => handleNav(e, "#why")}
              >
                WHY ETRACK
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
                onClick={(e) => handleNav(e, "#contact")}
              >
                CONTACT
              </a>
            </li>

            {/* --- Mobile Phone Button --- */}
            <li className="nav-item d-lg-none mt-3">
              <a
                className="brand-btn btn-sm text-decoration-none"
                href="tel:7038806311"
              >
                <i className="bi bi-telephone-fill me-1"></i> 703-880-6311
              </a>
            </li>
          </ul>
        </div>

        {/* --- Desktop Phone Button --- */}
        <div className="d-none d-lg-flex">
          <a
            className="brand-btn btn-sm ms-3 text-decoration-none"
            href="tel:7038806311"
          >
            <i className="bi bi-telephone-fill me-1"></i> +1 703-880-6311
          </a>
        </div>
      </div>
    </nav>
  );
}