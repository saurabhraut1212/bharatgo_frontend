import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Assuming this context handles user auth

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    if (!user) {
      alert("You need to be logged in to proceed with checkout.");
      return;
    }

    // Create order object
    const order = {
      userId: user.uid,
      date: new Date().toISOString(),
      total: totalAmount,
      items: cart.map((product) => `${product.title} (x${product.quantity})`),
    };

    // Fetch existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // Add the new order to the orders array
    existingOrders.push(order);

    // Store the updated orders in localStorage
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear the cart after successful order placement
    clearCart();

    alert("Order placed successfully!");
  };

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(newTotal);
  }, [cart]);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg flex flex-col sm:flex-row sm:gap-8 items-center sm:items-start"
            >
              <img
                src={product.images[0] || "https://via.placeholder.com/100"}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-md mb-4 sm:mb-0"
              />

              <div className="flex flex-col justify-center sm:ml-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="w-16 p-1 border rounded-md"
                    min="1"
                  />
                  <span>Total: ${product.price * product.quantity}</span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 sm:ml-auto mt-4 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-lg font-semibold">
        <span>Total Amount: ${totalAmount}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}  // Disable button if cart is empty
        className={`mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg w-full sm:w-auto ${cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
