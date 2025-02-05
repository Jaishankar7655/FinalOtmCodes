import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mehndiservices" element={<Mehndisection />} />
        <Route path="/Shimmerefect" element={<Shimmerefect />} />
        <Route path="/Venders" element={<Venders />} />
        <Route path="/Venders/Photography" element={<Photography />} />
        <Route path="/Venders/Hotelbooking" element={<Hotelbooking />} />
        <Route path="/VendorList" element={<VendorList />} />
        <Route path="/VendorList/Hotelregister" element={<Hotelregister />} />
        <Route
          path="/Venders/Photography/Detailedphotographer"
          element={<Detailedphotographer />}
        />

        <Route path="/Mendidetailed/:id" element={<Mendidetailed />} />
      </Routes>
    </Router>
  </StrictMode>
);
