import React from "react";
import Img3 from "../assets/images/4 Contract Agreement.jpg"; // Corrected import path

export default function About() {
  // REVISED: Using objects to include attractive icons for the badges
  const clients = [
    { name: "Title Companies & Agents", icon: "🏛️" },
    { name: "Lenders & Mortgage Providers", icon: "🏦" },
    { name: "Real Estate Attorneys", icon: "⚖️" },
    { name: "Investors & REITs", icon: "📈" },
    { name: "Underwriters & Settlement Companies", icon: "🤝" },
  ];

  return (
  <section id="about" className="container section-padding reveal">
      <h2 className="display-4 brand-text mb-4 text-center">About eTrack Title Services Inc.</h2>
      
      {/* ------------------------------------------------------------- 
          --- 1. TOP ROW: Text and Image Side-by-Side ---
          ------------------------------------------------------------- */}
      <div className="row align-items-center justify-content-center mb-5">
        
        {/* 1a. Text Content Column (7/12 width on large screens) */}
        <div className="col-lg-7">
          <p className="lead text-center text-lg-start">
            eTrack Title Services Inc. is established to serve as a <strong>true extension of your title company’s operation</strong>.
            With <strong>over 20 years of experience</strong> in the Mortgage and Title industry, we combine deep industry expertise with an unwavering commitment to <strong>accuracy, compliance, and speed</strong>.
          </p>
          <p className="lead text-center text-lg-start">
            We specialize in providing <strong>nationwide title search, abstracting services, and end-to-end mortgage services</strong>.
            Our team delivers <strong>reliable, timely title reports</strong> that help clients <strong>close with confidence</strong>, while maintaining the highest standards of due diligence.
          </p>
          <p className="lead text-center text-lg-start">
            What sets eTrack apart is our ability to offer <strong>scalable, cost-effective support</strong> that adapts to your business. We help title companies reduce operational costs by <strong>up to 40%</strong> through efficient, reliable outsourcing.
          </p>
          <p className="lead text-center text-lg-start">
            Beyond title, we support in-house mortgage services with <strong>end-to-end processing support</strong> across FHA, VA, and Conventional loans—from origination to post-closing audit.
          </p>
        </div>
        
        {/* 1b. Image Column (5/12 width on large screens) */}
        <div className="col-lg-5 mt-4 mt-lg-0 text-center reveal slide-right">
          <img 
            src={Img3} 
            alt="Contract Agreement" 
            className="img-fluid about-section-image" 
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {/* Using brand-bg-light class for better visual integration with your theme */}
          <div className="p-4 rounded shadow-lg text-center brand-bg-light">
            <h5 className="display-6 brand-text mb-4 text-cente">Our Valued Partners</h5>
            <h3 className="h4 mb-4 fw-bold">Who We Serve</h3>
            
            {/* Attractive 5-in-1 Layout on Desktop, 3-in-1 on Tablet, 2-in-1 on Mobile */}
            <div className="row text-center justify-content-center g-3 row-cols-2 row-cols-sm-3 row-cols-lg-5">
              {clients.map((client, i) => (
                <div key={i} className="col">
                  {/* Applying the dedicated 'client-badge-item' class for styling, hover effect, and animation */}
                  <div className="client-badge-item p-3 border rounded-3 reveal fade-zoom">
                    <div className="h3 mb-2">{client.icon}</div>
                    <p className="fw-semibold mb-0">{client.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}