import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
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

    // Generate verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      name,
      email,
      password: hashed,
      isVerified: false,
      emailToken,
    });

    await newUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const verifyLink = `https://taolux.vercel.app/verify?token=${emailToken}`;

    await transporter.sendMail({
      to: email,
      from: process.env.MAIL_USER,
      subject: "Verify Your Email - Taolux Paint",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thanks for signing up! Please confirm your email by clicking the link below:</p>
        <a href="${verifyLink}">Verify Email</a>
        <p>If you didn’t request this, you can ignore this email.</p>
      `,
    });

    res.status(201).json({
      message: "Account created. Please check your email to verify.",
    });
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

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email first" });

    res.status(200).json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ Verify Email
router.post("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Verification token missing" });
  }

  try {
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.emailToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("❌ Email Verification Error:", err);
    res.status(500).json({ message: "Email verification failed" });
  }
});

