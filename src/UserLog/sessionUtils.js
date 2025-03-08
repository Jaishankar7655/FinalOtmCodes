import React from 'react';

export const setUserSession = (userData) => {
  if (!userData) return;

  // Calculate expiry time (10 days from now) if not already set
  if (!userData.expiryTime) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);
    userData.expiryTime = expiryDate.getTime();
  }

  // Store in both storages for persistence
  sessionStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserSession = () => {
  let userData = sessionStorage.getItem("userData");

  // If not in sessionStorage, try localStorage (for page refreshes)
  if (!userData) {
    userData = localStorage.getItem("userData");

    // If found in localStorage but not in sessionStorage, restore to sessionStorage
    if (userData) {
      sessionStorage.setItem("userData", userData);
    }
  }

  if (!userData) return null;

  try {
    const parsedData = JSON.parse(userData);

    // Check if token has expired
    if (parsedData.expiryTime && new Date().getTime() > parsedData.expiryTime) {
      clearUserSession();
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const isUserLoggedIn = () => {
  return getUserSession() !== null;
};

export const clearUserSession = () => {
  sessionStorage.removeItem("userData");
  localStorage.removeItem("userData");
  // Optional: Dispatch an event to notify other components
  window.dispatchEvent(new Event('userLogout'));
};

export const updateUserSession = (updates) => {
  const userData = getUserSession();
  if (userData) {
    const updatedData = { ...userData, ...updates };
    setUserSession(updatedData);
    return updatedData;
  }
  return null;
};

export const refreshUserSession = () => {
  const userData = getUserSession();
  if (userData) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);
    userData.expiryTime = expiryDate.getTime();
    setUserSession(userData);
  }
};