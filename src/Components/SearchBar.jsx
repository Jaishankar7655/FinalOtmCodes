import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ChevronDown,
  CheckCircle,
  Tag,
  MapPin,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  activeFilter,
  setActiveFilter,
}) => {
  const categories = [
    "All Categories",
    "Dj",
    "Dhol",
    "Makeup",
    "Pandit",
    "And more..",
  ];
  const locations = [
    "All Locations",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Pune",
    "Jaipur",
    "Lucknow",
  ];

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const categoryRef = useRef(null);
  const locationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-4">
      {/* Main Filter Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4">
          <h3 className="font-bold text-lg flex items-center">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </h3>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Services
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filter By Type */}
        <div className="p-4 border-b border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter By Type
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                activeFilter === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50"
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              All Services
            </button>
            <button
              onClick={() => setActiveFilter("verified")}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                activeFilter === "verified"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50"
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verified Only
            </button>
            <button
              onClick={() => setActiveFilter("discount")}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                activeFilter === "discount"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50"
              }`}
            >
              <Tag className="w-4 h-4 mr-2" />
              Discounted Only
            </button>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="p-4 border-b border-gray-100" ref={categoryRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div
            className={`block w-full px-3 py-2 border rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
              showCategoryDropdown
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 hover:border-red-300"
            }`}
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <span className="text-gray-700">{categoryFilter}</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${
                showCategoryDropdown ? "transform rotate-180" : ""
              }`}
            />
          </div>

          {showCategoryDropdown && (
            <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`px-3 py-2 hover:bg-red-50 cursor-pointer ${
                    category === categoryFilter
                      ? "bg-red-50 text-red-600 font-medium"
                      : ""
                  }`}
                  onClick={() => {
                    setCategoryFilter(category);
                    setShowCategoryDropdown(false);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="p-4" ref={locationRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div
            className={`block w-full px-3 py-2 border rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
              showLocationDropdown
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 hover:border-red-300"
            }`}
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-gray-700">{locationFilter}</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${
                showLocationDropdown ? "transform rotate-180" : ""
              }`}
            />
          </div>

          {showLocationDropdown && (
            <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {locations.map((location) => (
                <div
                  key={location}
                  className={`px-3 py-2 hover:bg-red-50 cursor-pointer ${
                    location === locationFilter
                      ? "bg-red-50 text-red-600 font-medium"
                      : ""
                  }`}
                  onClick={() => {
                    setLocationFilter(location);
                    setShowLocationDropdown(false);
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Filters Card */}
      <div className="bg-white rounded-xl shadow-md mt-4 p-4 border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSearchTerm("spa");
              setActiveFilter("all");
            }}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-red-50 hover:text-red-600"
          >
            Photography
          </button>
          <button
            onClick={() => {
              setSearchTerm("salon");
              setActiveFilter("all");
            }}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-red-50 hover:text-red-600"
          >
            Pandit
          </button>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("discount");
            }}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-red-50 hover:text-red-600"
          >
            Best Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
