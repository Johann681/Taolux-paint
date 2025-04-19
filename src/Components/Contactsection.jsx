// components/ContactSection.tsx
import React from "react";

const ContactSection = () => {
  return (
    <section className="pt-25 pb-12 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 border rounded-2xl shadow-lg p-8">
        {/* Left Side: Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-xs text-gray-600">
            For inquiries or support, feel free to reach out.
          </p>

          <div>
            <h3 className="text-sm font-semibold">Call Us</h3>
            <p className="text-xs">Customer Service: <strong>0333 222 7171</strong></p>
            <p className="text-xs text-gray-600">email@loremipsum.com</p>
            <p className="text-xs">Order Support: <strong>0333 222 7676</strong></p>
            <p className="text-xs text-gray-600">ordersupport@loremipsum.com</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">Opening Hours</h3>
            <p className="text-xs">Mon - Fri: 8:30 AM - 5:00 PM</p>
            <p className="text-xs">Sat: 9:00 AM - 12:30 PM</p>
          </div>

          <div className="mt-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-xs"
            >
              Our Commitment to You
            </a>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">Write to Us</h3>
            <p className="text-xs">Lorem Ipsum Customer Care Centre</p>
            <p className="text-xs">123 Ipsum Road, Dolor City, AB1 2CD, United Kingdom</p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <form className="space-y-6 border rounded-xl p-8 shadow-inner bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>

          <div>
            <label className="block text-xs font-medium">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium">Phone Number</label>
            <input
              type="tel"
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium">Reason for Contacting Us <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium">Order Number (if applicable)</label>
            <input
              type="text"
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium">Product Name / Barcode / Batch Number (if available)</label>
            <input
              type="text"
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium">Your Message <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={4}
              className="w-full mt-1 border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-xs"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
