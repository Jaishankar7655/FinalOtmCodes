import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const countdownIntervalRef = useRef(null);
  const progressBarRef = useRef(null);

  // Get query parameters using useLocation
  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  useEffect(() => {
    // Get payment details from URL
    const booking_id = getQueryParam("booking_id");
    const service_id = getQueryParam("service_id");
    const vendor_id = getQueryParam("vendor_id");
    const off_price = getQueryParam("off_price");

    // Validate required parameters
    if (!booking_id || !service_id || !vendor_id || !off_price) {
      setPaymentError("Missing required payment parameters");
      return;
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      // Automatically trigger payment when script loads
      handlePayment();
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [location.search]);

  const handlePaymentSuccess = () => {
    setShowSuccessModal(true);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;

        if (progressBarRef.current) {
          const widthPercent = (newCount / 5) * 100;
          progressBarRef.current.style.width = `${widthPercent}%`;
        }

        if (newCount <= 0) {
          clearInterval(countdownIntervalRef.current);
          navigate("/services"); // Redirect after countdown ends
        }

        return newCount;
      });
    }, 1000);
  };

  const handlePayment = () => {
    // Get user data from storage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const sessionData = JSON.parse(sessionStorage.getItem("sessionData")) || {};

    // Get query parameters
    const service_id = getQueryParam("service_id");
    const vendor_id = getQueryParam("vendor_id");
    const booking_id = getQueryParam("booking_id");
    const off_price = getQueryParam("off_price");

    const user_id = sessionData.user_id;
    const user_phone = sessionData.user_phone;

    // Validate required parameters
    if (!service_id || !vendor_id || !off_price) {
      console.error("Error: service_id, vendor_id, or off_price is missing.");
      setPaymentError("Missing required payment parameters");
      return;
    }

    console.log("Payment parameters:", {
      service_id,
      vendor_id,
      booking_id,
      off_price,
    });

    // Fetch order details from backend
    fetch(
      `https://backend.onetouchmoments.com/user_controller/User_checkout/index_get?booking_id=${booking_id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          // Initialize Razorpay with the order details
          const options = {
            key: data.key_id,
            amount: parseFloat(off_price) * 100, // Convert to paise
            currency: "INR",
            name: "Acme Corp",
            description: "Service Payment",
            image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
            order_id: data.order_id,
            handler: function (response) {
              // Verify that we have all required fields from Razorpay
              if (
                !response.razorpay_payment_id ||
                !response.razorpay_order_id ||
                !response.razorpay_signature
              ) {
                console.error(
                  "Missing required Razorpay response fields:",
                  response
                );
                setPaymentError(
                  "Payment verification failed. Missing required fields."
                );
                return;
              }

              // Log the complete response for debugging
              console.log("Razorpay Response:", response);

              // Create FormData and explicitly set each field
              const formData = new FormData();
              formData.append(
                "razorpay_payment_id",
                response.razorpay_payment_id
              );
              formData.append("razorpay_order_id", response.razorpay_order_id);
              formData.append(
                "razorpay_signature",
                response.razorpay_signature
              );
              formData.append("service_id", service_id);
              formData.append("vendor_id", vendor_id);
              formData.append("off_price", off_price);
              formData.append("user_id", user_id);
              formData.append("user_phone", user_phone);

              if (booking_id) {
                formData.append("booking_id", booking_id);
              }

              // Log FormData entries for verification
              for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
              }

              // Submit payment verification to backend
              fetch(
                "https://backend.onetouchmoments.com/user_controller/User_payment/index_post",
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((result) => {
                  console.log("Payment verification result:", result);
                  if (result.status === 1) {
                    handlePaymentSuccess();
                  } else {
                    console.error("Payment verification failed:", result);
                    setPaymentError(
                      "Payment verification failed. Please contact support."
                    );
                  }
                })
                .catch((error) => {
                  console.error("Payment verification error:", error);
                  setPaymentError(
                    "Error verifying payment. Please contact support."
                  );
                });
            },
            prefill: {
              name: userData.vendor_name || sessionData.name || "",
              email: userData.vendor_email || sessionData.email || "",
              contact: userData.vendor_phone || user_phone || "",
            },
            theme: {
              color: "#3399cc",
            },
            // Add modal closing handling
            modal: {
              ondismiss: function () {
                console.log("Checkout form closed");
                navigate("/services"); // Redirect if payment is cancelled
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setPaymentError("Order creation failed!");
        }
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setPaymentError("Error initializing payment. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {paymentError ? (
          // Error Display
          <div className="text-center">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p className="font-bold">Error</p>
              <p>{paymentError}</p>
            </div>
            <button
              onClick={() => navigate("/services")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Return to Services
            </button>
          </div>
        ) : (
          // Loading Display
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Initializing Payment...
            </h2>

            {/* Loading indicator */}
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>

            <div className="mt-4 text-center text-gray-600">
              <p>Please wait while we redirect you to the payment gateway.</p>
              <p className="text-sm mt-2">
                Amount: ₹{getQueryParam("off_price")}
              </p>
            </div>
          </>
        )}

        {/* Hidden button with zero opacity */}
        <button
          id="paybutton"
          onClick={handlePayment}
          className="opacity-0 invisible absolute"
          aria-hidden="true"
        >
          Pay with Razorpay
        </button>

        {/* Success Modal */}
        {showSuccessModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-80">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your booking has been confirmed.
                </p>
                <p className="text-gray-800 mb-4">
                  Redirecting in <span className="font-bold">{countdown}</span>{" "}
                  seconds...
                </p>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
