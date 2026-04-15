// CartPage.jsx
import React, { useState, useEffect } from "react";
import CheckoutDetailsPage from "./CheckoutDetailsPage";

// Helper function to reformat the complex order object
const formatCartItemFromOrderDetails = (orderDetails) => {
  const reports = orderDetails?.reports || [];
  const reportNames = reports.map((r) => r.name).join(" + ");
  const finalPrice = parseFloat(orderDetails?.totalPrice || 0);
  const finalQuantity = orderDetails?.quantity || 1;
  const basePrice = finalPrice / finalQuantity;

  return {
    id: 1,
    name:
      reports.length > 0
        ? `Roof Report: ${reportNames}`
        : "Roof Reports For Insurance Claims",
    quantity: finalQuantity,
    price: basePrice,
    details: {
      NameOrClaim: orderDetails?.claimName || "N/A",
      SelectedAddress: orderDetails?.address || "No address provided",
      SelectedReports: reportNames || "N/A",
      NumberOfFacets: orderDetails?.facets || "N/A",
      PrimaryPitch: orderDetails?.primaryPitch || "N/A",
      SecondaryPitch: orderDetails?.secondaryPitch || "Optional",
      Notes: orderDetails?.notes || "No additional notes",
      Expedited: orderDetails?.expedited || false,
      Latitude: orderDetails?.latitude || "N/A",
      Longitude: orderDetails?.longitude || "N/A",
    },
    calculatedTotal: finalPrice.toFixed(2),
  };
};

const CartPage = ({ cartDetails, setCartDetails }) => {
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const initialProductState = cartDetails
    ? formatCartItemFromOrderDetails(cartDetails)
    : { id: 1, name: "No Item in Cart", quantity: 0, price: 0, details: {} };

  const [product, setProduct] = useState(initialProductState);
  const subtotal = (product.price * product.quantity).toFixed(2);
  const total = subtotal;

  useEffect(() => {
    if (cartDetails) {
      setProduct(formatCartItemFromOrderDetails(cartDetails));
      setCheckoutStep("cart");
    } else if (product.quantity > 0) {
      setProduct(initialProductState);
    }
  }, [cartDetails]);

  const handleQuantityChange = (type) => {
    setProduct((prevProduct) => {
      let newQuantity = prevProduct.quantity;
      if (type === "increment") newQuantity++;
      else if (type === "decrement" && newQuantity > 1) newQuantity--;
      const newSubtotal = (prevProduct.price * newQuantity).toFixed(2);
      return {
        ...prevProduct,
        quantity: newQuantity,
        calculatedTotal: newSubtotal,
      };
    });
  };

  const handleProceedToCheckout = () => {
    if (product.quantity > 0) {
      setCheckoutStep("checkout");
      window.scrollTo(0, 0);
    }
  };

  const handleBackToCart = () => {
    setCheckoutStep("cart");
    window.scrollTo(0, 0);
  };

  if (checkoutStep === "checkout") {
    return (
      <CheckoutDetailsPage
        product={product}
        cartDetails={cartDetails}
        onBackToCart={handleBackToCart}
      />
    );
  }

  if (product.quantity === 0) {
    return (
      <div className="container py-5 text-center" style={{ paddingTop: "160px" }}>
        <div
          className="card shadow-lg border-0 p-5 mx-auto"
          style={{
            maxWidth: "500px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
          }}
        >
          <i className="bi bi-cart-x-fill text-muted mb-4" style={{ fontSize: "4rem" }}></i>
          <h2 className="fw-bold text-dark">Your shopping cart is empty.</h2>
          <p className="text-secondary mb-4">
            Please configure and add a roof report to your cart to proceed.
          </p>
          <button
            className="btn btn-primary btn-lg px-4 py-2 fw-bold rounded-pill"
            onClick={() => setCartDetails(null)}
            style={{
              background: "linear-gradient(90deg, #004080, #0073e6)",
              border: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #003366, #005bb5)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #004080, #0073e6)")
            }
          >
            <i className="bi bi-arrow-left me-2"></i> Go to Order Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div
        className="w-100"
        style={{
          background: "linear-gradient(90deg, #00264d, #004080)",
          color: "white",
          padding: "1.5rem 0",
          position: "fixed",
          top: 60,
          zIndex: 1020,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <div className="container text-center">
          <h1
            className="fw-bolder text-uppercase mt-4"
            style={{ fontSize: "1.9rem", letterSpacing: "0.5px" }}
          >
            <i className="bi bi-bag-check-fill me-2"></i> Cart Review
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ backgroundColor: "#f4f6fa" }}>
        <div className="container py-5">
          {/* Progress Bar */}
          <div
            className="d-flex align-items-center justify-content-center flex-wrap p-5 mb-5 rounded-4 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f1f4fa 100%)",
              marginTop: "140px",
            }}
          >
            <span className="d-flex align-items-center me-3" style={{ color: "#003366", fontWeight: "bold" }}>
              <span className="me-2 p-1 px-2 rounded-circle text-white" style={{ backgroundColor: "#003366" }}>1</span>
              SHOPPING CART
            </span>
            <i className="bi bi-chevron-right text-primary mx-3 d-none d-sm-block"></i>
            <span className="d-flex align-items-center me-3" style={{ color: "#999" }}>
              <span className="me-2 p-1 px-2 rounded-circle" style={{ border: "2px solid #ccc" }}>2</span>
              CHECKOUT DETAILS
            </span>
            <i className="bi bi-chevron-right text-muted mx-3 d-none d-sm-block"></i>
            <span className="d-flex align-items-center" style={{ color: "#999" }}>
              <span className="me-2 p-1 px-2 rounded-circle" style={{ border: "2px solid #ccc" }}>3</span>
              ORDER COMPLETE
            </span>
          </div>

          {/* Cart and Summary Two-Column Layout */}
          <div className="row g-4">
            {/* Left Column: Cart Card */}
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div
                  className="card-header border-0 p-4"
                  style={{ background: "linear-gradient(90deg, #003366 0%, #004c99 100%)", color: "white" }}
                >
                  <h4 className="fw-bold mb-0">
                    <i className="bi bi-box-seam me-2"></i> Order Item: <span>{product.name}</span>
                  </h4>
                </div>
                <div className="card-body p-4 bg-white">
                  <div className="row border-bottom pb-4 mb-4 align-items-center">
                    <div className="col-md-7">
                      <h5 className="fw-bold mb-1" style={{ color: "#003366", fontSize: "1.1rem" }}>
                        {product.name}
                        {product.details.Expedited && (
                          <span className="badge bg-danger ms-2">
                            <i className="bi bi-lightning-fill"></i> Expedited
                          </span>
                        )}
                      </h5>
                      <p className="text-muted mb-0" style={{ fontSize: "0.9em" }}>
                        Price per report: ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="col-md-5 d-flex justify-content-end align-items-center mt-3 mt-md-0">
                      <div className="me-4 text-center">
                        <small className="d-block text-secondary mb-1">Quantity</small>
                        <div className="input-group input-group-sm border rounded-pill shadow-sm" style={{ width: "120px" }}>
                          <button
                            className="btn btn-sm btn-light rounded-start-pill"
                            onClick={() => handleQuantityChange("decrement")}
                            disabled={product.quantity <= 1}
                            style={{ border: "none", transition: "0.2s" }}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <input type="text" className="form-control text-center bg-white" value={product.quantity} readOnly />
                          <button
                            className="btn btn-sm btn-light rounded-end-pill"
                            onClick={() => handleQuantityChange("increment")}
                            style={{ border: "none", transition: "0.2s" }}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="text-end">
                        <small className="d-block text-secondary mb-1">Subtotal</small>
                        <h4 className="mb-0 fw-bold text-success">${subtotal}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="row g-4">
                    <div className="col-md-12">
                      <h5 className="fw-bold mb-3 text-secondary">Property & Claim Details</h5>
                      <dl className="row mb-0" style={{ fontSize: "0.95em" }}>
                        <div className="col-sm-12 mb-3">
                          <div className="bg-light p-3 rounded border">
                            <strong className="d-block text-dark mb-1">
                              <i className="bi bi-house-door-fill me-1"></i> Address:
                            </strong>
                            <span className="text-wrap">{product.details.SelectedAddress}</span>
                          </div>
                        </div>
                        <dt className="col-sm-4 fw-bold">
                          <i className="bi bi-list-check me-1"></i> Reports:
                        </dt>
                        <dd className="col-sm-8">{product.details.SelectedReports}</dd>
                        <dt className="col-sm-4 fw-bold">
                          <i className="bi bi-cone me-1"></i> Facets:
                        </dt>
                        <dd className="col-sm-8">{product.details.NumberOfFacets}</dd>
                        <dt className="col-sm-4 fw-bold">
                          <i className="bi bi-graph-up me-1"></i> Pitch:
                        </dt>
                        <dd className="col-sm-8">
                          {product.details.PrimaryPitch} / {product.details.SecondaryPitch}
                        </dd>
                        <dt className="col-sm-4 fw-bold">
                          <i className="bi bi-geo-alt-fill me-1"></i> Latitude:
                        </dt>
                        <dd className="col-sm-8">{product.details.Latitude}</dd>
                        <dt className="col-sm-4 fw-bold">
                          <i className="bi bi-geo-alt-fill me-1"></i> Longitude:
                        </dt>
                        <dd className="col-sm-8">{product.details.Longitude}</dd>
                        <dt className="col-sm-4 fw-bold">
                          <i className="bi bi-chat-dots-fill me-1"></i> Notes:
                        </dt>
                        <dd className="col-sm-8 text-wrap">{product.details.Notes || "N/A"}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-white d-flex justify-content-end gap-3 p-4 border-0">
                  <a
                    href="#"
                    className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setCartDetails(null);
                    }}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Edit Order
                  </a>
                  <a
                    href="#"
                    className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setCartDetails(null);
                    }}
                  >
                    <i className="bi bi-trash me-1"></i> Remove Item
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Fixed Summary */}
            <div className="col-lg-4">
              <div
                className="card shadow-lg p-4 border-0 rounded-4 bg-white"
                style={{
                  position: "sticky",
                  top: "120px", // adjust according to your header height
                }}
              >
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item d-flex justify-content-between px-0 border-0">
                    <span>Subtotal ({product.quantity} items)</span>
                    <span className="fw-bold">${subtotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between px-0 border-0">
                    <span>Shipping/Fees</span>
                    <span className="text-success fw-bold">FREE</span>
                  </li>
                </ul>
                <div className="d-flex justify-content-between mb-4 border-top pt-3">
                  <h4 className="fw-bold text-uppercase">TOTAL DUE</h4>
                  <h3 className="fw-bold text-success">${total}</h3>
                </div>
                <button
                  className="btn btn-lg w-100 fw-bold text-uppercase rounded-pill"
                  style={{
                    background: "linear-gradient(90deg, #28a745, #34d058)",
                    color: "white",
                    boxShadow: "0 4px 20px rgba(40,167,69,0.4)",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.background = "linear-gradient(90deg, #218838, #2ebf6b)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "linear-gradient(90deg, #28a745, #34d058)")
                  }
                  onClick={handleProceedToCheckout}
                >
                  <i className="bi bi-shield-lock-fill me-2"></i> PROCEED TO SECURE CHECKOUT
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill px-4 mt-3 w-100"
                  onClick={() => setCartDetails(null)}
                >
                  <i className="bi bi-arrow-left-short me-1"></i> Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </>
  );
};

export default CartPage;
