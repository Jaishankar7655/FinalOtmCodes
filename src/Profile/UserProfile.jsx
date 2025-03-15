import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    user_email: "",
    user_phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing sessionStorage data:", error);
        sessionStorage.removeItem("userData"); // Remove corrupted data
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
        "https://backend.onetouchmoments.com/user_controller/user_profile/index_put/",
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

      // Store updated data
      sessionStorage.setItem("userData", JSON.stringify(formData));
      localStorage.setItem("userData", JSON.stringify(formData));
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
    sessionStorage.removeItem("userData");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event("userAuthChanged"));

    navigate("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <CircleUserRound className="mx-auto h-16 w-16 text-[#CC0B0B]" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Please Login First
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You need to be logged in to view your profile
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate("/UserLogin")}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#CC0B0B] hover:bg-[#A50909] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC0B0B]"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full flex justify-center py-3 px-4 border border-[#CC0B0B] rounded-lg shadow-sm text-sm font-medium text-[#CC0B0B] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC0B0B]"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
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
              <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
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
                  {userData.user_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {userData.user_name || "User"}
                  </h2>
                  <p className="text-gray-600">{userData.user_email}</p>
                  {userData.user_phone && (
                    <p className="text-gray-600">{userData.user_phone}</p>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Profile
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="hidden"
                  name="user_id"
                  value={formData.user_id || ""}
                />

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="user_name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name || ""}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC0B0B] focus:border-[#CC0B0B] transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="user_email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email || ""}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC0B0B] focus:border-[#CC0B0B] transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="user_phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="user_phone"
                    name="user_phone"
                    value={formData.user_phone || ""}
                    onChange={handleChange}
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

export default UserProfile;
