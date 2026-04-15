import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Components ---
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import TitleServices from "./components/TitleServices";
import MortgageServices from "./components/MortgageServices";
import RoofingReports from "./components/RoofingReports";
import WhyChoose from "./components/WhyChoose";
import Contact from "./components/ContactUs.jsx";
import ThankYou from "./components/ThankYou.jsx";
import RoofingOrderForm from "./components/Orderroof";
import Footer from "./components/Footer";
import Cart from "./components/Cartpage.jsx";

// --- Redux & Animations ---
import contactReducer from "./redux/contactSlice";
import useScrollAnimations from "./useScrollAnimations.js";

// --- Styles ---
import "./styles/animations.css";
import "./styles/base.css";
import "./styles/variables.css";

const store = configureStore({
  reducer: { contact: contactReducer },
});

const MainLayout = () => {
  useScrollAnimations();

  return (
    <main>
      <section className="reveal" id="home"><Home /></section>
      <section className="reveal" id="about"><About /></section>
      <section className="reveal" id="title-services"><TitleServices /></section>
      <section className="reveal" id="mortgage-services"><MortgageServices /></section>
      <section className="reveal" id="roofing-reports"><RoofingReports /></section>
      <section className="reveal" id="why-choose"><WhyChoose /></section>
      <section className="reveal" id="contact"><Contact /></section>
    </main>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/roofing-order-page" element={<RoofingOrderForm />} />
          
        </Routes>

        <Footer />

        <button
          id="backToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to Top"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 1000,
            border: "none",
            background: "#0d6efd",
            color: "#fff",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <i className="bi bi-arrow-up-short fs-3"></i>
        </button>
      </Router>
    </Provider>
  );
}
