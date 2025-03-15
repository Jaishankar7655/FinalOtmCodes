import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserSession, isUserLoggedIn } from "../UserLog/sessionUtils";

function ServiceDetails({ id }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [priceSpecification, setPriceSpecification] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const webUrl = "https://backend.onetouchmoments.com/";

  // Fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      const userData = getUserSession();
      const userId = userData?.user_id;

      const queryParams = new URLSearchParams(location.search);
      const firmName = queryParams.get("firm_name");
      const vendorId = queryParams.get("vendor_id");

      if (!firmName || !vendorId) {
        const errorMessage = !firmName
          ? "Missing firm name parameter"
          : "Missing vendor ID parameter";
        setError(errorMessage);
        setLoading(false);
        return;
      }

      try {
        const apiUrl = `${webUrl}user_controller/Service/index_get?data=${encodeURIComponent(
          firmName
        )}&vendor_id=${encodeURIComponent(vendorId)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          // Process media files
          const servicesWithMedia = data.data.map((service) => {
            const images = service.images
              ? service.images.split(",").map((img) => `${webUrl}${img.trim()}`)
              : [];

            const videos = service.videos
              ? service.videos
                  .split(",")
                  .map((video) => `${webUrl}${video.trim()}`)
              : [];

            return {
              ...service,
              processedImages: images,
              processedVideos: videos,
            };
          });

          setServices(servicesWithMedia);
        } else {
          setServices([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [location.search, webUrl]);

  // Fetch price specifications
  useEffect(() => {
    const fetchPriceSpecification = async () => {
      const queryParams = new URLSearchParams(location.search);
      const serviceId = queryParams.get("service_id");

      if (!serviceId) {
        console.error("Missing service_id parameter");
        return;
      }

      try {
        const response = await fetch(
          `${webUrl}user_controller/Service_price/index_get?service_id=${encodeURIComponent(
            serviceId
          )}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPriceSpecification(data.data || []);
      } catch (err) {
        console.error("Error fetching price specification:", err);
      }
    };

    if (!loading && services.length > 0) {
      fetchPriceSpecification();
    }
  }, [loading, services, location.search, webUrl]);

  // Handle booking submission
  const handleSubmit = async (event, specifications) => {
    event.preventDefault();
    setIsSubmitting(true);
    setBookingError(null);

    if (!specifications) {
      setBookingError("Please select a service specification");
      setIsSubmitting(false);
      return;
    }

    if (!isUserLoggedIn()) {
      navigate("/UserLogin", { 
        state: { 
          returnUrl: window.location.pathname + window.location.search 
        }
      });
      return;
    }

    const userData = getUserSession();
    if (!userData?.user_id) {
      navigate("/UserLogin");
      return;
    }

    const service = services[0];
    const formData = new FormData();
    formData.append("service_id", service.service_id);
    formData.append("vendor_id", service.vendor_id);
    formData.append("amount", specifications.off_price);
    formData.append("user_id", userData.user_id);
    formData.append("specification_id", specifications.specification_id);

    try {
      const response = await fetch(
        `${webUrl}user_controller/User_booking/index_post`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 1 && result.booking_id) {
        navigate(
          `/payment?booking_id=${result.booking_id}&service_id=${
            service.service_id
          }&vendor_id=${service.vendor_id}&off_price=${
            specifications.off_price
          }`
        );
      } else {
        throw new Error(result.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setBookingError(
        error.message || "An error occurred while processing your booking."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Image carousel navigation
  const nextImage = () => {
    if (services.length > 0 && services[0].processedImages?.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % services[0].processedImages.length
      );
    }
  };

  const prevImage = () => {
    if (services.length > 0 && services[0].processedImages?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? services[0].processedImages.length - 1 : prevIndex - 1
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div
          className="bg-red-50 border-l-4 border-red-500 text-red-700 p-5 rounded-lg shadow-md"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const userData = getUserSession();
  const userId = userData?.user_id;

  return (
    <div className="bg-gray-50 min-h-screen py-10 mt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {services.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg
              className="w-20 h-20 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="mt-6 text-xl font-medium text-gray-700">
              No services available for this vendor
            </p>
            <p className="mt-2 text-gray-500">
              Please try selecting a different vendor or check back later.
            </p>
          </div>
        ) : (
          services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Service Header - Mobile View */}
              <div className="lg:hidden p-4 border-b">
                <h1 className="text-xl font-bold text-gray-800">
                  {service.firm_name}
                </h1>
                <p className="text-sm text-gray-500">{service.service_cat}</p>
              </div>

              {/* Main Content */}
              <div className="lg:flex">
                {/* Image Carousel */}
                <div className="lg:w-1/2 relative bg-gray-100">
                  {service.processedImages &&
                  service.processedImages.length > 0 ? (
                    <div className="relative h-80 lg:h-full">
                      <img
                        src={service.processedImages[currentImageIndex]}
                        alt={`${service.firm_name} - ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover aspect-square"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/800x400?text=Image+Not+Available";
                        }}
                      />

                      {/* Image Navigation */}
                      {service.processedImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Previous image"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Next image"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </button>

                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {service.processedImages.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={() => setCurrentImageIndex(imgIndex)}
                                className={`h-3 w-3 rounded-full transition-all ${
                                  currentImageIndex === imgIndex
                                    ? "bg-white scale-110"
                                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                                }`}
                                aria-label={`Go to image ${imgIndex + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-80 lg:h-full bg-gray-100">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-16 w-16 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mt-2 text-gray-500 text-sm">
                          No images available
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Details */}
                <div className="lg:w-1/2 p-6">
                  {/* Service Header - Desktop View */}
                  <div className="hidden lg:block">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                          {service.firm_name}
                        </h1>
                        <p className="text-gray-500 mt-1">
                          {service.service_cat}
                        </p>
                      </div>
                     
                    </div>
                  </div>

                  {/* Price - Mobile View */}
                  <div className="lg:hidden mt-2 flex justify-between items-center">
                    <p className="text-2xl font-bold text-red-600">
                      ₹{service.off_price}
                    </p>
                    <div className="flex items-center">
                      <p className="line-through text-gray-500 mr-2">
                        ₹{service.mrp_price}
                      </p>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Save ₹{service.mrp_price - service.off_price}
                      </span>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="border-b border-gray-200 mt-6">
                    <nav className="flex -mb-px overflow-x-auto">
                      <button
                        onClick={() => setActiveTab("description")}
                        className={`py-3 px-4 font-medium whitespace-nowrap transition-all ${
                          activeTab === "description"
                            ? "border-b-2 border-red-500 text-red-600"
                            : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab("details")}
                        className={`py-3 px-4 font-medium whitespace-nowrap transition-all ${
                          activeTab === "details"
                            ? "border-b-2 border-red-500 text-red-600"
                            : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setActiveTab("media")}
                        className={`py-3 px-4 font-medium whitespace-nowrap transition-all ${
                          activeTab === "media"
                            ? "border-b-2 border-red-500 text-red-600"
                            : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Videos
                      </button>
                      <button
                        onClick={() => setActiveTab("contact")}
                        className={`py-3 px-4 font-medium whitespace-nowrap transition-all ${
                          activeTab === "contact"
                            ? "border-b-2 border-red-500 text-red-600"
                            : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Contact
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="py-6">
                    {activeTab === "description" && (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {service.description ||
                            "No description available for this service."}
                        </p>
                      </div>
                    )}

                    {activeTab === "details" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                              Service Specification
                            </h3>
                            <p className="text-gray-600">
                              {service.specification || "Not specified"}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              Location
                            </h3>
                            <address className="not-italic text-gray-600">
                              {service.house_no}, {service.near_by}, <br />
                              {service.city}, {service.district}, <br />
                              {service.state} - {service.pincode}
                            </address>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "media" && (
                      <div className="space-y-6">
                        {service.processedVideos &&
                        service.processedVideos.length > 0 ? (
                          <div className="grid grid-cols-1 gap-4">
                            {service.processedVideos.map((video, vIndex) => (
                              <div
                                key={vIndex}
                                className="rounded-lg overflow-hidden shadow-md bg-black"
                              >
                                <video
                                  controls
                                  src={video}
                                  className="w-full h-auto"
                                  poster={
                                    service.processedImages &&
                                    service.processedImages.length > 0
                                      ? service.processedImages[0]
                                      : ""
                                  }
                                >
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10 px-4 bg-gray-50 rounded-lg border border-gray-100">
                            <svg
                              className="w-12 h-12 mx-auto text-gray-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="mt-2 text-gray-500">
                              No videos available for this service
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "contact" && (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border border-red-100">
                          <h3 className="font-semibold text-red-700 mb-4 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            Contact Information
                          </h3>
                          <div className="space-y-3">
                            <p className="flex items-center text-gray-700">
                              <svg
                                className="w-5 h-5 mr-3 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <span className="font-medium">
                                {service.phone || "Phone not available"}
                              </span>
                            </p>
                            <p className="flex items-center text-gray-700">
                              <svg
                                className="w-5 h-5 mr-3 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="font-medium">
                                {service.email || "Email not available"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price Specifications */}
                </div>
              </div>
            </div>
          ))
        )}
        <div className="mt-4 space-y-4">
          {priceSpecification.map((specifications, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 gap-4">
                {/* Specification title */}
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {specifications.specification}
                </h3>

                {/* Price information */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-500 line-through text-sm">
                      ₹{specifications.mrp_price}
                    </span>
                    <span className="text-xl font-bold text-red-600">
                      ₹{specifications.off_price}
                    </span>
                  </div>

                  {specifications.mrp_price > specifications.off_price && (
                    <div className="flex">
                      <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
                        {Math.round(
                          ((specifications.mrp_price -
                            specifications.off_price) /
                            specifications.mrp_price) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Booking button */}
                <button
                  onClick={(e) => handleSubmit(e, specifications)}
                  disabled={!userId || isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-all ${
                    !userId
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : isSubmitting
                      ? "bg-red-400 cursor-wait"
                      : "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <span className="font-medium">
                    {!userId 
                      ? "Login to Book" 
                      : isSubmitting 
                      ? "Processing..." 
                      : "Book Now"
                    }
                  </span>
                  {!isSubmitting && (
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </button>
                {bookingError && (
                  <p className="mt-2 text-sm text-red-600">
                    {bookingError}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
