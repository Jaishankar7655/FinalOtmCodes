import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Tag,
  CheckCircle,
  Star,
  ChevronRight,
  Search,
  ArrowUpRight,
} from "lucide-react";

function ServicesList() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const webUrl = "https://backend.onetouchmoments.com/";

  useEffect(() => {
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem("serviceFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // API URL
    const ApiUrl =
      "https://backend.onetouchmoments.com/user_controller/user_services/index_get";

    setIsLoading(true);
    fetch(ApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        console.log("API Response:", fetchedData);
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load services. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("serviceFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Get the first image from comma-separated string
  const getFirstImage = (imageString) => {
    if (!imageString) return null;
    const imageArray = imageString.split(",");
    return imageArray.length > 0 ? `${webUrl}${imageArray[0].trim()}` : null;
  };

  // Toggle favorite state
  const toggleFavorite = (serviceId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(serviceId)
        ? prevFavorites.filter((id) => id !== serviceId)
        : [...prevFavorites, serviceId]
    );
  };

  // Calculate discount percentage
  const calculateDiscount = (mrp, offPrice) => {
    if (!mrp || !offPrice || mrp <= 0) return 0;
    return Math.round(((mrp - offPrice) / mrp) * 100);
  };

  // Filter services based on search term only
  const filteredServices = data.data
    ? data.data.filter((service) =>
        service.firm_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
        >
          <div className="h-60 bg-gray-300"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-16 mt-20">
      {/* Enhanced Header with Gradient and Pattern */}
      <div className=" py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">
            Discover Our Premium Services
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto opacity-90 mb-10">
            Explore a curated selection of exceptional services tailored to
            elevate your experience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="mt-8">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center text-gray-600 bg-white shadow-lg rounded-xl p-12">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="mt-4 text-2xl font-semibold text-gray-600">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 font-medium"
              >
                Try Again
              </button>
            </div>
          ) : filteredServices?.length === 0 ? (
            <div className="text-center text-gray-600 bg-white shadow-lg rounded-xl p-12">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-2xl font-semibold text-gray-600">
                No services found
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 font-medium"
              >
                Show All Services
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 font-medium">
                  Showing {filteredServices.length}{" "}
                  {filteredServices.length === 1 ? "service" : "services"}
                </p>

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
                    Clear search
                  </button>
                )}
              </div>

              {/* Enhanced Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => {
                  const isFavorite = favorites.includes(service.service_id);
                  const imageUrl = getFirstImage(service.images);
                  const discountPercentage = calculateDiscount(
                    service.mrp_price,
                    service.off_price
                  );

                  return (
                    <div key={service.service_id} className="group relative">
                      <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        {/* Favorite Button - Enhanced */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(service.service_id);
                          }}
                          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md transition-all hover:scale-110 hover:bg-white"
                          aria-label={
                            isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>

                        {/* Enhanced Image Container */}
                        <div className="h-64 overflow-hidden relative">
                          <img
                            src={imageUrl}
                            alt={service.firm_name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/500x300?text=Image+Error";
                            }}
                          />
                          {/* Enhanced Badge Styling */}
                          {discountPercentage > 0 && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                              {discountPercentage}% OFF
                            </div>
                          )}
                          {service.is_verified && (
                            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verified
                            </div>
                          )}
                        </div>

                        {/* Enhanced Content */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                              {service.firm_name}
                            </h3>
                            <div className="flex items-center text-gray-600 mt-2">
                              <MapPin className="w-4 h-4 mr-1.5 text-red-500 flex-shrink-0" />
                              <span className="text-sm">
                                {service.city || "Location"},{" "}
                                {service.state || "State"}
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Price Display */}
                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 mr-1.5 text-green-500" />
                              {service.mrp_price > service.off_price ? (
                                <>
                                  <span className="line-through text-gray-400 text-sm mr-2">
                                    ₹{service.mrp_price}
                                  </span>
                                  <span className="font-bold text-lg text-red-600">
                                    ₹{service.off_price}
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold text-lg text-gray-800">
                                  ₹{service.off_price || service.mrp_price}
                                </span>
                              )}
                            </div>
                            {/* Rating Badge */}
                            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1 text-sm font-medium">
                                {service.rating || "4.8"}
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Button */}
                          <Link
                            to={`/servicesdetails?service_id=${
                              service.service_id
                            }&firm_name=${encodeURIComponent(
                              service.firm_name
                            )}&vendor_id=${encodeURIComponent(
                              service.vendor_id
                            )}`}
                            className="flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-500 py-3.5 px-4 text-white font-medium rounded-lg transition-all hover:from-red-700 hover:to-red-600 hover:shadow-md mt-2 group"
                          >
                            View Details
                            <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicesList;
