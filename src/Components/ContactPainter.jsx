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
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message + `\nPhone: ${formData.phone}`,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        console.error(data.error);
      }
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image grid */}
        <div className="grid grid-cols-2 gap-4">
          {[livingroom3, outdoor4, kitchen2, bedroom7, bathroom5].map(
            (img, i) => (
              <img
                key={i}
                src={img}
                alt={`Project ${i}`}
                className="rounded-xl object-cover w-full h-52 sm:h-60 shadow-xl hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            )
          )}
        </div>

        {/* Form & Text */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Let Our Paint Do the Talking 🎨
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            Whether you’re giving your home a facelift, designing a fresh
            workspace, or creating a relaxing atmosphere in your bedroom, our
            expert painters are ready to transform your vision into a stunning
            reality.
          </p>
          <p className="text-gray-600 mb-8">
            Share your ideas with us — from bold accents to calm neutral tones,
            we've got the tools, colors, and passion to bring your space to
            life. Reach out now and get a free consultation within 24 hours!
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 border border-gray-100 transition-all duration-300"
          >
            {/* Name */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+234 801 234 5678"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-800"
              >
                What do you need painted?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your project (rooms, colors, goals)..."
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
            >
              Contact a Painter
            </button>

            {/* Status Message */}
            {status === "success" && (
              <p className="text-green-600 font-medium mt-3">
                ✅ Thanks for reaching out! We’ll be in touch within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-medium mt-3">
                ❌ Please complete all required fields or try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
