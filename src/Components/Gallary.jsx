import React, { useState } from "react";

// Living Room images
import livingroom1 from "../assets/livingroom1.jpg";
import livingroom2 from "../assets/livingroom2.jpg";
import livingroom3 from "../assets/livingroom3.jpg";
import livingroom4 from "../assets/livingroom4.jpg";
import livingroom5 from "../assets/livingroom5.jpg";
import livingroom6 from "../assets/livingroom6.jpg";
import livingroom7 from "../assets/livingroom7.jpg";
import livingroom8 from "../assets/livingroom8.jpg";
import livingroom9 from "../assets/livingroom9.jpg";
import livingroom10 from "../assets/livingroom10.jpg";
import livingroom11 from "../assets/livingroom11.jpg";
import livingroom12 from "../assets/livingroom12.jpg";
import livingroom13 from "../assets/livingroom13.jpg";
import livingroom14 from "../assets/livingroom14.jpg";
import livingroom15 from "../assets/livingroom15.jpg";
import livingroom16 from "../assets/livingroom16.jpg";
import livingroom17 from "../assets/livingroom17.jpg";

// Outdoor images
import outdoor1 from "../assets/outdoor1.jpg";
import outdoor2 from "../assets/outdoor2.jpg";
import outdoor3 from "../assets/outdoor3.jpg";
import outdoor4 from "../assets/outdoor4.jpg";
import outdoor5 from "../assets/outdoor5.jpg";
import outdoor6 from "../assets/outdoor6.jpg";
import outdoor7 from "../assets/outdoor7.jpg";
import outdoor8 from "../assets/outdoor8.jpg";
import outdoor9 from "../assets/outdoor9.jpg";
import outdoor10 from "../assets/outdoor10.jpg";
import outdoor11 from "../assets/outdoor11.jpg";

// Kitchen images
import kitchen1 from "../assets/kitchen1.jpg";
import kitchen2 from "../assets/kitchen2.jpg";
import kitchen3 from "../assets/kitchen3.jpg";
import kitchen4 from "../assets/kitchen4.jpg";
import kitchen5 from "../assets/kitchen5.jpg";
import kitchen6 from "../assets/kitchen6.jpg";
import kitchen7 from "../assets/kitchen7.jpg";
import kitchen8 from "../assets/kitchen8.jpg";
import kitchen9 from "../assets/kitchen9.jpg";
import kitchen10 from "../assets/kitchen10.jpg";
import kitchen11 from "../assets/kitchen11.jpg";
import kitchen12 from "../assets/kitchen12.jpg";
import kitchen13 from "../assets/kitchen13.jpg";

// Bedroom images
import bedroom1 from "../assets/bedroom1.jpg";
import bedroom2 from "../assets/bedroom2.jpg";
import bedroom3 from "../assets/bedroom3.jpg";
import bedroom4 from "../assets/bedroom4.jpg";
import bedroom5 from "../assets/bedroom5.jpg";
import bedroom6 from "../assets/bedroom6.jpg";
import bedroom7 from "../assets/bedroom7.jpg";
import bedroom8 from "../assets/bedroom8.jpg";
import bedroom9 from "../assets/bedroom9.jpg";
import bedroom10 from "../assets/bedroom10.jpg";
import bedroom11 from "../assets/bedroom11.jpg";
import bedroom12 from "../assets/bedroom12.jpg";
import bedroom13 from "../assets/bedroom13.jpg";
import bedroom14 from "../assets/bedroom14.jpg";

// Toilet images
import bathroom1 from "../assets/toilet1.jpg";
import bathroom2 from "../assets/toilet2.jpg";
import bathroom3 from "../assets/toilet3.jpg";
import bathroom4 from "../assets/toilet4.jpg";
import bathroom5 from "../assets/toilet5.jpg";
import bathroom6 from "../assets/toilet6.jpg";
import bathroom7 from "../assets/toilet7.jpg";
import bathroom8 from "../assets/toilet8.jpg";

const Gallery = () => {
  const categories = ["Outdoor", "Kitchen", "Bedroom", "Living Room", "Toilet"];
  const [selectedCategory, setSelectedCategory] = useState("Living Room");

  const images = [
    // Living Room
    { src: livingroom1, category: "Living Room" },
    { src: livingroom2, category: "Living Room" },
    { src: livingroom3, category: "Living Room" },
    { src: livingroom4, category: "Living Room" },
    { src: livingroom5, category: "Living Room" },
    { src: livingroom6, category: "Living Room" },
    { src: livingroom7, category: "Living Room" },
    { src: livingroom8, category: "Living Room" },
    { src: livingroom9, category: "Living Room" },
    { src: livingroom10, category: "Living Room" },
    { src: livingroom11, category: "Living Room" },
    { src: livingroom12, category: "Living Room" },
    { src: livingroom13, category: "Living Room" },
    { src: livingroom14, category: "Living Room" },
    { src: livingroom15, category: "Living Room" },
    { src: livingroom16, category: "Living Room" },
    { src: livingroom17, category: "Living Room" },

    // Outdoor
    { src: outdoor1, category: "Outdoor" },
    { src: outdoor2, category: "Outdoor" },
    { src: outdoor3, category: "Outdoor" },
    { src: outdoor4, category: "Outdoor" },
    { src: outdoor5, category: "Outdoor" },
    { src: outdoor6, category: "Outdoor" },
    { src: outdoor7, category: "Outdoor" },
    { src: outdoor8, category: "Outdoor" },
    { src: outdoor9, category: "Outdoor" },
    { src: outdoor10, category: "Outdoor" },
    { src: outdoor11, category: "Outdoor" },

    // Kitchen
    { src: kitchen1, category: "Kitchen" },
    { src: kitchen2, category: "Kitchen" },
    { src: kitchen3, category: "Kitchen" },
    { src: kitchen4, category: "Kitchen" },
    { src: kitchen5, category: "Kitchen" },
    { src: kitchen6, category: "Kitchen" },
    { src: kitchen7, category: "Kitchen" },
    { src: kitchen8, category: "Kitchen" },
    { src: kitchen9, category: "Kitchen" },
    { src: kitchen10, category: "Kitchen" },
    { src: kitchen11, category: "Kitchen" },
    { src: kitchen12, category: "Kitchen" },
    { src: kitchen13, category: "Kitchen" },

    // Bedroom
    { src: bedroom1, category: "Bedroom" },
    { src: bedroom2, category: "Bedroom" },
    { src: bedroom3, category: "Bedroom" },
    { src: bedroom4, category: "Bedroom" },
    { src: bedroom5, category: "Bedroom" },
    { src: bedroom6, category: "Bedroom" },
    { src: bedroom7, category: "Bedroom" },
    { src: bedroom8, category: "Bedroom" },
    { src: bedroom9, category: "Bedroom" },
    { src: bedroom10, category: "Bedroom" },
    { src: bedroom11, category: "Bedroom" },
    { src: bedroom12, category: "Bedroom" },
    { src: bedroom13, category: "Bedroom" },
    { src: bedroom14, category: "Bedroom" },

    // Toilet
    { src: bathroom1, category: "Toilet" },
    { src: bathroom2, category: "Toilet" },
    { src: bathroom3, category: "Toilet" },
    { src: bathroom4, category: "Toilet" },
    { src: bathroom5, category: "Toilet" },
    { src: bathroom6, category: "Toilet" },
    { src: bathroom7, category: "Toilet" },
    { src: bathroom8, category: "Toilet" },
  ];

  const filteredImages = images.filter((image) => image.category === selectedCategory);

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto">
      {/* Category Nav */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={`${selectedCategory} ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No images available for this category.
        </div>
      )}
    </div>
  );
};

export default Gallery;
