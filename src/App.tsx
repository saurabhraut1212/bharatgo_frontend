import { Toaster } from 'react-hot-toast';
import './App.css';
import Signup from './components/Auth/Signup';
import SignIn from './components/Auth/Signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import BlogsPage from './components/Blogs/BlogsPage';
import BlogDetailPage from './components/Blogs/BlogsDetails';
import Contact from './components/Contact/Contact';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import Profile from './components/Auth/Profile';
import Orders from './components/Auth/Orders';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';  // Import the ProtectedRoute component

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster />
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/news-and-blogs" element={<BlogsPage />} />
            <Route path="/news-and-blogs/:id" element={<BlogDetailPage />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            {/* Protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />

            {/* Catch-all route for invalid paths */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
