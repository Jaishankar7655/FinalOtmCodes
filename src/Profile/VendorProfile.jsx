import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    vendor_id: "",
    vendor_unique_id: "",
    vendor_name: "",
    vendor_email: "",
    vendor_phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing sessionStorage data:", error);
        sessionStorage.removeItem("userData"); // Remove corrupted data
        navigate("/VendorLogin"); // Redirect to login
      }
    } else {
      navigate("/VendorLogin"); // Redirect if no user data
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://vendor.onetouchmoments.com/vendor_controller/vendor_profile/index_put/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      await response.json();
      setNotification({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      });
      sessionStorage.setItem("userData", JSON.stringify(formData)); // Store updated data
      setUserData(formData);

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification({
        show: true,
        message: "An error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData"); // Secure logout
    navigate("/VendorLogin");
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#CC0B0B] border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-500"
              : "bg-red-100 text-red-800 border-l-4 border-red-500"
          } transition-all duration-500 ease-in-out`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#CC0B0B] to-[#FF4444] px-6 py-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                Vendor Dashboard
              </h1>
              <button
                onClick={handleLogout}
                className="bg-white text-[#CC0B0B] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#CC0B0B]"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="px-6 py-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-[#CC0B0B] h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {userData.vendor_name?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {userData.vendor_name}
                  </h2>
                  <p className="text-gray-600">{userData.vendor_email}</p>
                  <p className="text-gray-600">{userData.vendor_unique_id}</p>
                  <p className="text-gray-600">{userData.vendor_phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
                <a
                  href="/service-profile"
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto text-[#CC0B0B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-medium">
                      Add Service Profile
                    </span>
                  </div>
                </a>

                <a
                  href="/services"
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto text-[#CC0B0B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-medium">
                      Services
                    </span>
                  </div>
                </a>

                <a
                  href="/analytics"
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto text-[#CC0B0B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-medium">
                      Analytics
                    </span>
                  </div>
                </a>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Profile
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="hidden"
                  name="vendor_id"
                  value={formData.vendor_id}
                />

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="vendor_name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="vendor_name"
                    name="vendor_name"
                    value={formData.vendor_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC0B0B] focus:border-[#CC0B0B] transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="vendor_email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="vendor_email"
                    name="vendor_email"
                    value={formData.vendor_email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC0B0B] focus:border-[#CC0B0B] transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="vendor_phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="vendor_phone"
                    name="vendor_phone"
                    value={formData.vendor_phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC0B0B] focus:border-[#CC0B0B] transition-colors duration-200"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#CC0B0B] text-white py-3 px-6 rounded-lg hover:bg-[#A50909] transition-colors duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC0B0B]"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating Profile...
                      </span>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
