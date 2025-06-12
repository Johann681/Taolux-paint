import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { usePaintCart } from "../Context/PaintCart";

const paintSizes = [
  { size: "5L", price: 14000 },
  { size: "10L", price: 25000 },
  { size: "20L", price: 45000 },
];

const paintTypes = ["Gloss", "Satin", "Emulsion", "Matte", "Silk"];

export default function Shop() {
  const [selectedColor, setSelectedColor] = useState("#40BF56");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = usePaintCart();

  const resetSelections = () => {
    setSelectedColor("#40BF56");
    setSelectedType("");
    setSelectedSizes({});
  };

  const updateSizeQuantity = (size, qty) => {
    setSelectedSizes((prev) => {
      const quantity = Math.max(0, qty);
      if (quantity === 0) {
        const updated = { ...prev };
        delete updated[size];
        return updated;
      }
      return {
        ...prev,
        [size]: { quantity },
      };
    });
  };

  const selectedTotal = Object.entries(selectedSizes).reduce((total, [size, { quantity }]) => {
    const pricePerUnit = paintSizes.find((p) => p.size === size)?.price || 0;
    return total + pricePerUnit * quantity;
  }, 0);

  const handleAddToCart = () => {
    if (!selectedType || Object.keys(selectedSizes).length === 0) return;

    const cartItems = Object.entries(selectedSizes).map(([size, { quantity }]) => {
      const price = paintSizes.find((p) => p.size === size)?.price || 0;
      return {
        color: selectedColor,
        type: selectedType,
        size,
        quantity,
        price,
        total: price * quantity,
      };
    });
console.log("👉 Sending to cart:", cartItems);
    addToCart(cartItems);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 relative">
      {showPopup && (
        <div className="fixed top-6 right-6 bg-green-600 text-white py-2 px-4 rounded-lg shadow-md z-50">
          ✅ Paint added to cart!
        </div>
      )}

      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4 bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Customize</h2>
            <button
              onClick={resetSelections}
              className="text-sm text-red-500 hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Color Picker */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Color</h3>
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
            <p className="mt-2 text-sm text-gray-600">
              Selected:{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {selectedColor}
              </span>
            </p>
          </div>

          {/* Paint Type */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Type</h3>
            <div className="flex flex-wrap gap-2">
              {paintTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${
                    selectedType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-700">Summary</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Color:</strong>{" "}
                <span
                  className="inline-block w-4 h-4 rounded-full mr-1 align-middle border"
                  style={{ backgroundColor: selectedColor }}
                ></span>
                {selectedColor}
              </p>
              <p><strong>Type:</strong> {selectedType || "None"}</p>
              {Object.entries(selectedSizes).length > 0 && (
                <div className="space-y-1">
                  <strong>Sizes:</strong>
                  {Object.entries(selectedSizes).map(([size, { quantity }]) => (
                    <p key={size}>
                      {size} × {quantity}
                    </p>
                  ))}
                </div>
              )}
              <p>
                <strong>Total:</strong>{" "}
                <span className="text-blue-600 font-semibold">
                  ₦{selectedTotal.toLocaleString("en-NG")}
                </span>
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedType || Object.keys(selectedSizes).length === 0}
              className={`w-full py-2 mt-2 rounded-md font-semibold transition ${
                selectedType && Object.keys(selectedSizes).length > 0
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </aside>

        {/* Paint Gallery */}
        <section className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {paintSizes.map((bucket) => {
            const isSelected = selectedSizes[bucket.size];
            return (
              <div
                key={bucket.size}
                className={`bg-white rounded-xl shadow-md p-4 transition border-2 ${
                  isSelected ? "border-blue-600" : "border-transparent hover:border-gray-300"
                }`}
              >
                <div
                  className="w-full h-40 rounded-md mb-4 bg-center bg-cover flex items-center justify-center"
                  style={{
                    backgroundColor: selectedColor,
                    backgroundImage: "url(/path-to-bucket-image.jpg)",
                    backgroundBlendMode: "multiply",
                  }}
                >
                  <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded">
                    Preview
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{bucket.size}</h3>
                <p className="text-blue-600 font-bold mb-2">
                  ₦{bucket.price.toLocaleString("en-NG")}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <label htmlFor={`qty-${bucket.size}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    id={`qty-${bucket.size}`}
                    type="number"
                    min="0"
                    value={isSelected ? selectedSizes[bucket.size].quantity : 0}
                    onChange={(e) =>
                      updateSizeQuantity(bucket.size, parseInt(e.target.value) || 0)
                    }
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
