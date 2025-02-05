import React, { useState } from "react";
import { MapPin } from "lucide-react";

import bluetick from "../assets/images/bluetick.png";
import star from "../assets/images/star.png";
import photo from "../assets/images/photographer.png";
// Add more images as needed or reuse the same for simplicity.

function Photographer({ search }) {
  const photographers = [
    {
      name: "White Fox Production",
      rating: 5.0,
      reviews: 80,
      location: "Bhopal, Madhya Pradesh",
      service: "Photo + Video",
      price: 25000,
      image: photo,
    },
    {
      name: "Golden Hour Studio",
      rating: 4.8,
      reviews: 120,
      location: "Indore, Madhya Pradesh",
      service: "Photography",
      price: 20000,
      image: photo,
    },
    {
      name: "Shutter Lens Studio",
      rating: 4.9,
      reviews: 95,
      location: "Delhi, India",
      service: "Video + Drone",
      price: 30000,
      image: photo,
    },
    {
      name: "Memories Captured",
      rating: 4.7,
      reviews: 60,
      location: "Mumbai, Maharashtra",
      service: "Photography + Album",
      price: 22000,
      image: photo,
    },
    {
      name: "Visionary Frames",
      rating: 5.0,
      reviews: 150,
      location: "Chennai, Tamil Nadu",
      service: "Photo + Video + Drone",
      price: 35000,
      image: photo,
    },
    {
      name: "Snapshots Studio",
      rating: 4.6,
      reviews: 45,
      location: "Pune, Maharashtra",
      service: "Photo Only",
      price: 18000,
      image: photo,
    },
    {
      name: "Vivid Memories",
      rating: 4.8,
      reviews: 110,
      location: "Hyderabad, Telangana",
      service: "Video Only",
      price: 27000,
      image: photo,
    },
    {
      name: "Picture Perfect",
      rating: 5.0,
      reviews: 140,
      location: "Kolkata, West Bengal",
      service: "Photography + Videography",
      price: 32000,
      image: photo,
    },
    {
      name: "Timeless Clicks",
      rating: 4.9,
      reviews: 85,
      location: "Jaipur, Rajasthan",
      service: "Drone + Video",
      price: 28000,
      image: photo,
    },
    {
      name: "Elite Wedding Shoots",
      rating: 5.0,
      reviews: 200,
      location: "Lucknow, Uttar Pradesh",
      service: "Photo + Video + Album",
      price: 40000,
      image: photo,
    },
  ];

  const filteredPhotographers = photographers.filter(
    (photographer) =>
      photographer.location.toLowerCase().includes(search.toLowerCase()) ||
      photographer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lg:w-[80%] px-2 m-auto mt-10 flex flex-wrap gap-4 justify-between">
      {filteredPhotographers.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-4 justify-between">
            {filteredPhotographers.map((photographer, index) => (
              <div
                key={index}
                className="w-[376px] shadow-lg hover:shadow-xl transition-all duration-300  overflow-hidden"
              >
                <img
                  className="h-[196px] w-full object-cover hover:scale-105 transition-transform duration-300"
                  src={photographer.image}
                  alt={photographer.name}
                />

                <div className="p-4">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-[18px] font-semibold text-gray-800 hover:text-gray-600 ">
                        {photographer.name}
                      </p>
                      <img className="w-3 h-3" src={bluetick} alt="" />
                    </div>
                    <div className="flex gap-1">
                      <div className="flex justify-center items-center" ><img src={star} className="w-3 h-3" alt="" /></div>
                      <p className="text-gray-400 font-medium">
                        {photographer.rating}{" "}
                        <span className="text-sm">
                          ({photographer.reviews} reviews)
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-green-500 pt-2 items-center">
                    <MapPin className="h-5 w-5" />
                    <div className="text-green-600">
                      {photographer.location}
                    </div>
                  </div>
                  <div className="pt-3 pl-2">
                    <p className="font-semibold text-[#B3AFB3] hover:text-gray-600 transition-colors">
                      {photographer.service}
                    </p>
                  </div>
                  <div className="pt-3 pl-2">
                    <p className="text-xl text-[#B3AFB3]">
                      <b className="text-gray-700">₹ {photographer.price}</b>{" "}
                      <span className="text-sm">per day</span>
                    </p>
                  </div>
                  <div className="mt-4 border border-dashed border-red-500 rounded-lg"></div>
                  <div>
                    <button className="text-red-500 text-xl py-3 font-bold ">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>No services Photographer found </h1>
        </>
      )}
    </div>
  );
}

export default Photographer;
