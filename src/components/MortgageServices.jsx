import React from "react";

export default function MortgageServices() {
  const categories = [
    { title: "Loan Origination Support", icon: "bi-file-earmark-text", items: ["Application intake", "Document collection", "Disclosure verification"] },
    { title: "Loan Processing", icon: "bi-send-check", items: ["Pre-underwriting checks", "Employment and income verification", "Credit report analysis"] },
    { title: "Underwriting Support", icon: "bi-clipboard2-data", items: ["Income calculation", "Loan eligibility assessment", "Risk analysis"] },
    { title: "Closing & Post-Closing", icon: "bi-check2-square", items: ["Closing packages", "Post-funding audits", "Trailing document tracking"] },
  ];

  return (
  
    <section id="mortgageservices" className="full-width-section-bg section-padding reveal">
      {/* Use a regular 'container' inside for content alignment and max-width */}
      <div className="container">
        <h2 className="display-4 mb-5 text-center">End-to-End Mortgage Services</h2>
        <div className="row g-4 justify-content-center">
          {categories.map((cat, i) => (
            
            <div key={i} className="col-lg-3 col-md-6 col-sm-12">
              {/* Added shadow-lg for more depth and kept your original classes */}
              <div className="card h-100 shadow-lg border-0 mortgage-card card-hover-light text-center">
                <div className="card-body p-4 d-flex flex-column align-items-center">
                  
                  {/* Icon Wrapper: Now handles the circular background and accent color */}
                  <div className="icon-wrapper">
                    <i className={`bi ${cat.icon}`}></i>
                  </div>
                  
                  <h5 className="fw-bold mb-3 mt-2">{cat.title}</h5>
                  
                  <ul className="list-unstyled service-points text-start w-100">
                    {cat.items.map((item, index) => (
                      <li key={index} className="d-flex align-items-start mb-2">
                        {/* Checkmark icon with your 'brand-sky-accent' color from CSS */}
                        <i className="bi bi-check-circle-fill me-2 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}