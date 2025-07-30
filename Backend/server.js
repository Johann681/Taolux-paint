// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

// Routes
import shopContactRoute from "./routes/ShopContact.js";
import authRoutes from "./routes/auth.js"; // 👈 Add this

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🧾 Register/Login Auth Routes
app.use("/api", authRoutes); // 👈 Login/Register

// 🛒 Shop Contact Route (saves to DB + sends mail)
app.use("/api/shop-contact", shopContactRoute);

// 🎨 Painter Contact Route (sends email only)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MAIL_USER,
    subject: `New Painter Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Painter email sent successfully!" });
  } catch (err) {
    console.error("❌ Painter Email Error:", err);
    res.status(500).json({ error: "Painter email failed to send." });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
