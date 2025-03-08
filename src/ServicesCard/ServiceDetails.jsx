import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  FileImage,
  FileVideo,
  MapPin,
  Mail,
  Tag,
  CheckCircle,
  DollarSign,
  ChevronLeft,
  AlertCircle,
  Clock,
  Star,
  Share2,
  Heart,
} from "lucide-react";

// Custom hook for service details fetching with query parameters
const useServiceDetails = (id) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const webUrl = "https://backend.onetouchmoments.com/";
  const location = useLocation();
  
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        // Get query parameters from URL
        const queryParams = new URLSearchParams(location.search);
        const firmName = queryParams.get('firm_name');
        const vendorId = queryParams.get('vendor_id') || id;
        
        if (!firmName) {
          throw new Error("Firm name not provided in URL");
        }
        
        // Construct API URL similar to HTML implementation
        const ApiUrl = `${webUrl}user_controller/Service/index_get?data=${encodeURIComponent(firmName)}&vendor_id=${encodeURIComponent(vendorId)}`;
        
        const response = await fetch(ApiUrl);
        
        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }

        const data = await response.json();
        console.log("Service Details API Response:", data);

        if (!data.data || data.data.length === 0) {
          throw new Error("No service found");
        }

        setService(data.data[0]); // Using first record as shown in HTML implementation
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id, webUrl, location.search]);

  return { service, loading, error, webUrl };
};

// Service Details Component
function ServiceDetails() {
  const { id } = useParams();
  const { service, loading, error, webUrl } = useServiceDetails(id);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [liked, setLiked] = useState(false);

  // Function to handle main image and thumbnail gallery setup
  useEffect(() => {
    if (service?.images) {
      const imageArray = service.images.split(",").filter((img) => img.trim());
      if (imageArray.length > 0) {
        setMainImage(`${webUrl}${imageArray[0].trim()}`);
      }
    }
  }, [service, webUrl]);

  // Share handler function
  const ShareHandle = () => {
    // Share functionality to be implemented
    alert("Share functionality to be implemented");
  };

  // Function to render thumbnail images
  const renderThumbnails = () => {
    if (!service?.images) return null;
    const imageArray = service.images.split(",").filter((img) => img.trim());

    // Only show first 3 thumbnails with a "+X more" option if more exist
    const displayImages = imageArray.slice(0, 3);

    return (
      <div className="flex justify-between items-center mt-2">
        {displayImages.map((imagePath, index) => (
          <div
            key={`thumb-${index}`}
            className="cursor-pointer relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            onClick={() => setMainImage(`${webUrl}${imagePath.trim()}`)}
          >
            <img
              src={`${webUrl}${imagePath.trim()}`}
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-20 object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}

        {imageArray.length > 3 && (
          <div
            className="w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-semibold cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setSelectedMedia(`${webUrl}${imageArray[3].trim()}`)}
          >
            +{imageArray.length - 3} more
          </div>
        )}
      </div>
    );
  };

  // Skeleton loader
  const SkeletonLoader = () => (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 pr-0 md:pr-6">
          <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
          <div className="flex justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 w-24 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 mt-6 md:mt-0">
          <div className="h-10 bg-gray-300 w-3/4 mb-4 rounded-lg"></div>
          <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-300 w-1/3 mb-4 rounded-lg"></div>
          <div className="h-12 bg-gray-300 rounded-lg mt-8"></div>
        </div>
      </div>
    </div>
  );

  // Error Component
  const ErrorDisplay = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-red-600 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 max-w-md">{message}</p>
      <Link
        to="/services"
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg 
        hover:bg-red-600 transition-colors flex items-center"
      >
        <ChevronLeft className="mr-2" /> Back to Services
      </Link>
    </div>
  );

  // Media Modal
  const MediaModal = () => {
    if (!selectedMedia) return null;

    const isVideo = selectedMedia.includes(".mp4");

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center 
        items-center p-4 cursor-pointer"
        onClick={() => setSelectedMedia(null)}
      >
        <div
          className="max-w-5xl max-h-screen w-full rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <video
              controls
              autoPlay
              className="w-full h-auto max-h-[90vh] object-contain"
            >
              <source src={selectedMedia} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={selectedMedia}
              alt="Selected media"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </div>
      </div>
    );
  };

  // Main render
  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay message={error} />;
  if (!service) return <ErrorDisplay message="Service not found" />;

  // Extract data from service object
  const firmName = service.firm_name;
  const description = service.description || "No description available";
  const price = service.off_price || service.price || "0";
  const originalPrice = service.mrp_price || "";
  const city = service.city || "";
  const state = service.state || "";

  // Calculate discount if applicable
  const discountPercentage = originalPrice && price 
    ? Math.round((1 - (parseFloat(price) / parseFloat(originalPrice))) * 100) 
    : 0;

  // Use the first image from service or fallback to placeholder
  const displayMainImage = mainImage || 
    "https://www.susanshek.com/wp-content/uploads/2019/10/the-plaza-hotel-wedding-susan-shek-2019.jpg";

  return (
    <>
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200 my-10 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <Link
            to="/services"
            className="inline-flex items-center text-red-600 hover:text-red-800
            transition-colors text-sm font-medium"
          >
            <ChevronLeft className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="flex items-center space-x-3">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={ShareHandle}
            >
              <Share2 size={18} className="text-gray-500" />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                liked ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setLiked(!liked)}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Left column - Images */}
          <div className="md:w-1/3 w-full p-4">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-full h-64 object-cover"
                src={displayMainImage}
                alt="Service main"
                onClick={() => setSelectedMedia(displayMainImage)}
              />
              {discountPercentage > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {renderThumbnails()}
          </div>

          {/* Right column - Details */}
          <div className="md:w-2/3 w-full p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{firmName}</h1>
              <div className="flex items-center text-yellow-500">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="none" stroke="currentColor" />
                <span className="ml-2 text-gray-600 text-sm">(4.0)</span>
              </div>
            </div>

            <div className="mt-4 text-gray-600">
              <p className="leading-relaxed">{description}</p>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <div className="text-3xl font-bold text-red-600">
                ₹ {parseFloat(price).toLocaleString()}
              </div>
              {originalPrice && parseFloat(originalPrice) > parseFloat(price) && (
                <div className="text-xl line-through text-gray-400">
                  ₹ {parseFloat(originalPrice).toLocaleString()}
                </div>
              )}
              {discountPercentage > 0 && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {(city || state) && (
                <div className="flex items-center bg-gray-100 py-1 px-3 rounded-full">
                  <MapPin className="text-green-500" size={16} />
                  <p className="text-gray-600 text-sm ml-1">
                    {city}{city && state && ", "}{state}
                  </p>
                </div>
              )}

              <div className="flex items-center bg-gray-100 py-1 px-3 rounded-full">
                <Clock className="text-blue-500" size={16} />
                <p className="text-gray-600 text-sm ml-1">24/7 Service</p>
              </div>

              {service.is_verified && (
                <div className="flex items-center bg-gray-100 py-1 px-3 rounded-full">
                  <CheckCircle className="text-green-500" size={16} />
                  <p className="text-gray-600 text-sm ml-1">Verified Provider</p>
                </div>
              )}
            </div>

            <div className="mt-5 border-t border-gray-200 pt-5">
              <div className="flex flex-col md:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg flex-1 transition-all duration-300 transform hover:scale-105 shadow-md flex justify-center items-center">
                  Book Now
                </button>
                <button className="border border-red-600 text-red-600 hover:bg-red-50 font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex-1 flex justify-center items-center">
                  Contact Provider
                </button>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">
                Service Highlights
              </h3>
              {service.specification ? (
                <ul className="grid grid-cols-2 gap-2">
                  {service.specification.split(',').map((spec, index) => (
                    <li key={index} className="flex items-center text-gray-600 text-sm">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      {spec.trim()}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    24/7 Support
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    Free Consultation
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    Satisfaction Guarantee
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    Fast Response
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      <MediaModal />
    </>
  );
}

export default ServiceDetails;