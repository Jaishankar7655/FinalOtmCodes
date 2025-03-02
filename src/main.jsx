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
import Hotelregister from "./Vendors/Hotelregister.jsx";
import DJRegister from "./Vendors/DJRegister.jsx";
import DecorationRegister from "./Vendors/DecorationRegister.jsx";
import ToursRegister from "./Vendors/ToursRegister.jsx";
import CateringRegister from "./Vendors/CateringRegister.jsx";
import WeddingDressRegister from "./Vendors/WeddingDressRegister.jsx";
import PanditRegister from "./Vendors/PanditRegister.jsx";
import WaramalaRegister from "./Vendors/WaramalaRegister.jsx";
import Photvideo from "./Vendors/Photvideo.jsx";
import TentHouseRegister from "./Vendors/TentHouseRegister.jsx";
import MakeupArtistRegister from "./Vendors/MakeupArtistRegister .jsx";

import BandRigister from "./Vendors/BandRegister.jsx";
import DholRegister from "./Vendors/DholRegister.jsx";
import EntertainMentRegister from "./Vendors/EntertainMentRegister.jsx";
import BandRegister from "./Vendors/BandRegister.jsx";
import VenueRigister from "./Vendors/VenueRigister.jsx";
import VendorRegistration from "./UserLog/VendorRegistration.jsx";
import VendorLogin from "./UserLog/VendorLogin.jsx";
import UserLogin from "./UserLog/UserLogin.jsx";
import UserRegister from "./UserLog/UserRegister.jsx";
import VendorProfile from "./Profile/VendorProfile.jsx";
import UserProfile from "./Profile/UserProfile.jsx";
import LoverStrip from "./Components/LoverStrip.jsx";

import ProtectedRoute from "../src/UserLog/ProtectedRoute .jsx";

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
        <Route
          path="/VendorList"
          element={
            <ProtectedRoute>
              <VendorList />
            </ProtectedRoute>
          }
        />
        <Route path="/VendorList/Hotelregister" element={<Hotelregister />} />
        <Route path="/VendorList/DJRegister" element={<DJRegister />} />
        <Route
          path="/VendorList/DecorationRegister"
          element={<DecorationRegister />}
        />
        <Route path="/VendorList/ToursRegister" element={<ToursRegister />} />
        <Route
          path="/VendorList/CateringRegister"
          element={<CateringRegister />}
        />
        <Route
          path="/VendorList/WeddingDressRegister"
          element={<WeddingDressRegister />}
        />
        <Route path="/VendorList/PanditRegister" element={<PanditRegister />} />
        <Route
          path="/VendorList/WaramalaRegister"
          element={<WaramalaRegister />}
        />
        <Route path="/VendorList/Photvideo" element={<Photvideo />} />
        <Route
          path="/VendorList/TentHouseRegister"
          element={<TentHouseRegister />}
        />
        <Route
          path="/VendorList/MakeupArtistRegister"
          element={<MakeupArtistRegister />}
        />
        <Route path="/VendorList/BandRigister" element={<BandRigister />} />
        <Route path="/VendorList/DholRegister" element={<DholRegister />} />
        <Route
          path="/VendorList/EntertainMentRegister"
          element={<EntertainMentRegister />}
        />
        <Route path="/VendorList/VenueRigister" element={<VenueRigister />} />
        <Route path="/VendorList/BandRegister" element={<BandRegister />} />
        <Route path="/VendorRegistration" element={<VendorRegistration />} />
        <Route path="/VendorLogin" element={<VendorLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />

        {/* Protected VendorProfile route */}
        <Route path="/VendorProfile" element={<VendorProfile />} />
        <Route path="/UserProfile" element={<UserProfile />} />

       

        <Route path="/Mendidetailed/:id" element={<Mendidetailed />} />
      </Routes>
      <LoverStrip />
    </Router>
  </StrictMode>
);
