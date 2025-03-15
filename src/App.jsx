import React from "react";
import Herosction from "./Components/Herosction";

import ServicesList from "./ServicesCard/ServicesList";
import Category from "./VendorCategory/Category";
import About from "./Components/About";
import HomeAbout from "./Components/HomeAbout";
import CompanyProfile from "./Components/CompanyProfile"

function App() {
  return (
    <>
      <Herosction />
      <Category />
      <ServicesList />
      <HomeAbout />
      <CompanyProfile />
    </>
  );
}

export default App;
