import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const phoneNumber = "08032066606";

  return (
    <footer className="bg-blue-950 text-blue-200 text-xs py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Left */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-blue-100 text-sm">Toaluxe Paintings</h3>
          <p>Luxury painting for classy spaces ✨</p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-blue-400" />
          <a href={`tel:${phoneNumber}`} className="hover:text-blue-300 transition">
            {phoneNumber}
          </a>
          <FaEnvelope className="ml-4 text-blue-400" />
          <a
            href="mailto:toaluxepaintings@gmail.com"
            className="hover:text-blue-300 transition"
          >
            Email Us
          </a>
        </div>

        {/* Right */}
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/toaluxe_paintings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-pink-400 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/toaluxepaintings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>

      <div className="text-center text-[10px] text-blue-500 mt-3">
        &copy; {new Date().getFullYear()} Toaluxe Paintings. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
