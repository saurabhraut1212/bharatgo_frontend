import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  FaHeart, FaShoppingCart, FaUser, FaBars, FaPhone, FaTimes, FaSignInAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">MyShop</Link>

        {/* Search Bar
        <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
         
         <h1 className="px-4 py-3 bg-gray-100 border-r">Search</h1>
          <input type="text" placeholder="I'm shopping for..." className="px-4 py-2 w-80 outline-none" />
          <button className="bg-blue-600 px-4 py-4 text-white">
            <FaSearch />
          </button>
        </div> */}

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
                  onClick={() => setIsAuthenticated(false)} 
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

          <Link to="/wishlist" className="relative cursor-pointer">
            <FaHeart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
          </Link>
          <Link to="/cart" className="relative cursor-pointer">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded-full">1</span>
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
              // Handle special case for News & Blogs and Contact Us
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
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">Login</Link>
            )}
          </div>
        </div>
      )}

      {/* Desktop Navigation Links */}
      <div className="hidden md:block bg-gray-100 py-2">
        <div className="container mx-10 flex items-center space-x-15">
          {categories.map((item, index) => {
            // Handle special case for News & Blogs and Contact Us
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
