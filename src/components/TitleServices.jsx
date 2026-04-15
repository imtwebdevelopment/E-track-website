import React from "react";

export default function TitleServices() {
const services = [
    { icon: "arrow-right-short", name: "Current Owner Search – Ownership verification and encumbrance check." },
    { icon: "arrow-right-short", name: "Two-Owner Search – Detailed chain of title and property history." },
    { icon: "arrow-right-short", name: "30/40/60-Year Full Searches – Extended Due Diligence for Risk Management." },
    { icon: "arrow-right-short", name: "Lien & Judgment Search – Identify open mortgages, Liens, and Judgments." },
    { icon: "arrow-right-short", name: "Tax Search – Verify taxes, delinquencies, and assessments." },
    { icon: "arrow-right-short", name: "Document Retrieval & Recording – Quick access to Deeds, Mortgages, and Public Records." },
];

const offshore = [
    { icon: "arrow-right-short", name: "Scalable Title Production – From single orders to bulk projects." },
    { icon: "arrow-right-short", name: "Commitment Typing & Data Entry – Fast, accurate document handling." },
    { icon: "arrow-right-short", name: "Quality Review & Verification – Multi-level checks to ensure accuracy." },
    { icon: "arrow-right-short", name: "Cost-Effective Operations – Reduce overhead without sacrificing quality." },
];

  return (
    // CHANGE: Changed back to 'brand-bg' (dark blue)
    <section id="titleservices" className="brand-bg section-padding-lg reveal">
      <div className="container">
        {/* ADDED: 'text-light' to make the title white on the dark background */}
        <h2 className="display-4 mb-5 text-center ">Title Services</h2> 
        
        <div className="row g-4">
          
          {/* Nationwide Title Search Services Card */}
          <div className="col-lg-6 service-card-wrapper">
            <div className="service-card reveal fade-zoom">
              {/* ADDED: 'brand-text' to ensure consistent coloring, will be updated in CSS for light text */}
              <h4 className="fw-bold mb-4 brand-text"> 
                <i className="bi bi-geo-alt-fill me-3"></i> Nationwide Title Search Services
              </h4>
              <ul className="list-unstyled service-list">
                {services.map((s, i) => (
                  <li key={i}>
                    <i className={`bi bi-${s.icon} me-3`}></i>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Offshore Title Support Services Card */}
          <div className="col-lg-6 service-card-wrapper">
            <div className="service-card reveal fade-zoom">
              {/* ADDED: 'brand-text' to ensure consistent coloring, will be updated in CSS for light text */}
              <h4 className="fw-bold mb-4 brand-text">
                <i className="bi bi-globe me-3"></i> Offshore Title Support Services
              </h4>
              <ul className="list-unstyled service-list">
                {offshore.map((s, i) => (
                  <li key={i}>
                    <i className={`bi bi-${s.icon} me-3`}></i>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}