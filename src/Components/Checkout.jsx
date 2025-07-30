import React, { useState, useEffect } from "react";
import { usePaintCart } from "../Context/PaintCart.jsx";

const ORDERS_STORAGE_KEY = "paint-orders";
const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxx"; // replace with your real key
const whatsappNumber = "2348012345678";

function saveOrder(order) {
  try {
    const stored = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    stored.push(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(stored));
  } catch (e) {
    console.error("Save failed", e);
  }
}

export default function CheckoutPage() {
  const { cartItems, clearCart } = usePaintCart();
  const [orderName, setOrderName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    setCartTotal(cartItems.reduce((sum, i) => sum + i.total, 0));
  }, [cartItems]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    if (stored.length) setLastOrder(stored[stored.length - 1]);
  }, [orderPlaced]);

  const validateOrder = () => {
    if (orderName.trim().length < 3) return setError("Order name too short");
    if (!email.includes("@")) return setError("Enter a valid email");
    if (!cartItems.length) return setError("Your cart is empty");
    setError(null);
    return {
      id: Date.now(),
      name: orderName.trim(),
      email,
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
      status: "Paid via Paystack",
    };
  };

  const handlePaystackPayment = () => {
    const order = validateOrder();
    if (!order) return;

    const handler = window.PaystackPop?.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: order.email,
      amount: order.total * 100,
      metadata: {
        custom_fields: [{ display_name: "Order Name", value: order.name }],
      },
      callback: () => {
        saveOrder(order);
        clearCart();
        setOrderPlaced(true);
      },
      onClose: () => {
        alert("Payment cancelled");
      },
    });

    if (handler) handler.openIframe();
    else alert("Paystack is not loaded");
  };

  const handleWhatsAppOrder = () => {
    const order = validateOrder();
    if (!order) return;

    saveOrder({ ...order, status: "Manual Payment" });
    clearCart();
    setOrderPlaced(true);

    const message = [
      `Hi, I want to order: "${order.name}"`,
      ...order.items.map(
        (item) =>
          `- ${item.quantity} × ${item.type} (${item.size}) [${item.color}] — ₦${item.total.toLocaleString()}`
      ),
      `Total: ₦${order.total.toLocaleString()}`,
      `Order Date: ${new Date(order.date).toLocaleString()}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (orderPlaced && lastOrder) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed ✅</h1>
        <p className="text-lg text-gray-700">Thank you for choosing Taolux Paints!</p>
        <div className="bg-white mt-6 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-3 text-left">Order Summary</h2>
          <ul className="divide-y text-left text-sm">
            {lastOrder.items.map((item, i) => (
              <li key={i} className="py-2 flex justify-between">
                <span>{item.quantity} × {item.type} ({item.size})</span>
                <span className="text-blue-600">₦{item.total.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-green-700">
            Total: ₦{lastOrder.total.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Order Name *</label>
          <input
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="E.g. Living Room Paint"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="you@example.com"
            type="email"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <ul className="divide-y text-sm border rounded-md">
            {cartItems.map((item, i) => (
              <li key={i} className="py-2 px-3 flex justify-between">
                <span>{item.quantity} × {item.type} ({item.size})</span>
                <span className="text-blue-600">₦{item.total.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-lg font-bold text-green-700">
          Total: ₦{cartTotal.toLocaleString()}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={handlePaystackPayment}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          Pay with Paystack
        </button>
        <button
          onClick={handleWhatsAppOrder}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
        >
          Pay via WhatsApp
        </button>
      </div>
    </div>
  );
}
