import { Search, MapPin } from "lucide-react";
import React from "react";
import wedding from "../assets/images/heroimage.png";
import Searchmenu from "./Searchmenu";
import Filterlocation from "./Filterlocation";

function HeroSection() {
  return (
    <div className="relative w-full min-h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden mt-20">
      {/* Background Image with improved filter */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transform scale-105"
        style={{
          backgroundImage: `url(${wedding})`,
          filter: "brightness(40%) contrast(100%)",
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-[1]" />
      
      <div className="relative z-10 w-full px-4 py-10 max-w-7xl mx-auto  mt-36">
        <div className="text-center">
          {/* Improved heading with animation and highlight */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl text-white font-bold mb-6 leading-tight animate-fade-in">
            India's Biggest <span className="text-[#FF5C5C] animate-pulse">Event</span>{" "}
            Management Platform
          </h1>
          
          {/* Enhanced subheading */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto px-4 font-medium">
            Discover and Hire Top-Rated Vendors: Photographers, Makeup Artists,
            Mandap Decorators, Caterers, and More - All in One Place!
          </p>
          
          {/* Improved search container with glass effect */}
          <div className="w-full max-w-4xl mx-auto bg-white/95 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md border border-white/20 transform hover:translate-y-1 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Search component with better spacing */}
              <div className="md:col-span-1">
                <Searchmenu />
              </div>
              
              {/* Location filter with better spacing */}
              <div className="md:col-span-1">
                <Filterlocation />
              </div>
              
              {/* Enhanced button with animation */}
              <div className="w-full flex justify-center">
                <button className="flex items-center justify-center w-full md:w-auto bg-[#FF5C5C] hover:bg-[#FF4040] text-white px-8 py-4 rounded-lg gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-lg">
                  <span>Find Vendor</span>
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Added trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70">
            <div className="flex items-center">
              <span className="text-[#FF5C5C] font-bold mr-2">1000+</span> Verified Vendors
            </div>
            <div className="flex items-center">
              <span className="text-[#FF5C5C] font-bold mr-2">50+</span> Cities
            </div>
            <div className="flex items-center">
              <span className="text-[#FF5C5C] font-bold mr-2">10,000+</span> Happy Customers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;