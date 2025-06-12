import React, { useState, useEffect } from "react";

// --- Import all your images (as you had originally) ---

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


// Outdoor images
import outdoor1 from "../assets/outdoor1.jpg";
import outdoor2 from "../assets/outdoor2.jpg";
import outdoor3 from "../assets/outdoor3.jpg";
import outdoor4 from "../assets/outdoor4.jpg";
import outdoor5 from "../assets/outdoor5.jpg";



// Kitchen images
import kitchen1 from "../assets/kitchen1.jpg";
import kitchen2 from "../assets/kitchen2.jpg";
import kitchen3 from "../assets/kitchen3.jpg";
import kitchen4 from "../assets/kitchen4.jpg";
import kitchen5 from "../assets/kitchen5.jpg";


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


// Toilet images
import bathroom1 from "../assets/toilet1.jpg";
import bathroom2 from "../assets/toilet2.jpg";
import bathroom3 from "../assets/toilet3.jpg";
import bathroom4 from "../assets/toilet4.jpg";
import bathroom5 from "../assets/toilet5.jpg";

const Gallery = () => {
  const categories = ["Outdoor", "Kitchen", "Bedroom", "Living Room", "Toilet"];
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  const [loading, setLoading] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);

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
   

    // Outdoor
    { src: outdoor1, category: "Outdoor" },
    { src: outdoor2, category: "Outdoor" },
    { src: outdoor3, category: "Outdoor" },
    { src: outdoor4, category: "Outdoor" },
    { src: outdoor5, category: "Outdoor" },
  
   
    // Kitchen
    { src: kitchen1, category: "Kitchen" },
    { src: kitchen2, category: "Kitchen" },
    { src: kitchen3, category: "Kitchen" },
    { src: kitchen4, category: "Kitchen" },
    { src: kitchen5, category: "Kitchen" },
   

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
   

    // Toilet
    { src: bathroom1, category: "Toilet" },
    { src: bathroom2, category: "Toilet" },
    { src: bathroom3, category: "Toilet" },
    { src: bathroom4, category: "Toilet" },
    { src: bathroom5, category: "Toilet" },
   
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const newImages = images.filter((img) => img.category === selectedCategory);
      setFilteredImages(newImages);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto">
      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading or Images */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : (
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
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
