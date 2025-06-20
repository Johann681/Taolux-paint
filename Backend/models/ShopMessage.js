import mongoose from "mongoose";

const ShopMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  reason: String,
  orderNumber: String,
  productInfo: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ShopMessage", ShopMessageSchema);
