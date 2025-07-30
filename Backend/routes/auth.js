// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// 🔐 Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Incorrect password" });

    res.status(200).json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
