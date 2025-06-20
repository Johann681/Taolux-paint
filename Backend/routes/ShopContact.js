import express from "express";
import ShopMessage from "../models/ShopMessage.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    // 1. Save to DB
    const newMessage = new ShopMessage(data);
    await newMessage.save();

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.email,
      to: process.env.MAIL_USER,
      subject: `New Shop Contact from ${data.name}`,
      text: `
New message from the Shop Contact form:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Reason: ${data.reason}
Order Number: ${data.orderNumber}
Product Info: ${data.productInfo}

Message:
${data.message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Saved and emailed successfully!" });
  } catch (err) {
    console.error("Error in /shop-contact:", err);
    res.status(500).json({ error: "Failed to save and/or send email." });
  }
});

export default router;
