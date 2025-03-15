import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Store } from "lucide-react";
import logo from "../assets/home/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Check if user is logged in from session storage
  useEffect(() => {
    const userdata = sessionStorage.getItem("userdata");
    setIsLoggedIn(!!userdata);
  }, []);

  // Control navbar visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollThreshold = 10; // Minimum scroll amount to trigger change

      // Only toggle visibility if scrolled more than threshold
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        // Hide navbar when scrolling down, show when scrolling up
        setVisible(!scrollingDown);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    setIsLoggedIn(false);
    // Redirect to home page after logout
    window.location.href = "/";
  };

  return (
    <div
      className={`fixed left-0 right-0 top-14 z-40 shadow-md bg-red-600 transition-all duration-300 ${
        visible
          ? "transform translate-y-0 opacity-100"
          : "transform -translate-y-full opacity-0"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img className="h-20 py-3" src={logo} alt="One Touch Moments" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-white hover:text-gray-200 font-medium transition-colors duration-200 ${
                location.pathname === "/" ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/About-us"
              className={`text-white hover:text-gray-200 font-medium transition-colors duration-200 ${
                location.pathname === "/About-us" ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              About us
            </Link>

            <Link
              to="/servicesCategory"
              className={`text-white hover:text-gray-200 font-medium transition-colors duration-200 ${
                location.pathname === "/servicesCategory" ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              Services
            </Link>

            <Link
              to="/ContactForm"
              className={`flex items-center space-x-2 text-white hover:text-gray-200 font-medium transition-colors duration-200 ${
                location.pathname === "/ContactForm" ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              <span>Contact us</span>
            </Link>

            
            
            {/* Vendor Portal Link */}
            <Link
              to="/userProfile"
              className="flex items-center space-x-2 text-white hover:text-gray-200 font-medium transition-colors duration-200"
            >
              <Store size={18} />
              <span>Vendor Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-red-600 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <Link
                to="/"
                className="block text-white hover:text-gray-200 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link
                to="/About-us"
                className="block text-white hover:text-gray-200 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </Link>
              
              <Link
                to="/servicesCategory"
                className="block text-white hover:text-gray-200 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>

              <Link
                to="/ContactForm"
                className="block text-white hover:text-gray-200 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </Link>

             

            
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;