import React, { useState, useEffect } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("shop-contact");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          reason: "",
          orderNumber: "",
          productInfo: "",
          message: "",
        };
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem("shop-contact", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5000/api/shop-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        localStorage.removeItem("shop-contact");
        setFormData({
          name: "",
          email: "",
          phone: "",
          reason: "",
          orderNumber: "",
          productInfo: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-24 pb-12 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 border rounded-2xl shadow-lg p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-sm text-gray-600">
            We’re here to help. Whether you have a question about an order, need
            product details, or just want to say hello — you’re in the right
            place.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border rounded-xl p-8 shadow-inner bg-gray-50"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a reason</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Order Issue">Order Issue</option>
            <option value="Product Information">Product Information</option>
            <option value="Return / Refund">Return / Refund</option>
          </select>

          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="Order Number (if applicable)"
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="productInfo"
            value={formData.productInfo}
            onChange={handleChange}
            placeholder="Product Name / Barcode / Batch Number"
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Your Message"
            className="w-full text-xs mt-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-xs"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-xs font-medium mt-2">
              Thanks for reaching out! We'll get back to you shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-xs font-medium mt-2">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
