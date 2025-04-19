import React from "react";

const products = [
  {
    id: 1,
    name: "Sunset Glory",
    image: "https://via.placeholder.com/400x300.png?text=Sunset+Glory",
    price: "₦15,000",
    category: "Landscape",
  },
  {
    id: 2,
    name: "Urban Rhythm",
    image: "https://via.placeholder.com/400x300.png?text=Urban+Rhythm",
    price: "₦20,000",
    category: "Cityscape",
  },
  {
    id: 3,
    name: "Mystic Flow",
    image: "https://via.placeholder.com/400x300.png?text=Mystic+Flow",
    price: "₦18,500",
    category: "Abstract",
  },
];

export default function Shop() {
  return (
    <div className="bg-gradient-to-b from-pink-100 to-yellow-50 min-h-screen p-6  mb-15">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 mt-25">
        Philosopher's Paint Shop
      </h1>

      {/* Product Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-md transform transition duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-lg font-bold text-pink-600 mb-4">
                {product.price}
              </p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-full">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
