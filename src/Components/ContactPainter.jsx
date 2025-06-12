import React, { useState } from "react";

import livingroom3 from "../assets/livingroom3.jpg";
import outdoor4 from "../assets/outdoor4.jpg";
import kitchen2 from "../assets/kitchen2.jpg";
import bedroom7 from "../assets/bedroom7.jpg";
import bathroom5 from "../assets/toilet5.jpg";

export default function ContactPainter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    // TODO: Replace this with your backend POST request to send form data
    console.log("Sending form data to backend...", formData);

    // Fake async success response
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side - images */}
        <div className="grid grid-cols-2 gap-4">
          {[livingroom3, outdoor4, kitchen2, bedroom7, bathroom5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Inspiration"
              className="rounded-lg object-cover w-full h-48 sm:h-56 shadow-lg hover:scale-105 transition-transform"
              loading="lazy"
            />
          ))}
        </div>

        {/* Right side - form + text */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Need a Painter? We’ve Got You Covered 🎨
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Whether it's refreshing your living room, brightening your outdoor
            spaces, or giving your kitchen a vibrant new look, our expert painters
            are ready to bring your vision to life. Reach out now, and get a
            professional painter who delivers quality, on time and within budget.
            Tell us what you need — and get a free consultation within 24 hours!
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your full name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+234 801 234 5678"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-1"
              >
                What do you need painted? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your project in detail..."
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Contact a Painter
            </button>

            {/* Status messages */}
            {status === "success" && (
              <p className="text-green-600 font-medium mt-3">
                Thanks for reaching out! We will get back to you within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-medium mt-3">
                Please fill in all required fields.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
