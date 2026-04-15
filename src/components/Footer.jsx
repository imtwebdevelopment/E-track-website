import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import Logo from "../assets/images/logo.png"

// Helper function to scroll to an anchor ID, compensating for fixed header height
const scrollToHash = (hash) => {
    // We use a small timeout to ensure the component has rendered on the new route before scrolling
    setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
            // Attempt to get the fixed navbar height for accurate scrolling offset
            const navbar = document.querySelector(".navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            // Calculate position and scroll
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - navbarHeight - 20, // Subtract offset + extra padding
                behavior: "smooth",
            });
        }
    }, 100);
};

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    // Custom function to handle anchor clicks
    const handleAnchorClick = (e, hash) => {
        e.preventDefault();
        
        if (location.pathname !== "/") {
            navigate("/" + hash);
        } else {
            scrollToHash(hash);
        }
    };
    
  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* Pre-Footer Section: "Do You Need Free Consultation?" (Gradient Blue) - READY FOR CUSTOM CSS */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-blue py-5 text-white"> 
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="h3 mb-0 fw-bold">Do You Need Free Consultation?</h2> 
            </div>
            
            <div className="col-lg-5 d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-end">
              <div className="text-center me-3 mb-2 mb-lg-0">
                <i className="bi bi-envelope-fill display-5 text-sky-blue"></i> 
              </div>
              <div className="text-center text-lg-start">
                <p className="mb-0 small opacity-75">Send E-Mail</p>
                
                {/* Custom CSS class 'pre-footer-cta' added here! */}
                <a 
                  href="mailto:orders@etracktitle.com" 
                  className="h3 mb-0 text-secondary  text-decoration-none fw-bolder pre-footer-cta" 
                >
                  orders@etracktitle.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Main Footer Content (Dark Blue) */}
      {/* ... (rest of the footer code remains the same) ... */}

      <footer className="bg-info text-secondary pt-5 pb-3">
        <div className="container">
          <div className="row">
            {/* Column 1: Logo and Description */}
            <div className="col-lg-4 mb-lg-0">
                <Link to="/">
                    <img 
                      src={Logo} 
                      alt="ETrack Title Services Logo" 
                      style={{ height: '300px', marginTop: '-140px' }} 
                    />
                </Link>
              <p className="small opacity-75 "  style={{  marginTop: '-90px' }} >
                eTrack Title Services delivers fast, accurate, and compliant title back-office services, helping you close deals faster and reduce risks. Let us handle the details while you focus on growth!
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-6 col-lg-2 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3 text-sky-blue">Quick Links</h5>
              <ul className="list-unstyled small">
                <li>
                    <Link 
                        to="#about" 
                        className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue"
                        onClick={(e) => handleAnchorClick(e, "#about")}
                    >About Us</Link>
                </li>
                
                <li><Link to="/roofing-order-page" className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue">Order Reports</Link></li>
                
                <li>
                    <Link 
                        to="#why" 
                        className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue"
                        onClick={(e) => handleAnchorClick(e, "#why")}
                    >Why Choose eTrack</Link>
                </li>
                <li>
                    <Link 
                        to="#contact" 
                        className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue"
                        onClick={(e) => handleAnchorClick(e, "#contact")}
                    >Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Services Links */}
            <div className="col-6 col-lg-3 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3 text-sky-blue">Services Links</h5>
              <ul className="list-unstyled small">
                <li>
                    <Link 
                        to="/#titleservices" 
                        className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue"
                        onClick={(e) => handleAnchorClick(e, "#titleservices")}
                    >Title Services</Link>
                </li>
                <li>
                    <Link 
                        to="/#mortgageservices" 
                        className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue"
                        onClick={(e) => handleAnchorClick(e, "#mortgageservices")}
                    >Mortgage Services</Link>
                </li>
                <li>
                    <Link 
                        to="/#roofingservices" 
                        className="text-secondary  text-decoration-none mb-2 d-block hover-sky-blue"
                        onClick={(e) => handleAnchorClick(e, "#roofingservices")}
                    >Roofing Reports</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="col-lg-3">
              <h5 className="fw-bold mb-3 text-sky-blue">Contact Us</h5>
              <ul className="list-unstyled small">
                <li className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-sky-blue"></i>21189 Dana CT., Ashburn, VA 20148</li>
                <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-sky-blue"></i>703-880-6311 (Order Desk)</li>
                <li className="mb-2"><i className="bi bi-envelope-fill me-2 text-sky-blue"></i><a href="mailto:orders@etracktitle.com" className="text-secondary  text-decoration-none hover-sky-blue">orders@etracktitle.com</a></li>
                {/* <li className="mt-3"><i className="bi bi-linkedin me-2 text-sky-blue"></i><a href="#" className="text-white text-decoration-none hover-sky-blue">Follow Us on LinkedIn</a></li> */}
              </ul>
            </div>

          </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="container-fluid mt-4 pt-3 border-top border-secondary opacity-75">
          <div className="row small">
            <div className=" text-center">
              © {new Date().getFullYear()}, All rights reserved.
            </div>
          
          </div>
        </div>
      </footer>
    </>
  );
}