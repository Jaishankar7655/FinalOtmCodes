import React from "react";
import { isUserLoggedIn, clearUserSession } from "./sessionUtils";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserSession(); // This now clears both session and local storage
    navigate("/UserLogin");
  };

  return isUserLoggedIn() ? (
    <button
      onClick={handleLogout}
      className="text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => navigate("/UserLogin")}
      className="text-green-500 px-4 py-2 rounded hover:bg-green-50 transition-colors"
    >
      Login
    </button>
  );
};

export default AuthButton;
