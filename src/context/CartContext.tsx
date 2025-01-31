import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Assuming you have an AuthContext or Auth hook to manage authentication
// For demonstration purposes, let's assume `useAuth` is the hook we use to fetch user data

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
  quantity:number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  isAuthenticated: boolean; // New state to track authentication status
  clearCart: () => void;  
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Assuming you have a useAuth hook that returns the current user and authentication status
  const { user, isAuthenticated } = useAuth(); // Example of how you might manage the user’s state

  // Load cart from localStorage based on logged-in user
  useEffect(() => {
    if (isAuthenticated) {
      // If the user is authenticated, check for the saved cart
      const savedCart = localStorage.getItem(`cart-${user?.email}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      setCart([]); // Clear cart if user is not authenticated
    }
  }, [isAuthenticated, user]);

  // Save cart to localStorage based on user ID (this way, each user gets their own cart)
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart-${user.email}`, JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, user]);

  const addToCart = (product: Product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]); 
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };
  
  const clearCart = () => {
    setCart([]);  // Set cart state to empty
    localStorage.removeItem("cart");  // Remove the cart from localStorage
  };
  const updateQuantity = (productId: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity,clearCart,isAuthenticated }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
