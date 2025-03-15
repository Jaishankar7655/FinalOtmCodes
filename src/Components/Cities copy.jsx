import React, { useState } from "react";

import bhopal from "../assets/images/bhopal.png";
import indoor from "../assets/images/indoor.png";
import jabalpur from "../assets/images/jabalpur.png";
import ujjain from "../assets/images/ujjain.png";
import hosangabad from "../assets/images/hosangabad.png";
import gwalior from "../assets/images/gwalior.png";
const Cities = ({ search }) => {
  const cities = [
    {
      name: "Bhopal",
      image: bhopal,
      location: "Madhya Pradesh, India",
    },
    {
      name: "Indoor",
      image: indoor,
      location: "Maharashtra, India",
    },
    {
      name: "Jabalpur",
      image: jabalpur,
      location: "Madhya Pradesh, India",
    },
    {
      name: "Ujjain",
      image: ujjain,
      location: "Madhya Pradesh, India",
    },
    {
      name: "Hosangabad",
      image: hosangabad,
      location: "Madhya Pradesh, India",
    },
    {
      name: "Gwalior",
      image: gwalior,
      location: "Madhya Pradesh, India",
    },
  ];
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="w-[80%] mx-auto px-4  ">
      {filteredCities.length > 0 ? (
        <>
          {" "}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6   ">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className="w-[150px] h-[150px] relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl duration-300  transition-all hover:scale-105 "
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 backdrop-blur-sm">
                  <h3 className="text-white text-sm font-semibold">
                    {city.name}
                  </h3>
                  <p className="text-gray-200 text-xs">{city.location}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-red-500" >No city found </p>
        </>
      )}
    </div>
    
  );
};

export default Cities;
