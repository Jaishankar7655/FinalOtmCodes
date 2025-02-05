import React, { useState } from "react";
import Cities from "./Cities";
import Photographer from "./Photographer";
import CitySearch from "./CitySearch";
import Subheadervenders from "./Subheadervenders";
const Photography = () => {
  const [citySearch, setCitySearch] = useState("");
  const [searchPhoto, setSearchPhoto] = useState("");

  return (
    <div className=" bg-gray-100 py-8">
      <Subheadervenders
        citySearch={citySearch}
        setCitySearch={setCitySearch}
        searchPhoto={searchPhoto}
        setSearchPhoto={setSearchPhoto}
      />

      <Cities search={citySearch} />
      <Photographer search={searchPhoto} />

      {/* <Photographyy search={searchPhoto} /> */}
    </div>
  );
};

export default Photography;
