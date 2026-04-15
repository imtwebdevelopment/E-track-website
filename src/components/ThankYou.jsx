import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <section className="container section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="col-lg-8">
        <div className="text-center p-5 bg-white rounded shadow-lg border border-success">
          <h1 className="display-3 text-success mb-4"><i className="bi bi-check-circle-fill"></i></h1>
          <h2 className="display-4 brand-text mb-3">Thank You!</h2>
          <p className="lead mb-4">
            Your inquiry has been successfully sent. We value your interest in our services.
          </p>
          <p className="lead mb-5">
            **We will contact you back soon!**
          </p>
          {/* Use React Router's Link for internal navigation */}
          <Link to="/" className="btn brand-btn text-white mt-3">
            Return to Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}