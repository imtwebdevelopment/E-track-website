// OrderCompletePage.jsx

import React from "react";

// orderDetails prop is removed
const OrderCompletePage = ({ onBackToHome }) => { 
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f7f9fc", paddingTop: "100px" }}>
            <div className="container text-center">
                <div className="card shadow-lg border-0 rounded-4 p-5 mx-auto" style={{ maxWidth: '600px' }}>
                    
                    <h1 className="text-success mb-4">
                        <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '3rem' }}></i> 
                        Order Request Submitted!
                    </h1>
                    
                    {/* Simplified Message */}
                    <h4 className="mb-3 fw-bold">Thank you for your order request.</h4>
                    <p className="mb-5 text-secondary fs-5">
                        We have received your details and will review the submission. **A member of our team will contact you soon** with a formal quote or invoice via email.
                    </p>
                    {/* End Simplified Message */}

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={onBackToHome}
                        >
                            <i className="bi bi-house-door-fill me-2"></i> Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCompletePage;