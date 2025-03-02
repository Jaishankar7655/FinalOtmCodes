import React, { useState, useEffect, useRef } from "react";
import { Search, User, Menu, X, ChevronRight, PersonStandingIcon, User2, UserCog2Icon, CircleUserRound, LogOut } from "lucide-react";
import otm from "../assets/svg/OTM.svg";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkUserAuth = () => {
      const storedUserData = sessionStorage.getItem("userData");
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setIsLoggedIn(true);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsLoggedIn(false);
          setUserData(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    // Check on initial load
    checkUserAuth();

    // Set up event listener to check when storage changes
    window.addEventListener('storage', checkUserAuth);
    
    // Custom event for login/logout
    window.addEventListener('userAuthChanged', checkUserAuth);
    
    return () => {
      window.removeEventListener('storage', checkUserAuth);
      window.removeEventListener('userAuthChanged', checkUserAuth);
    };
  }, []);

  // Function to handle clicks outside the sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      // Close the menu if click is outside the sidebar and not on the menu toggle button
      if (
        isMenuOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
      
      // Close the user menu if click is outside
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  const handleLogout = () => {
    // Clear user data from session and local storage
    sessionStorage.removeItem("userData");
    localStorage.removeItem("userData");
    
    // Update state
    setIsLoggedIn(false);
    setUserData(null);
    setIsUserMenuOpen(false);
    
    // Dispatch custom event
    window.dispatchEvent(new Event('userAuthChanged'));
    
    navigate("/");
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navLinks = [
    { name: "Vendor", route: "/Vendors" },
    { name: "Register As vender", route: "/VendorLogin" },
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
          {/* User Icon with Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button 
              className="text-red-600 font-semibold focus:outline-none"
              onClick={toggleUserMenu}
            >
              <CircleUserRound size={24} />
            </button>
            
            {/* User Menu Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                {isLoggedIn ? (
                  <>
                    {userData && (
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        Signed in as<br />
                        <span className="font-medium">{userData.user_email || "User"}</span>
                      </div>
                    )}
                    <Link
                      to="/UserProfile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User2 size={16} className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/UserLogin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Login/Profile Section for Desktop (Hidden when mobile) */}
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link to="/UserProfile" className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300 flex items-center">
                  <User2 size={24} className="mr-1" />
                  <span>Profile</span>
                </Link>
              </div>
            ) : (
              <Link to="/UserLogin">
                <div className="flex items-center space-x-2">
                  <User
                    size={24}
                    className="text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300"
                  />
                  <span className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300">
                    Login
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden" ref={menuButtonRef}>
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
        ref={sidebarRef}
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

          {/* User Info if logged in */}
          {isLoggedIn && userData && (
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <CircleUserRound size={40} className="text-[#CC0B0B]" />
                <div>
                  <p className="font-medium">{userData.user_name || "User"}</p>
                  <p className="text-sm text-gray-500">{userData.user_email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            {navLinks.map((link, id) => (
              <div key={id} className="border-b border-gray-200 pb-3">
                <Link
                  to={link.route}
                  className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300 flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    size={20}
                    className="text-[#CC0B0B] opacity-50"
                  />
                </Link>
              </div>
            ))}

            {/* Mobile User Options */}
            {isLoggedIn ? (
              <>
                <div className="border-b border-gray-200 pb-3">
                  <Link
                    to="/UserProfile"
                    className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300 flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Profile</span>
                    <ChevronRight
                      size={20}
                      className="text-[#CC0B0B] opacity-50"
                    />
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300 flex items-center justify-between w-full"
                  >
                    <span>Logout</span>
                    <LogOut size={20} className="text-[#CC0B0B] opacity-50" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 mt-4">
                <Link
                  to="/UserLogin"
                  className="flex items-center space-x-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User
                    size={24}
                    className="text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300"
                  />
                  <span className="text-xl text-[#CC0B0B] hover:text-[#FF4444] transition-colors duration-300">
                    Login
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;