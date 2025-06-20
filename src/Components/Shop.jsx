 // Paint type images
 import emulsionImg from "../assets/1.jpg";
 import satinImg from "../assets/2.jpg";
 import glossImg from "../assets/3.jpg";
 import matteImg from "../assets/4.jpg";
 import silkImg from "../assets/5.jpg";
  // Your banner imageg";
  // Bucket previews
  import defaultBucketImg from "../assets/20l.jpg";
  import glossBucketImg from "../assets/3.jpg";
 
  import React, { useState } from "react";
  import bannerImg from "../assets/Taolux.png";


  import { HexColorPicker } from "react-colorful";
  import { usePaintCart } from "../Context/PaintCart";

  const paintTypes = [
    {
      type: "Emulsion",
      description: "Durable and perfect for interior walls.",
      image: emulsionImg,
      price: 20000,
    },
    {
      type: "Satin",
      description: "Smooth finish with subtle shine.",
      image: satinImg,
      price: 120000,
    },
    {
      type: "Gloss",
      description: "High-gloss coating for wood & metal.",
      image: glossImg,
      price: 30000,
    },
    {
      type: "Matte",
      description: "Non-reflective finish great for hiding imperfections.",
      image: matteImg,
      price: 25000,
    },
    {
      type: "Silk",
      description: "Soft sheen finish that’s washable and stylish.",
      image: silkImg,
      price: 18000,
    },
  ];

  const paintQualities = {
    Emulsion: [
      "Durable for interiors",
      "Great wall coverage",
      "Low odor finish",
    ],
    Satin: ["Smooth sheen finish", "Stain resistant", "Easy to clean"],
    Gloss: ["High shine", "Ideal for wood & metal", "Tough protective coat"],
    Matte: ["Non-reflective", "Hides imperfections", "Soft, flat look"],
    Silk: ["Elegant low-gloss", "Washable surface", "Ideal for living spaces"],
  };

  export default function Shop() {
    const [selectedPaintType, setSelectedPaintType] = useState(null);
    const [selectedColor, setSelectedColor] = useState("#40BF56");
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = usePaintCart();

    const selectedPaint = paintTypes.find((p) => p.type === selectedPaintType);
    const total = selectedPaint ? selectedPaint.price * quantity : 0;

    const handleAddToCart = () => {
      if (!selectedPaint) return;
      const item = {
        color: selectedColor,
        type: selectedPaintType,
        size: "20L",
        quantity,
        price: selectedPaint.price,
        total,
      };
      addToCart([item]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
      setSelectedColor("#40BF56");
      setQuantity(1);
    };

    if (!selectedPaintType) {
      return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-24">
          <div
            className="relative w-full h-[400px] md:h-[500px] bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url(${bannerImg})` }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl">
                Shop Paints
              </h1>
            </div>
          </div>

          <div className="px-4 mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Choose a Paint Type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {paintTypes.map((paint) => (
                <div
                  key={paint.type}
                  className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-all"
                >
                  <img
                    src={paint.image}
                    alt={paint.type}
                    className="h-44 mx-auto mb-5 object-contain"
                  />
                  <h3 className="text-xl font-semibold text-gray-700">
                    {paint.type}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {paint.description}
                  </p>
                  <p className="text-blue-600 font-bold mb-4">
                    ₦{paint.price.toLocaleString("en-NG")}
                  </p>
                  <button
                    onClick={() => setSelectedPaintType(paint.type)}
                    className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Customize
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const bucketImg =
      selectedPaintType === "Gloss" ? glossBucketImg : defaultBucketImg;

    return (
      <div className="min-h-screen bg-white pt-24 px-4 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left - Bucket Preview */}
          <div className="flex flex-col justify-center items-center">
            <img
              src={bucketImg}
              alt="Paint Bucket"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Selected Color:
              </p>
              <div className="flex items-center justify-center gap-2">
                <span
                  className="inline-block w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: selectedColor }}
                ></span>
                <span className="font-mono text-gray-800">{selectedColor}</span>
              </div>
            </div>
          </div>

          {/* Right - Customization Options */}
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {selectedPaintType} Paint (20L)
            </h2>

            {/* Color Picker */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Choose a Color
              </h3>
              <HexColorPicker
                color={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Quantity
              </h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {paintQualities[selectedPaintType]?.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-green-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary & Buttons */}
            <div className="pt-4 border-t space-y-4">
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-blue-600">
                  ₦{total.toLocaleString("en-NG")}
                </span>
              </p>
              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedPaintType(null)}
                className="w-full text-center text-blue-500 hover:underline"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed top-6 right-6 bg-green-600 text-white py-2 px-4 rounded-lg shadow-md z-50">
            ✅ Paint added to cart!
          </div>
        )}
      </div>
    );
  }