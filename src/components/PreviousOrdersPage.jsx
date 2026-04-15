// PreviousOrdersPage.jsx

import React from 'react';

const PreviousOrdersPage = ({ onBack }) => {
    
    // REMOVED: All state and useEffect hooks for loading order history from localStorage

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f7f9fc", paddingTop: "100px" }}>
            <div className="container py-5">
                <h2 className="mb-4 fw-bolder text-uppercase text-dark">
                    <i className="bi bi-list-columns-reverse me-2 text-primary"></i> Order History
                </h2>
                
                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={onBack}
                >
                    <i className="bi bi-arrow-left me-2"></i> Back
                </button>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="alert alert-warning text-center p-4 rounded-3 shadow-sm">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i> 
                            Order History is currently **disabled** on this client to focus solely on email confirmation.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviousOrdersPage;