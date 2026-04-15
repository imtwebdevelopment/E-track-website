import React from "react";

/**
 * Shows the final confirmation with the order ID.
 */
const OrderConfirmation = ({ finalOrderDetails, setCartDetails }) => {
  return (
    <div className="container py-5">
      <div className="card p-5 mx-auto text-center" style={{ maxWidth: "600px" }}>
        <h2 className="display-5 mb-3" style={{ color: "var(--brand-blue-dark)" }}>
          <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--brand-sky-accent)" }}></i>
          Order Placed Successfully!
        </h2>

        <p className="lead fw-bold">
          Your Order ID is:{" "}
          <span style={{ color: "var(--brand-blue-mid)" }}>
            {finalOrderDetails?.orderId || "N/A"}
          </span>
        </p>

        <p className="text-muted mb-4">
          A detailed receipt has been sent to your registered email.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => setCartDetails(null)}
          style={{
            backgroundColor: "var(--brand-blue-mid)",
            borderColor: "var(--brand-blue-mid)",
            borderRadius: "8px",
          }}
        >
          <i className="bi bi-house-door me-2"></i>Return to Ordering
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
