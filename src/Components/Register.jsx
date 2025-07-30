// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import livingroom7 from "../assets/livingroom7.jpg";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("✅ Register Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("✅ Registered successfully! Proceed to login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">Create Your Account</h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Button styled with background image */}
          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden h-12 w-full rounded-md bg-cover bg-center transform transition-transform hover:scale-[1.015] focus:outline-none"
            style={{ backgroundImage: `url(${livingroom7})` }}
          >
            <span className="absolute inset-0 bg-black/40" />
            <span className="relative z-10 text-white font-semibold text-lg">
              {loading ? "Registering..." : "Register"}
            </span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
