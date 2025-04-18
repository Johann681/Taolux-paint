import { useState } from "react";
import { Menu, X, Home, Brush, Image, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Services", icon: <Brush size={18} /> },
    { name: "Gallery", icon: <Image size={18} /> },
    { name: "Contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700 tracking-wide">
          🎨 PaintBro
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-700 focus:outline-none"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        <ul className="hidden md:flex items-center space-x-8 text-[16px] font-medium text-gray-700">
          {navLinks.map(({ name, icon }) => (
            <li key={name} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              {icon}
              <a href={`#${name.toLowerCase()}`}>{name}</a>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-white px-6 pt-4 pb-6 space-y-4 shadow-md">
          {navLinks.map(({ name, icon }) => (
            <li key={name}>
              <a
                href={`#${name.toLowerCase()}`}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {icon} {name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
