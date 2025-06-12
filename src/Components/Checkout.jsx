import React, { useState, useEffect } from "react";
import { usePaintCart } from "../Context/Paintcart.jsx";

const ORDERS_STORAGE_KEY = "paint-orders";

function saveOrder(order) {
  try {
    const storedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    storedOrders.push(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(storedOrders));
  } catch (err) {
    console.error("Failed to save order", err);
  }
}

export default function CheckoutPage() {
  const { cartItems, clearCart } = usePaintCart();
  const [orderName, setOrderName] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const whatsappNumber = "2348012345678";

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    setCartTotal(total);
  }, [cartItems]);

  const handleConfirm = () => {
    if (!orderName.trim() || orderName.trim().length < 3) {
      setError("Order name must be at least 3 characters");
      return;
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const order = {
      id: Date.now(),
      name: orderName.trim(),
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
      status: "Pending Payment",
    };

    saveOrder(order);
    clearCart();

    const messageLines = [
      `Hi, I would like to place an order named "${order.name}" with the following items:`,
      ...order.items.map(
        (item) =>
          `- ${item.quantity} × ${item.type} (${item.size}) [${item.color}] - ₦${item.total.toLocaleString(
            "en-NG"
          )}`
      ),
      `Total Amount: ₦${order.total.toLocaleString("en-NG")}`,
      `Please assist with mobile transfer payment. Thank you!`,
    ];
    const message = messageLines.join("\n");
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    setIsSubmitting(false);
    setOrderName("");
    setOrderPlaced(true); // Show confirmation message now
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Order Placed Successfully!</h1>
        <p className="text-lg mb-4">
          Your order is being reviewed. You will receive a message within 24 hours.
        </p>
        <p className="text-gray-600">Thank you for shopping with us!</p>
      </div>
    );
  }

  // Normal checkout form UI goes here (your existing form JSX)

  return (
    <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Name Input */}
      <label htmlFor="orderName" className="block mb-2 font-semibold">
        Name your order <span className="text-red-600">*</span>
      </label>
      <input
        id="orderName"
        type="text"
        value={orderName}
        onChange={(e) => setOrderName(e.target.value)}
        placeholder="E.g. Living room makeover"
        className={`w-full border rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        disabled={isSubmitting}
        maxLength={50}
      />
      {error && (
        <p className="text-red-600 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {/* Order Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-300 rounded-md">
            {cartItems.map((item, i) => (
              <li key={i} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {item.quantity} × {item.type} ({item.size}){" "}
                    <span
                      className="inline-block w-4 h-4 rounded-full border ml-1 align-middle"
                      style={{ backgroundColor: item.color }}
                      aria-label={`Color ${item.color}`}
                    />
                  </p>
                </div>
                <p className="font-semibold text-blue-600">
                  ₦{item.total.toLocaleString("en-NG")}
                </p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-lg font-bold text-green-600">
          Total: ₦{cartTotal.toLocaleString("en-NG")}
        </p>
      </section>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={isSubmitting || cartItems.length === 0}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          isSubmitting || cartItems.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        aria-disabled={isSubmitting || cartItems.length === 0}
      >
        {isSubmitting ? "Placing Order..." : "Confirm Order & Pay via WhatsApp"}
      </button>

      <p className="mt-4 text-sm text-gray-600">
        Payment is done via mobile transfer. After placing your order, you will be
        redirected to WhatsApp Business to confirm payment with us now.
      </p>
    </div>
  );
}
