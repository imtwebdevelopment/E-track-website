import React from "react";
import { simulateOrderSubmission } from "../utils/orderUtils";

/**
 * Handles payment input and simulates order submission.
 */
const PaymentPage = ({ cartDetails, setFinalOrderDetails, setCheckoutStep }) => {
  const totalPrice = cartDetails?.totalPrice || 0;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const finalDetails = simulateOrderSubmission(cartDetails);
    setFinalOrderDetails(finalDetails);
    setCheckoutStep(2);
  };

  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto shadow-lg rounded-xl" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4" style={{ color: "var(--brand-blue-dark)" }}>
          <i className="bi bi-credit-card-2-front me-2" style={{ color: "var(--brand-sky-accent)" }}></i>
          Payment Information
        </h2>

        <div className="alert alert-info text-center p-3 mb-4 rounded" style={{ backgroundColor: 'var(--section-bg-light)' }}>
          <h4 className="mb-0" style={{ color: 'var(--brand-blue-dark)' }}>
            Total Due: <span style={{ color: 'var(--brand-sky-accent)' }}>${totalPrice.toFixed(2)}</span>
          </h4>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Card Number</label>
            <input type="text" className="form-control" placeholder="**** **** **** ****" required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-medium">Expiration (MM/YY)</label>
              <input type="text" className="form-control" placeholder="MM/YY" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-medium">CVV</label>
              <input type="text" className="form-control" placeholder="123" required />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-medium">Name on Card</label>
            <input type="text" className="form-control" required />
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100"
            style={{
              background: 'var(--brand-sky-accent)',
              color: 'var(--brand-blue-dark)',
              fontWeight: 700,
            }}
          >
            Pay ${totalPrice.toFixed(2)} Securely
          </button>

          <button
            type="button"
            className="btn btn-link mt-3 w-100"
            onClick={() => setCheckoutStep(0)}
            style={{ color: 'var(--brand-blue-mid)', fontWeight: 600 }}
          >
            ← Back to Summary
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
