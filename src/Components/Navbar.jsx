import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Phone,
  User2,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import peepImg from "../assets/peeps.jpg"; // Make sure this is in your public/assets
import { usePaintCart } from "../Context/PaintCart.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", image: peepImg });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const { cartCount } = usePaintCart();
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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUser({ ...storedUser, image: peepImg });
      setIsLoggedIn(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser({ name: "", image: peepImg });
    setShowLogoutPopup(false);
  };

  const navLinks = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Shop", icon: <ShoppingBag size={18} />, path: "/shop" },
    {
      name: "Contact a Painter",
      icon: <User2 size={18} />,
      path: "/painter-contact",
    },
    { name: "Contact us", icon: <Phone size={18} />, path: "/contact" },
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
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Taolux Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-2xl font-bold text-blue-700 tracking-wide">
            Taolux
          </span>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-700 focus:outline-none"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Desktop Nav */}
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

          {/* Cart Icon */}
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

          {/* User Info */}
          {isLoggedIn ? (
            <li className="flex items-center gap-2">
              <img
                src={user.image}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 font-medium">{user.name}</span>
              <button
                onClick={() => setShowLogoutPopup(true)}
                title="Logout"
                className="text-red-600 hover:text-red-800"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </li>
          ) : (
            <li className="flex gap-3">
              <Link
                to="/login"
                className="px-3 py-1 text-sm bg-gray-800 text-white rounded-full hover:bg-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition"
              >
                Register
              </Link>
            </li>
          )}
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

          {/* Auth Buttons on Mobile */}
          {isLoggedIn ? (
            <li className="flex items-center gap-2 mt-2">
              <img
                src={user.image}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 font-medium">{user.name}</span>
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="text-red-600 hover:text-red-800 ml-auto"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </li>
          ) : (
            <li className="flex gap-2 mt-2">
              <Link
                to="/login"
                className="flex-1 px-3 py-1 text-sm bg-gray-800 text-white rounded-full text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded-full text-center"
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      )}

      {/* 🔥 Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Confirm Logout</h2>
            <p className="text-gray-600 mb-5">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
git 