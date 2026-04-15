// // CheckoutFlow.jsx

// import React, { useState } from 'react';
// import CartPage from "./Cartpage"
// import CheckoutDetailsPage from './CheckoutDetailsPage'; 

// const CheckoutFlow = () => {
//     // State to track the current step: 'cart', 'checkout', or 'complete'
//     const [currentStep, setCurrentStep] = useState('cart'); 
    
//     // State to hold the order data passed from your initial order form
//     // Initialize with null or an empty structure, assuming the user starts elsewhere.
//     const [cartDetails, setCartDetails] = useState(null); 
    
//     const handleScrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }

//     // Handlers for step transitions
//     const handleProceedToCheckout = () => {
//         setCurrentStep('checkout');
//         handleScrollToTop();
//     };

//     const handleBackToCart = () => {
//         setCurrentStep('cart');
//         handleScrollToTop();
//     };
    
//     const handlePaymentSuccess = () => {
//         // In a real application, this is where you finalize the order in the backend
//         setCurrentStep('complete');
//         handleScrollToTop();
//     };


//     // Helper function needed for final state rendering (copied from the other pages)
//     const formatCartItemFromOrderDetails = (orderDetails) => {
//         const finalPrice = parseFloat(orderDetails?.totalPrice || 0);
//         const finalQuantity = orderDetails?.quantity || 0;
//         const reportNames = (orderDetails?.reports || []).map(r => r.name).join(' + ');

//         return {
//             calculatedTotal: finalPrice.toFixed(2),
//         };
//     };


//     // --- RENDERING LOGIC ---
    
//     if (!cartDetails || cartDetails.quantity === 0 || cartDetails.totalPrice === "0.00") {
//         return (
//              <div className="container py-5 text-center" style={{paddingTop: '160px'}}>
//                 <i className="bi bi-cart-x-fill text-muted mb-4" style={{ fontSize: '4rem' }}></i>
//                 <h2>Your shopping cart is empty.</h2>
//                 <p className="text-muted">Please configure an order to start the checkout process.</p>
                
//                 {/* Simulated button to add an item (Replace with navigation to your order form) */}
//                 <button 
//                     className="btn btn-lg mt-3" 
//                     onClick={() => setCartDetails({ totalPrice: "42.98", quantity: 2, reports: [{ name: "Residential" }], expedited: true, address: "123 Test St", claimName: "Claim-XYZ", facets: '21-40', primaryPitch: '9/12', secondaryPitch: 'N/A', notes: 'Urgent', uploadedFiles: [{ name: 'file.pdf' }] })} 
//                     style={{ backgroundColor: '#003366', color: 'white' }}
//                 >
//                     Simulate Adding an Item to Cart
//                 </button>
//             </div>
//         );
//     }

//     if (currentStep === 'cart') {
//         return (
//             <CartPage 
//                 cartDetails={cartDetails}
//                 setCartDetails={setCartDetails} 
//                 onProceedToCheckout={handleProceedToCheckout} 
//             />
//         );
//     }

//     if (currentStep === 'checkout') {
//         return (
//             <CheckoutDetailsPage 
//                 orderDetails={cartDetails} 
//                 onBackToCart={handleBackToCart} 
//                 onPaymentSuccess={handlePaymentSuccess} 
//             />
//         );
//     }
    
//     if (currentStep === 'complete') {
//         // Step 3: Order Complete Page
//         return (
//             <div className="container py-5 text-center" style={{backgroundColor: '#f7f9fc', minHeight: '100vh', paddingTop: '160px'}}>
//                 <div className="card shadow-lg border-0 p-5 mx-auto rounded-4" style={{maxWidth: '600px'}}>
//                     <i className="bi bi-check-circle-fill text-success mb-4" style={{ fontSize: '5rem' }}></i>
//                     <h2 className="text-dark fw-bold mb-3">Thank You! Order Placed Successfully.</h2>
//                     <p className="text-secondary mb-4">Your order confirmation will be sent to your email shortly.</p>
//                     <hr/>
//                     <div className="d-flex justify-content-between align-items-center mt-3 p-3 rounded" style={{backgroundColor: '#e9f7ef'}}>
//                         <h5 className="mb-0 text-success fw-bold">TOTAL PAID</h5>
//                         <h3 className="mb-0" style={{color: '#28a745', fontSize: '2.5em'}}>${formatCartItemFromOrderDetails(cartDetails).calculatedTotal}</h3>
//                     </div>
//                     <button 
//                         className="btn btn-primary btn-lg mt-4" 
//                         onClick={() => { setCartDetails(null); setCurrentStep('cart'); }} 
//                         style={{ backgroundColor: '#003366', borderColor: '#003366' }}
//                     >
//                         <i className="bi bi-house-door-fill me-2"></i> Start New Order
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return null; 
// };

// export default CheckoutFlow;