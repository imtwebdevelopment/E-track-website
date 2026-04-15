import React from "react";
// 1. Import the useNavigate hook
import { useNavigate } from "react-router-dom"; 

import SampleRpdf from "../assets/Sample Roof Report.pdf"
import SampleWpdf from "../assets/Sample-Wall Report.pdf"

// Helper function to process pricing data (Kept as is)
const parsePricing = (pricing) => {
  return pricing.map(item => {
    // Splits by en-dash "–"
    const parts = item.split(" – "); 
    const name = parts[0];
    const price = parts[1] || null;
    return {
      // Replaces '+ $' with ' ADDON: ' for a cleaner look
      name: name.replace(/ \+\$ /, ' ADDON: ').trim(), 
      price: price ? price.trim() : null,
      isAddon: name.includes('Wall ESX only')
    };
  });
};

export default function RoofingReports() {
  // 3. Initialize the navigate hook
  const navigate = useNavigate();
  
  // CORRECTED: Define a handler function to navigate and force a scroll reset.
  const handleOrderClick = () => {
    // Navigate to the new route
    navigate("/roofing-order-page");
    
    // Force the browser window to scroll to the top immediately.
    window.scrollTo(0, 0);
  };
    
  const products = ["Residential Roof Sketch", "Commercial Roof Reports", "Elevation Measurement Reports", "Multifamily Roof Sketch Reports"];
  const benefits = ["Save Time & Labor Costs", "Improve Accuracy", "Enhance Safety", "Boost Efficiency"];
  
  // CORRECTED: Ensured the last item uses " – " for correct parsing
  const rawPricing = [
    "Residential Standard Roof Sketch (ESX Only) – $12.00",
    "Residential Complex Roof Sketch (ESX Only) – $18.00",
    "Residential Standard Roof Sketch (ESX + PDF) – $18.00",
    "Commercial Roof Sketch (ESX Only) – $20.00",
    "Commercial Roof Sketch (ESX + PDF Only) – $25.00",
    "Wall ESX only <3000sf – $20.00", // Corrected separator to " – " (en dash)
  ];
  
  const pricingData = parsePricing(rawPricing);

  // Define the Sky Blue color style
  const skyBlueStyle = { color: '#00BFFF' }; // A common, vibrant sky blue hex code

  return (
    <section id="roofingservices" className="roofing-bg-section section-padding reveal">
      <div className="container">
        <h2 className="display-4 mb-5 text-center">Aerial Roof Sketch Services </h2>

        {/* --- Product and Benefit Cards --- */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="feature-card-roofing p-4 h-100">
              <h5 className="mb-3 fw-bold"><i className="bi bi-box-seam me-2"></i>Our Products</h5>
              <ul className="list-unstyled why-list-small">
                {products.map((p, i) => <li key={i}><i className="bi bi-check-circle-fill me-2"></i>{p}</li>)}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="feature-card-roofing p-4 h-100">
              <h5 className="mb-3 fw-bold"><i className="bi bi-graph-up-arrow me-2"></i>Why Use Aerial Reports?</h5>
              <ul className="list-unstyled why-list-small">
                {benefits.map((b, i) => <li key={i}><i className="bi bi-check-circle-fill me-2"></i>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* --- Pricing & Order CTA --- */}
        <div className="mt-5 pt-4">
          <h3 className="text-center mb-4 fw-bold text-uppercase">Pricing & Ordering</h3>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Attractive Pricing List Container */}
              <div className="rounded shadow-lg bg-white overflow-hidden">
                <div className="bg-primary text-white p-3 fw-bold text-center">
                  Measurement Report Options
                </div>
                <ul className="list-unstyled p-0 m-0">
                  {pricingData.map((item, i) => (
                    <li 
                      key={i} 
                      // UNIFORM STYLING APPLIED TO ALL ITEMS
                      className={`d-flex justify-content-between align-items-center py-3 px-4 text-dark ${
                        i < pricingData.length - 1 ? 'border-bottom' : ''
                      }`}
                    >
                      <span className="d-flex align-items-center">
                        {/* ICON: Apply the custom skyBlueStyle */}
                        <i className="bi bi-file-earmark-check-fill me-3 fs-5" style={skyBlueStyle}></i>
                        <span className="fw-normal">
                          {item.name}
                        </span>
                      </span>
                      {/* Price is bold and slightly larger */}
                      <span className="price-value fw-bold fs-5">{item.price}</span> 
                    </li>
                  ))}
                </ul>
              </div>

            <div className="mt-4">
                <p className="text-muted text-center mb-1">VIEW SAMPLES (.pdf):</p>
                <div className="text-center">
                  <a 
                    // USE THE IMPORTED VARIABLE HERE
                    href={SampleRpdf} 
                    className="text-decoration-none me-3 brand-text fw-bold "
                    target="_blank" // Recommended: Opens PDF in new tab
                    rel="noopener noreferrer"
                  >
                    ESX Sample Roof Report (PDF)
                  </a>
                   <a 
                    // USE THE IMPORTED VARIABLE HERE
                    href={SampleWpdf} 
                    className="text-decoration-none me-3 brand-text fw-bold "
                    target="_blank" // Recommended: Opens PDF in new tab
                    rel="noopener noreferrer"
                  >ESX Sample Wall Report (PDF)</a>
                </div>
              </div>
              
          <div className="text-center mt-5">
  <div className="card d-inline-block shadow-sm border-0" style={{ maxWidth: "480px" }}>
    <div className="card-body">
      <h5 className="card-title fw-bold text-primary mb-3">
        Ready to Get Your Roof Reports?
      </h5>

      <button
        onClick={handleOrderClick}
        className="btn btn-warning btn-lg px-3 fw-semibold text-dark d-inline-flex align-items-center"
      >
        <i className="bi bi-box-arrow-in-right me-2"></i>
        Order Reports Now
      </button>

      <p className="mt-3 mb-1 fw-semibold text-dark">
        — or —  
      </p>

      <a
        href="https://mail.zoho.com/zm/#compose?to=RoofSketch@etracktitle.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
      >
        <i className="bi bi-envelope-fill me-2"></i>
        Send a request to&nbsp;<strong>RoofSketch@etracktitle.com</strong>
      </a>

      <p className="small text-muted mt-3 mb-0">
        Click either option to start your order and upload project details.
      </p>
    </div>
  </div>
</div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}