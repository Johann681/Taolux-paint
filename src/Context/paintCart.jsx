import { createContext, useContext, useState, useEffect } from "react";

const PaintCartContext = createContext();

export const PaintCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("paint-cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("paint-cart", JSON.stringify(cartItems));
    } catch {
      // silently fail if localStorage isn't available
    }
  }, [cartItems]);

  const addToCart = (newItems) => {
    setCartItems((prev) => [
      ...prev,
      ...(Array.isArray(newItems) ? newItems : [newItems]),
    ]);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("paint-cart");
  };

  // Calculate cartCount from cartItems quantity
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <PaintCartContext.Provider value={{ cartItems, addToCart, clearCart, cartCount }}>
      {children}
    </PaintCartContext.Provider>
  );
};

export const usePaintCart = () => useContext(PaintCartContext);