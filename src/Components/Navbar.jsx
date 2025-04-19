import { useState, useEffect } from "react";
import { Menu, X, Home, ShoppingBag, Phone } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link
import logo from "../assets/logo.png"; // Assuming your logo image is named 'logo.png' and stored in the assets folder

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility
  let lastScrollY = 0;

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down, hide navbar
      setShowNavbar(false);
    } else {
      // Scrolling up, show navbar
      setShowNavbar(true);
    }
    lastScrollY = window.scrollY > 0 ? window.scrollY : 0; // Update last scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
    };
  }, []);

  const navLinks = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Shop", icon: <ShoppingBag size={18} />, path: "/shop" },
    { name: "Contact", icon: <Phone size={18} />, path: "/contact" }, // Modify for the Contact route
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        showNavbar
          ? "bg-white shadow-lg opacity-100"
          : "bg-white opacity-0 pointer-events-none" // Hide navbar when scrolling up
      } p-4`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Taolux Logo" className="h-8 w-8 object-contain" />
          <span className="text-2xl font-bold text-blue-700 tracking-wide">Taolux</span>
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
          {navLinks.map(({ name, icon, path }) => (
            <li key={name} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              {icon}
              <Link to={path}>{name}</Link> {/* Change from <a> to <Link> */}
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-white px-6 pt-4 pb-6 space-y-4 shadow-md">
          {navLinks.map(({ name, icon, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {icon} {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
