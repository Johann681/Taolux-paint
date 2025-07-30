import React, { useState, useEffect } from "react";
import { usePaintCart } from "../Context/PaintCart.jsx";
import { PaystackButton } from "react-paystack";

const ORDERS_STORAGE_KEY = "paint-orders";
const PUBLIC_KEY = "your-paystack-public-key"; // Replace with your actual key

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
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [lastOrder, setLastOrder] = useState(null);
  const [preparedOrder, setPreparedOrder] = useState(null);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const whatsappNumber = "2348012345678";

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    setCartTotal(total);
  }, [cartItems]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    if (orders.length > 0) {
      setLastOrder(orders[orders.length - 1]);
    }
  }, [orderPlaced]);

  const validateOrder = () => {
    const trimmedName = orderName.trim();
    if (trimmedName.length < 3) {
      setError("Order name must be at least 3 characters");
      return null;
    }
    if (!email.includes("@")) {
      setError("Please provide a valid email address");
      return null;
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return null;
    }
    setError(null);
    return {
      id: Date.now(),
      name: trimmedName,
      items: cartItems,
      total: cartTotal,
      email,
      date: new Date().toISOString(),
      status: "Paid via Paystack",
    };
  };

  const handlePaystackCheckout = () => {
    const order = validateOrder();
    if (order) setPreparedOrder(order);
  };

  const paystackConfig = {
    email: email || "guest@example.com",
    amount: cartTotal * 100,
    metadata: { name: orderName.trim() },
    publicKey: PUBLIC_KEY,
    text: "Pay with Paystack",
    onSuccess: () => {
      if (preparedOrder) {
        saveOrder(preparedOrder);
        clearCart();
        setOrderPlaced(true);
        setPreparedOrder(null);
      }
    },
    onClose: () => {
      setShowCancelPopup(true);
    },
  };

  const handleWhatsAppCheckout = () => {
    const order = validateOrder();
    if (!order) return;

    saveOrder({ ...order, status: "Manual Payment" });
    clearCart();
    setOrderPlaced(true);

    const messageLines = [
      `Hi, I would like to place an order named "${order.name}" with the following items:`,
      ...order.items.map(
        (item) =>
          `- ${item.quantity} × ${item.type} (${item.size}) [${item.color}] - ₦${item.total.toLocaleString("en-NG")}`
      ),
      `Total Amount: ₦${order.total.toLocaleString("en-NG")}`,
      `Order Date: ${new Date(order.date).toLocaleString()}`,
      `Please assist with mobile transfer payment. Thank you!`,
    ];
    const encodedMessage = encodeURIComponent(messageLines.join("\n"));
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  if (orderPlaced && lastOrder) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Order Placed Successfully!</h1>
        <p className="text-lg mb-4 text-gray-700">
          Thank you for choosing Taolux Paints. We'll contact you shortly!
        </p>

        <div className="text-left mt-6 bg-white rounded-lg shadow p-5 border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y border rounded-md">
            {lastOrder.items.map((item, i) => (
              <li key={i} className="p-3 flex justify-between text-sm items-center">
                <div>
                  {item.quantity} × {item.type} ({item.size}){" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full border ml-1 align-middle"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <span className="text-blue-600 font-medium">
                  ₦{item.total.toLocaleString("en-NG")}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-green-700 text-lg">
            Total: ₦{lastOrder.total.toLocaleString("en-NG")}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Order Date: {new Date(lastOrder.date).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-4 space-y-3">
        <div>
          <label htmlFor="orderName" className="block font-semibold mb-1">
            Name your order <span className="text-red-600">*</span>
          </label>
          <input
            id="orderName"
            type="text"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            placeholder="E.g. Living room makeover"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email address <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="divide-y border border-gray-300 rounded-md">
            {cartItems.map((item, i) => (
              <li key={i} className="p-3 flex justify-between items-center">
                <div>
                  {item.quantity} × {item.type} ({item.size}){" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full border ml-1 align-middle"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <p className="text-blue-600 font-medium">
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

      <div className="flex flex-col gap-4">
        <PaystackButton
          {...paystackConfig}
          onClick={handlePaystackCheckout}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center transition"
        />
        <button
          onClick={handleWhatsAppCheckout}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-center transition"
        >
          Pay via WhatsApp
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Choose Paystack for secure card or bank transfer. Or use WhatsApp for mobile transfer assistance.
      </p>

      {/* Custom Cancel Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Transaction Cancelled</h2>
            <p className="text-gray-600 mb-5">
              You closed the Paystack payment popup. If that was a mistake, you can try again.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelPopup(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
