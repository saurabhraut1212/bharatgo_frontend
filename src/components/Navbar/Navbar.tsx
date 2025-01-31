import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  FaShoppingCart, FaUser, FaBars, FaPhone, FaTimes, FaSignInAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";  // Import the useAuth hook

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { isAuthenticated, logOut } = useAuth(); // Use the authentication hook to get the auth state and logout function
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "All",
    "Clothes", 
    "Electronics", 
    "Furniture", 
    "Shoes", 
    "Miscellaneous", 
    "News & Blogs", 
    "Contact Us",
  ];

  const formatCategory = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, "-");
  };

  const handleLogout = () => {
    logOut(); // Call logOut from AuthContext
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">MyShop</Link>

        {/* Contact & Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaPhone />
            <span className="text-sm">+91 9359195396</span>
          </div>

          {isAuthenticated ? (
            <div className="relative group">
              <FaUser className="text-xl cursor-pointer" />
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg py-2 right-0 w-40">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}

          <Link to="/cart" className="relative cursor-pointer">
            <FaShoppingCart className="text-xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 py-3">
          <div className="flex flex-col items-center space-y-4">
            {categories.map((item, index) => {
              if (item === "News & Blogs") {
                return (
                  <Link 
                    key={index} 
                    to="/news-and-blogs" // Link to the News & Blogs page
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                );
              } else if (item === "Contact Us") {
                return (
                  <Link 
                    key={index} 
                    to="/contact-us" // Link to the Contact Us page
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                );
              } else {
                return (
                  <Link 
                    key={index} 
                    to={`/${formatCategory(item)}`} 
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                );
              }
            })}

            {!isAuthenticated && (
              <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">Login</Link>
            )}
          </div>
        </div>
      )}

      {/* Desktop Navigation Links */}
      <div className="hidden md:block bg-gray-100 py-2">
        <div className="container mx-10 flex items-center space-x-15">
          {categories.map((item, index) => {
            if (item === "News & Blogs") {
              return (
                <Link 
                  key={index} 
                  to="/news-and-blogs" // Link to the News & Blogs page
                  className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  {item}
                </Link>
              );
            } else if (item === "Contact Us") {
              return (
                <Link 
                  key={index} 
                  to="/contact-us" // Link to the Contact Us page
                  className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  {item}
                </Link>
              );
            } else {
              return (
                <Link 
                  key={index} 
                  to={`/${formatCategory(item)}`} 
                  className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  {item}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
