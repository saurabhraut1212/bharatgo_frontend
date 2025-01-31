import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Import the authentication hook

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
  quantity: number; // Include quantity field here
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { cart, addToCart } = useCart();
  const { isAuthenticated } = useAuth(); // Get authentication status from AuthContext

  if (!isOpen || !product) return null;

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
        <img
          src={
            product.images?.[0] ||
            "https://img.freepik.com/premium-vector/no-data-concept-illustration_634196-28497.jpg?w=740"
          }
          alt={product.title}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
        <p className="text-gray-600 mb-4">{product.category?.name}</p>
        <p className="text-gray-800 text-lg mb-4">${product.price}</p>

        <button
          onClick={() => {
            if (isAuthenticated) {
              if (!isInCart) {
                // Add quantity to the product when adding to cart
                addToCart({ ...product, quantity: 1 }); // Default quantity to 1
              }
              onClose();
            }
          }}
          disabled={!isAuthenticated || isInCart} // Disable if not authenticated or already in cart
          className={`px-6 py-2 rounded-lg transition duration-300 mb-4 w-full ${
            !isAuthenticated
              ? "bg-gray-400 cursor-not-allowed"
              : isInCart
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {!isAuthenticated
            ? "Please sign in to add to cart"
            : isInCart
            ? "Already in Cart"
            : "Add to Cart"}
        </button>

        <button
          onClick={onClose}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
