import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://etrackapi.vercel.app/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("✅ Your inquiry has been sent successfully!");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("❌ Failed to send your inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setStatus("❌ Error sending your inquiry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="container section-padding bg-light-section reveal">
      <h2 className="display-4 brand-text mb-4 text-center">Get Started Today</h2>
      <p className="lead text-center mb-5">
        Looking for reliable title search services or mortgage processing? Partner with us for accuracy, speed, and cost efficiency.
      </p>

      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="row shadow-lg rounded-3 overflow-hidden contact-card-wrapper">
            
            {/* Contact Info */}
            <div className="col-lg-6 p-4 contact-info-panel text-white d-flex flex-column" style={{ backgroundColor: "inherit" }}>
              <h3 className="h4 mt-5 text-center fw-bold border-bottom pb-2 border-white text-color">
                ETRACK TITLE SERVICES INC.
              </h3>

              <div className="d-flex align-items-start mb-4 contact-detail-item">
                <i className="bi bi-geo-alt-fill fs-3 me-3 contact-icon text-color"></i>
                <div>
                  <h6 className="fw-bold mb-0 text-uppercase text-color">OFFICE</h6>
                  <p className="mb-0 small text-color">21189 Dana CT.</p>
                  <p className="mb-0 small text-color">Ashburn, VA 20148</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4 contact-detail-item text-color">
                <i className="bi bi-headset fs-3 me-3 contact-icon text-color"></i>
                <div>
                  <h6 className="fw-bold mb-0 text-uppercase text-color">ORDER DESK</h6>
                  <p className="mb-0 small text-color">703-880-6311 (Order Desk)</p>
                  <p className="mb-0 small text-color">703-649-4441 (Inquiries)</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-5 contact-detail-item">
                <i className="bi bi-envelope-fill fs-3 me-3 contact-icon text-color"></i>
                <div>
                  <h6 className="fw-bold mb-0 text-uppercase text-color">EMAIL US</h6>
                  <a href="mailto:orders@etracktitle.com" className="text-color text-decoration-none small hover-sky-accent">
                    orders@etracktitle.com
                  </a>
                </div>
              </div>

              <h6 className="fw-bold mt-auto mb-3 text-center text-uppercase border-top pt-3 border-secondary text-color">
                FIND US ON THE MAP
              </h6>
              <div className="map-embed-container flex-shrink-0 mb-3">
                <iframe
                  src="https://maps.google.com/maps?q=21189%20Dana%20CT.%20Ashburn,%20VA%2020148&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="80%"
                  style={{ border: 0, borderRadius: "5px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ETrack Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-6 p-5 bg-white d-flex flex-column justify-content-center">
              <h3 className="h4 brand-text mb-4 text-center">Send Your Inquiry</h3>

              {status && <p className="text-center mb-3">{status}</p>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (Optional)"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <select
                    name="service"
                    className="form-select"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Service Required --</option>
                    <option value="Title Search/Abstracting">Title Search/Abstracting</option>
                    <option value="Offshore Title Support">Offshore Title Support</option>
                    <option value="Mortgage Processing">Mortgage Processing</option>
                    <option value="Roofing Reports">Roofing Reports</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    className="form-control"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn brand-btn w-100 text-white" disabled={loading}>
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
