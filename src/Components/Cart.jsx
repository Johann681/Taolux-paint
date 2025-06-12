import React from "react";
import { usePaintCart } from "../Context/Paintcart.jsx";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, clearCart } = usePaintCart();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((total, item) => total + item.total, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
            <p className="text-lg">Your cart is currently empty.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="font-mono text-sm text-gray-600">{item.color}</span>
                    </div>
                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                      {item.type} - {item.size}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg sm:text-xl font-bold text-blue-600">
                      ₦{item.total.toLocaleString("en-NG")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-8 border-t pt-6 space-y-4">
              <p className="text-2xl font-bold text-gray-800">
                Total: <span className="text-green-600">₦{cartTotal.toLocaleString("en-NG")}</span>
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={clearCart}
                  className="bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition"
                >
                  Clear Cartie
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
