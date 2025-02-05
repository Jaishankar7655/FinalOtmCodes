import React, { useState } from "react";
import CitySearch from "./CitySearch";
function Subheadervenders({
  citySearch,
  setCitySearch,
  searchPhoto,
  setSearchPhoto,
}) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Wedding Photographers
              </h1>
              <p className="text-lg text-gray-600">
                Showing 1000 results matching your search
              </p>
            </div>
            <CitySearch
              citySearch={citySearch}
              setCitySearch={setCitySearch}
              placeholder="Search for city"
            />
            <CitySearch
              citySearch={searchPhoto} // Use searchPhoto here
              setCitySearch={setSearchPhoto} // Use setSearchPhoto here
              placeholder="Search for the photography"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"></div>
        </div>
      </div>
    </>
  );
}

export default Subheadervenders;
