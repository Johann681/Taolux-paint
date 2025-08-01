import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },    // ✅ added
    emailToken: { type: String, default: null },       // ✅ added
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
