import React from "react";
import Img2 from "../assets/images/1 Row Houses.jpg";

export default function WhyChoose() {
  const benefits = [
    { iconClass: "bi bi-award-fill", title: "Proven Expertise", text: "Decades of experience in Title and Mortgage Services." },
    { iconClass: "bi bi-gear-wide-connected", title: "Tailored Solutions", text: "Flexible and Customizable Services to fit your Business needs." },
    { iconClass: "bi bi-cpu-fill", title: "Advanced Technology", text: "Utilizing RPA, AI and Intelligent Data Tools for Efficiency." },
    { iconClass: "bi bi-headset", title: "Exceptional Support", text: "Dedicated Transition Support and Superior Customer Service." },
  ];

  return (
    <section id="why" className="container section-padding bg-white reveal">
      <div className="text-center mb-5">
        <h4 className="fw-bold mb-1 text-danger"><i className="bi bi-star-fill me-2"></i>We are the preferred choice</h4>
        <h2 className="display-4 mb-5 text-center">Why Choose eTrack Title Services?</h2>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-6">
          {benefits.map((b, i) => (
            <div key={i} className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <i className={`${b.iconClass} me-3`} style={{ fontSize: "2rem", color: i % 2 === 0 ? "#2196F3" : "#1565C0" }}></i>
                <h4 className="fw-bold mb-0">{b.title}</h4>
              </div>
              <p className="ms-5 text-muted">{b.text}</p>
            </div>
          ))}
        </div>
        <div className="col-lg-6 text-center">
          <img src={Img2} alt="Team" className="img-fluid rounded shadow-lg" style={{ maxHeight: "450px", objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
