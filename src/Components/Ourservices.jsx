import React, { useState } from "react";
import hotel from "../assets/vendors/hotel.png";
import photo from "../assets/vendors/camera.png";
import decoration from "../assets/vendors/decoration.png";
import tours from "../assets/vendors/tours.png";
import catering from "../assets/vendors/catering.png";
import varmala from "../assets/vendors/varmala.png";
import tent from "../assets/vendors/tent.png";
import makeup from "../assets/vendors/makeup.png";
import pandit from "../assets/vendors/pandit.png";
import weddingdress from "../assets/vendors/weddinddress.png";
import entertainment from "../assets/vendors/entertainment.png";
import venue from "../assets/vendors/venue.png";
import dhol from "../assets/vendors/dhol.png";
import dj from "../assets/vendors/dj.png";
import band from "../assets/vendors/band.png";

import { Filter } from "lucide-react";
import notFound from "../assets/images/notfound.png";
import LoverStrip from "./LoverStrip";

function VendorList() {
  const vendorsData = [
    { title: "Hotel", img: hotel, category: "Accommodation" },
    { title: "Photo Video", img: photo, category: "Photography" },
    { title: "Decoration", img: decoration, category: "Decor" },
    { title: "Tours & Travels", img: tours, category: "Travel" },
    { title: "Catering", img: catering, category: "Food" },
    { title: "VarMala Entry", img: varmala, category: "Ceremony" },
    { title: "Tent Houses", img: tent, category: "Venue" },
    { title: "Makeup Artist", img: makeup, category: "Beauty" },
    { title: "Pandit", img: pandit, category: "Ceremony" },
    { title: "Wedding Dress", img: weddingdress, category: "Attire" },
    { title: "Entertainment", img: entertainment, category: "Performance" },
    { title: "Venue", img: venue, category: "Venue" },
    { title: "Dhol", img: dhol, category: "Music" },
    { title: "DJ", img: dj, category: "Music" },
    { title: "Band", img: band, category: "Music" },
  ];

  

  

  return (
    <>
   
      <div className="bg-slate-100">
      <h1 className="text-red-600 text-4xl font-bold text-center py-3" >Our featured Services </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:w-[70%] w-[90%] m-auto pt-10">
          {vendorsData.map((vendor, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="p-4 text-center flex flex-col items-center">
                  <div className="mb-3 flex justify-center items-center h-20 w-full">
                    <img
                      src={vendor.img}
                      alt={vendor.title}
                      className="max-h-16 max-w-16 object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 truncate w-full text-center">
                    {vendor.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 w-full text-center">
                    {vendor.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <LoverStrip />
      </div>
    </>
  );
}

export default VendorList;
