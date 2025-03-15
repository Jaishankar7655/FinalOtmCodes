import React, { useState, useEffect } from "react";
import { Mail, PhoneCall, MessageCircle, X } from "lucide-react";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".contact-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const contactOptions = [
    {
      icon: <PhoneCall className="w-5 h-5 text-green-600" />,
      text: "Call Support",
      action: () => window.open("tel:+91 9893919163"),
      bgColor: "bg-gradient-to-r from-blue-100 to-blue-200",
      hoverColor: "hover:from-blue-200 hover:to-blue-300",
    },
    {
      icon: <Mail className="w-5 h-5 text-red-600" />,
      text: "E-mail Support",
      action: () => window.open("mailto: info@onetouchmoments.com"),
      bgColor: "bg-gradient-to-r from-red-100 to-red-200",
      hoverColor: "hover:from-red-200 hover:to-red-300",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-green-600" />,
      text: "Chat Now",
      action: () => window.open("https://wa.me/7318165669"),
      bgColor: "bg-gradient-to-r from-green-100 to-green-200",
      hoverColor: "hover:from-green-200 hover:to-green-300",
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-300" />
      )}

      <div className="contact-container">
        {isOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-80 transform transition-all duration-300 ease-out">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Contact Us
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  {contactOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className={`w-full p-4 rounded-xl ${option.bgColor} ${option.hoverColor} 
                        transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      <div className="flex items-center gap-3">
                        {option.icon}
                        <span className="font-semibold text-gray-700">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          className="fixed bottom-20 right-0 z-50 w-16 h-16 
    bg-gradient-to-r from-green-500 to-green-600
    hover:from-green-600 hover:to-green-700
    text-white rounded-full shadow-lg 
    transition-all duration-300 
    hover:scale-110 focus:outline-none 
    focus:ring-4 focus:ring-green-300 
    active:scale-95 
    flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact Us"
        >
          <PhoneCall className="w-8 h-8 transition-transform duration-300 hover:rotate-12" />
        </button>
      </div>
    </>
  );
};

export default FloatingContactButton;
