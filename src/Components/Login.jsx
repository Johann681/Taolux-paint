// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import livingroom6 from "../assets/livingroom6.jpg"; // You can switch the image if you want

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
      // 🛠 Replace with real API call later
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === form.email
      ) {
        // Fake login logic — just compare email match
        navigate("/");
      } else {
        throw new Error("Invalid credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">Welcome Back</h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          {/* Button with image background */}
          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden h-12 w-full rounded-md bg-cover bg-center transform transition-transform hover:scale-[1.015] focus:outline-none"
            style={{ backgroundImage: `url(${livingroom6})` }}
          >
            <span className="absolute inset-0 bg-black/40" />
            <span className="relative z-10 text-white font-semibold text-lg">
              {loading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
