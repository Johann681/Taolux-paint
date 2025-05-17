import React, { useState } from "react";

const paintTypes = ["Gloss", "Satin", "Emulsion"];
const paintSizes = ["1L", "2.5L", "5L", "10L"];
const presetColors = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
];

export default function PaintShopWithNavbar() {
  const [hue, setHue] = useState(45);
  const [selectedColor, setSelectedColor] = useState(`hsl(${hue}, 100%, 50%)`);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState("1L");
  const [quantity, setQuantity] = useState(1);

  const handleHueChange = (e) => {
    const newHue = e.target.value;
    setHue(newHue);
    setSelectedColor(`hsl(${newHue}, 100%, 50%)`);
  };

  const getSizeScale = () => {
    switch (selectedSize) {
      case "1L": return 60;
      case "2.5L": return 90;
      case "5L": return 120;
      case "10L": return 150;
      default: return 60;
    }
  };

  const calculatePrice = () => {
    const basePrice = 4000;
    const sizeMultiplier = {
      "1L": 1,
      "2.5L": 2.4,
      "5L": 4.5,
      "10L": 8.5,
    };
    const discountRate = 0.1; // 10% discount
    const fullPrice = basePrice * sizeMultiplier[selectedSize] * quantity;
    const discounted = fullPrice - fullPrice * discountRate;
    return discounted.toLocaleString("en-NG", { style: "currency", currency: "NGN" });
  };

  const sizeScale = getSizeScale();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-15">
      <main className="flex flex-col lg:flex-row flex-1 gap-8 p-6">

        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md space-y-8">
          <h2 className="text-xl font-bold mb-4">Choose a Color</h2>

          <div className="grid grid-cols-4 gap-3 border p-3 rounded-md">
            {presetColors.map((color) => (
              <button
                key={color.hex}
                aria-label={color.name}
                onClick={() => setSelectedColor(color.hex)}
                className={`w-10 h-10 rounded-full border-4 transition ${
                  selectedColor === color.hex ? "border-black" : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2">Fine-tune Hue</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={handleHueChange}
              className="w-full"
            />
            <div className="mt-3 w-full h-10 rounded-md border" style={{ backgroundColor: selectedColor }}></div>
            <p className="mt-2 text-center text-sm">{selectedColor.toUpperCase()}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Select Paint Type</h2>
            <div className="flex flex-col gap-3">
              {paintTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    selectedType === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Middle Section */}
        <section className="w-full lg:flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-6">Choose Paint Size</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {paintSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-3 rounded-md font-semibold transition ${
                  selectedSize === size ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Paint Bucket Preview */}
          <div className="flex flex-col items-center">
            <div
              className="relative flex justify-center items-end border-4 border-gray-700 rounded-b-full overflow-hidden shadow-lg"
              style={{
                width: `${sizeScale}px`,
                height: `${sizeScale * 1.5}px`,
                backgroundColor: "#f0f0f0",
              }}
            >
              <div
                className="w-full absolute bottom-0 rounded-t-full"
                style={{
                  height: "50%",
                  backgroundColor: selectedColor,
                  transition: "background-color 0.3s ease",
                }}
              ></div>
            </div>
            <p className="mt-4 text-lg font-semibold">{selectedSize} Paint Can</p>
            <p className="mt-1 text-gray-600">Color: {selectedColor.toUpperCase()}</p>
            <p className="mt-1 text-gray-600">Paint Type: {selectedType || "None selected"}</p>
            <div className="mt-4 flex items-center gap-3">
              <label className="font-semibold">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border px-2 py-1 rounded-md"
              />
            </div>
          </div>
        </section>

        {/* Right Sidebar - Add to Cart */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center space-y-6 mt-6 lg:mt-0">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <p><strong>Color:</strong> {selectedColor.toUpperCase()}</p>
          <p><strong>Paint Type:</strong> {selectedType || "None"}</p>
          <p><strong>Size:</strong> {selectedSize}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Total Price:</strong> {calculatePrice()}</p>

          <button
            disabled={!selectedColor || !selectedType}
            className={`w-full py-3 rounded-md font-semibold transition ${
              !selectedColor || !selectedType
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            onClick={() => alert("Added to cart!")}
          >
            Add to Cart
          </button>
        </aside>
      </main>
    </div>
  );
}