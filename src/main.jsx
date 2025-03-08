import { StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Mehndisection from "./Components/Mehndisection.jsx";
import Header from "./Components/Header.jsx";
import Navbar from "./Components/Navbar.jsx";
import Shimmerefect from "./Components/Shimmerefect.jsx";
import Mendidetailed from "./Components/Mendidetailed.jsx";
import Venders from "./Components/Venders.jsx";
import Detailedphotographer from "./Components/Detailedphotographer.jsx";
import Photography from "./Components/Photography.jsx";
import Hotelbooking from "./Components/Hotelbooking.jsx";
import VendorList from "./Components/VendorList.jsx";
import VendorRegistration from "./UserLog/VendorRegistration.jsx";
import VendorLogin from "./UserLog/VendorLogin.jsx";
import UserLogin from "./UserLog/UserLogin.jsx";
import UserRegister from "./UserLog/UserRegister.jsx";
import VendorProfile from "./Profile/VendorProfile.jsx";
import UserProfile from "./Profile/UserProfile.jsx";
import LoverStrip from "./Components/LoverStrip.jsx";

import ServiceDetails from "./ServicesCard/ServiceDetails.jsx";
import ServicesList from "./ServicesCard/ServicesList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mehndiservices" element={<Mehndisection />} />
        <Route path="/Shimmerefect" element={<Shimmerefect />} />
        <Route path="/Vendors" element={<Venders />} />
        <Route path="/Venders/Photography" element={<Photography />} />
        <Route path="/Venders/Hotelbooking" element={<Hotelbooking />} />
        <Route path="/VendorRegistration" element={<VendorRegistration />} />
        <Route path="/VendorLogin" element={<VendorLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        {/* Protected VendorProfile route */}
        <Route path="/VendorProfile" element={<VendorProfile />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Mendidetailed/:id" element={<Mendidetailed />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
      </Routes>
      <LoverStrip />
    </Router>
  </StrictMode>
);
