import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Tag, CheckCircle, Star, Filter, ChevronRight, X } from "lucide-react";
import SearchBar from "../Components/SearchBar";

function ServicesList() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);
  const webUrl = "https://backend.onetouchmoments.com/";

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // API URL from the HTML implementation
    const ApiUrl = "https://backend.onetouchmoments.com/user_controller/user_services/index_get";

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
        setIsLoading(false);
      });
  }, []);

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
  const calculateDiscount = (mrp, offPrice) =>
    Math.round(((mrp - offPrice) / mrp) * 100);

  // Filter services based on search term and active filter
  const filteredServices = data.data
    ? data.data.filter((service) => {
        // Name filter
        const matchesSearch = service.firm_name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Type filter
        let matchesType = true;
        if (activeFilter === "verified") matchesType = service.is_verified;
        if (activeFilter === "discount") matchesType = service.mrp_price > service.off_price;
        
        // Category filter (in a real app, you would have a category field to check)
        const matchesCategory = categoryFilter === "All Categories" || true; // Placeholder logic
        
        // Location filter
        const matchesLocation = locationFilter === "All Locations" || 
                               service.city?.includes(locationFilter) || 
                               service.state?.includes(locationFilter);
        
        return matchesSearch && matchesType && matchesCategory && matchesLocation;
      })
    : [];

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm("");
    setActiveFilter("all");
    setCategoryFilter("All Categories");
    setLocationFilter("All Locations");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4">
            Discover Our Services
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto opacity-90 mb-8">
            Explore a curated selection of premium services tailored to your needs.
          </p>
          
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-center">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 transition-all hover:bg-white/30"
            >
              <Filter className="w-5 h-5 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop: Always visible, Mobile: Toggleable */}
          <div className={`md:block ${showFilters ? 'block' : 'hidden'} transition-all duration-300`}>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
          
          {/* Content Section */}
          <div className="md:col-span-3">            
            <div className="mt-6">
              {isLoading ? (
                <LoadingSkeleton />
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
                    No services match your filters
                  </p>
                  <button 
                    onClick={resetAllFilters}
                    className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 font-medium"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 font-medium">
                      Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
                    </p>
                    
                    {/* Active Filters Display */}
                    <div className="flex flex-wrap gap-2">
                      {(searchTerm || activeFilter !== "all" || categoryFilter !== "All Categories" || locationFilter !== "All Locations") && (
                        <button
                          onClick={resetAllFilters}
                          className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                        >
                          Clear all filters <X className="ml-1 w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            {/* Favorite Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(service.service_id);
                              }}
                              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
                            >
                              <Heart 
                                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                              />
                            </button>

                            {imageUrl && (
                              <div className="h-56 md:h-64 overflow-hidden relative">
                                <img
                                  src={imageUrl}
                                  alt={service.firm_name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {discountPercentage > 0 && (
                                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                    {discountPercentage}% OFF
                                  </div>
                                )}
                                {service.is_verified && (
                                  <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Verified
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="p-5 space-y-3">
                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate group-hover:text-red-600 transition-colors">
                                  {service.firm_name}
                                </h3>
                                <div className="flex items-center text-gray-600 mt-1">
                                  <MapPin className="w-4 h-4 mr-1 text-red-500 flex-shrink-0" />
                                  <span className="text-sm truncate">
                                    {service.city}, {service.state}
                                  </span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <div className="flex items-center">
                                  <Tag className="w-4 h-4 mr-1 text-green-500" />
                                  <span className="line-through text-gray-400 text-sm mr-2">
                                    ₹{service.mrp_price}
                                  </span>
                                  <span className="font-bold text-lg text-red-600">
                                    ₹{service.off_price}
                                  </span>
                                </div>
                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="ml-1 text-sm font-medium">4.8</span>
                                </div>
                              </div>

                              <Link
                                to={`/services/${service.service_id}?firm_name=${encodeURIComponent(service.firm_name)}&vendor_id=${encodeURIComponent(service.vendor_id)}`}
                                className="flex items-center justify-center w-full bg-red-600 py-3 px-4 text-white font-medium rounded-lg transition-all hover:bg-red-700 hover:shadow-md mt-2"
                              >
                                View Details
                                <ChevronRight className="w-4 h-4 ml-1" />
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
      </div>
    </div>
  );
}

export default ServicesList;