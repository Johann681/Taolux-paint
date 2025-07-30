import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Gallery from "./Components/Gallary";
import ContactSection from "./Components/Contactsection";
import Shop from "./Components/Shop";
import InspirationSection from "./Components/InspirationSection";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import CheckoutPage from "./Components/Checkout";
import ContactPainter from "./Components/ContactPainter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PaintCartProvider } from "./Context/PaintCart";

import { ToastContainer } from "react-toastify"; // 👈 add
import "react-toastify/dist/ReactToastify.css";  // 👈 import style

const App = () => {
  return (
    <PaintCartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><Gallery /><InspirationSection /></>} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/painter-contact" element={<ContactPainter />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" theme="colored" autoClose={2500} /> {/* 👈 Toast */}
      </Router>
    </PaintCartProvider>
  );
};

export default App;
