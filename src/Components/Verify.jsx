import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "https://taolux-paint.onrender.com"; // your backend

const Verify = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = params.get("token");

      if (!token) {
        setStatus("No token found.");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/verify-email?token=${token}`, {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Verification failed");

        toast.success("✅ Email verified! You can now log in.");
        setStatus("✅ Email verified! Redirecting to login...");

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } catch (err) {
        toast.error(err.message);
        setStatus("❌ Verification failed. " + err.message);
      }
    };

    verifyEmail();
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-blue-700">Email Verification</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Verify;
