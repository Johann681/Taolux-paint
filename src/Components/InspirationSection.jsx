import React from "react";
import livingroom from "../assets/livingroom2.jpg";
import bathroom from "../assets/toilet3.jpg";
import bedroom from "../assets/bedroom1.jpg";
import outdoor from "../assets/outdoor4.jpg";
import toilet from "../assets/toilet2.jpg";
import woodwork from "../assets/livingroom4.jpg";
import samples from "../assets/toilet5.jpg";
import trending from "../assets/bedroom3.jpg";

const contentBlocks = [
  {
    image: livingroom,
    title: "True Joy™ – Taolux Colour of the Year 2025",
    text: "True Joy™ is a warm, uplifting yellow that inspires creativity, optimism, and pride. Combine it with neutrals or earthy tones to bring energy and balance into your living space.",
    link: "/shop",
    linkLabel: "Discover how to use it →",
  },
  {
    image: bathroom,
    title: "Why Should You Paint?",
    text: "Painting transforms your home. It protects, beautifies, and personalizes every room. With Taolux Paint, you're not just painting walls — you're shaping how your space makes you feel.",
    link: "/about",
    linkLabel: "Why choose Taolux Paint →",
  },
  {
    image: bedroom,
    title: "Zoning with Colour in Multifunctional Rooms",
    text: "Use rich colours to define workspace and soft tones for rest. With the right paint choices, you can make one room feel like many.",
    link: "/tips",
    linkLabel: "Learn to zone with paint →",
  },
  {
    image: outdoor,
    title: "Paint That Stands Up to Nature",
    text: "Sun, rain, wind — Taolux exterior paints are built to resist them all. Our long-lasting finishes keep your walls vibrant through every season.",
    link: "/outdoor",
    linkLabel: "Explore outdoor range →",
  },
  {
    image: toilet,
    title: "Even Small Spaces Deserve Big Colour",
    text: "Make a statement in the smallest rooms. Bold colours can add style and surprise in powder rooms, hallways, and beyond.",
    link: "/ideas",
    linkLabel: "See small space ideas →",
  },
  {
    image: samples,
    title: "Try Before You Paint",
    text: "Not sure about your shade? Use our Peel & Stick samples to test colours directly on your wall — no mess, no pressure.",
    link: "/testers",
    linkLabel: "Explore paint testers →",
  },
  {
    image: trending,
    title: "Trending Colours of 2025",
    text: "Discover the colours that are shaping interiors this year — soft terracottas, bold blues, and warm naturals are leading the way.",
    link: "/trends",
    linkLabel: "See what’s trending →",
  },
  {
    image: woodwork,
    title: "Let’s Make Your Woodwork Wonderful",
    text: "Skirtings, door frames, and furniture deserve attention too. Use Taolux Quick Dry to refresh wood features with ease and elegance.",
    link: "/woodwork",
    linkLabel: "Browse woodwork paint →",
  },
];

const InspirationSection = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-12 lg:px-20 space-y-24">
      {contentBlocks.map((block, index) => (
        <div
          key={index}
          className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2">
            <img
              src={block.image}
              alt={block.title}
              className="rounded-2xl shadow-xl object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
              {block.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{block.text}</p>
            <a
              href={block.link}
              className="inline-block text-blue-600 font-semibold hover:underline transition duration-300"
            >
              {block.linkLabel}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InspirationSection;
