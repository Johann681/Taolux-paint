import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, ShoppingBag, Phone, User2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { usePaintCart } from "../Context/PaintCart"; // ✅ Import your cart context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const { cartCount } = usePaintCart(); // ✅ Use cart count

  const lastScrollY = useRef(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    lastScrollY.current = window.scrollY > 0 ? window.scrollY : 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Shop", icon: <ShoppingBag size={18} />, path: "/shop" },
    { name: "Contact", icon: <Phone size={18} />, path: "/contact" },
    { name: "Contact a Painter", icon: <User2 size={18} />, path: "/painter-contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        showNavbar
          ? "bg-white shadow-lg opacity-100"
          : "bg-white opacity-0 pointer-events-none"
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

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ name, icon, path }) => (
            <li
              key={name}
              className="flex items-center gap-2 relative group text-[17px] font-semibold text-gray-700"
            >
              <span className="flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                {icon}
                <Link to={path}>{name}</Link>
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Cart Icon (Desktop) */}
          <li className="relative">
            <Link to="/cart" className="flex items-center">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white px-6 pt-4 pb-6 space-y-4 shadow-md">
          {navLinks.map(({ name, icon, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="flex items-center gap-2 text-[17px] font-semibold text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {icon} {name}
              </Link>
            </li>
          ))}

          {/* Mobile Cart Icon */}
          <li>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-[17px] font-semibold text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
