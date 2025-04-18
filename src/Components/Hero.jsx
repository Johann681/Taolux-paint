import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/img1.jpg"; // Importing your images
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

const images = [img1, img2, img3, img4, img5];

const Hero = () => {
  return (
    <section className="relative h-screen bg-gradient-to-r from-blue-500 to-blue-300">
      {/* Main Content */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to Taolux Paint
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Transform your space with our premium paints.
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a href="/shop">
            <button className="px-8 py-3 text-xl rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 transition-all ease-in-out duration-300">
              Discover Our Collection
            </button>
          </a>
        </motion.div>
      </div>

      {/* Image Placeholder */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img} // Using imported images
            alt={`Image ${index + 1}`}
            className="absolute object-cover w-full h-full opacity-70"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: index * 0.7, // Slower stagger delay for each image
              duration: 2, // Slower duration for smoother animation
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
