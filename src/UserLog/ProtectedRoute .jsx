import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    const userData = sessionStorage.getItem('userData');
    
    if (!userData) {
      return false;
    }
    
    try {
      const parsedData = JSON.parse(userData);
      
      // Check if the token has expired
      if (parsedData.expiryTime && new Date().getTime() > parsedData.expiryTime) {
        // Clear expired session
        sessionStorage.removeItem('userData');
        localStorage.removeItem('userData');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return false;
    }
  };

  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    // The "state" prop preserves the attempted URL for potential redirect after login
    return <Navigate to="/VendorLogin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;