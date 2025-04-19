import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";  // Importing Hero component
import Footer from "./Components/Footer"; // Importing Footer component

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./Components/Gallary";
import ContactSection from "./Components/Contactsection";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is always visible */}

      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<><Hero /><Gallery/></>} />

        {/* Route for ContactSection */}
        <Route path="/contact" element={<ContactSection/>} />
      </Routes>

      <Footer /> {/* Footer is always visible */}
    </Router>
  );
};

export default App;
