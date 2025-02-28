import React, { useState } from "react";
import { Search, User, Menu, X, ChevronRight } from "lucide-react";
import otm from "../assets/svg/OTM.svg";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Vendor", route: "/Venders" },
    { name: "Register As vender", route: "/VendorLogin" },
    { name: "Profile", route: "/VendorProfile" },
  ];

  return (
    <div className="relative w-full">
      <nav className="w-full px-4 md:px-16 lg:px-32 h-16 flex items-center justify-between shadow-md bg-white">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <img src={otm} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link, id) => (
            <Link
              key={id}
              to={link.route}
              className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Search Icon */}
          <Search
            size={24}
            className="text-[#CC0B0B] hover:text-[#FF4444] cursor-pointer transition-colors duration-300"
          />

          {/* Login Section */}
          <Link to="/UserLogin">
            <div className="hidden lg:flex items-center space-x-2">
              <User
                size={24}
                className="text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300"
              />
              <span className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300">
                Login
              </span>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            {isMenuOpen ? (
              <X
                size={24}
                className="text-[#CC0B0B] cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <Menu
                size={24}
                className="text-[#CC0B0B] cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50 overflow-y-auto`}
      >
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <X
              size={24}
              className="text-[#CC0B0B] cursor-pointer hover:text-[#FF4444] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            {navLinks.map((link, id) => (
              <div key={id} className="border-b border-gray-200 pb-3">
                <Link
                  to={link.route}
                  className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    size={20}
                    className="text-[#CC0B0B] opacity-50"
                  />
                </Link>
              </div>
            ))}

            {/* Mobile Login Section */}
            <div className="flex items-center space-x-3 mt-4">
              <User
                size={24}
                className="text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300"
              />
              <span className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300">
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
