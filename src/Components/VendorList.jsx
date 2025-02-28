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

import { Filter, Route } from "lucide-react";
import notFound from "../assets/images/notfound.png";
import LoverStrip from "./LoverStrip";
import { Link } from "react-router-dom";

function VendorList() {
  const vendorsData = [
    { title: "Hotel", img: hotel, category: "Accommodation" , Route:"/VendorList/Hotelregister" },
    { title: "Photo Video", img: photo, category: "Photography" , Route:"/VendorList/Photvideo" },
    { title: "Decoration", img: decoration, category: "Decor" , Route:"/VendorList/DecorationRegister" },
    { title: "Tours & Travels", img: tours, category: "Travel" , Route:"/VendorList/ToursRegister" },
    { title: "Catering", img: catering, category: "Food" , Route:"/VendorList/CateringRegister" },
    { title: "VarMala Entry", img: varmala, category: "Ceremony" , Route:"/VendorList/WaramalaRegister" },
    { title: "Tent Houses", img: tent, category: "Venue"  , Route:"/VendorList/TentHouseRegister"},
    { title: "Makeup Artist", img: makeup, category: "Beauty" , Route:"/VendorList/MakeupArtistRegister" },
    { title: "Pandit", img: pandit, category: "Ceremony" , Route:"/VendorList/PanditRegister" },
    { title: "Wedding Dress", img: weddingdress, category: "Attire" , Route:"/VendorList/WeddingDressRegister" },
    { title: "Entertainment", img: entertainment, category: "Performance" , Route:"/VendorList/EntertainMentRegister/" },
    { title: "Venue", img: venue, category: "Venue" , Route:"/VendorList/VenueRegister" },
    { title: "Dhol", img: dhol, category: "Music" , Route:"/VendorList/DholRegister" },
    { title: "DJ", img: dj, category: "Music" ,Route:"/VendorList/DJRegister" },
    { title: "Band", img: band, category: "Music"  , Route:"/VendorList/BandRegister"},
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearch, setcategorySearch] = useState("");

  const filterData = vendorsData.filter((data) => {
    return (
      data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="bg-slate-100">
        <div
          className="w-full  p-10 bg-red-600"
          style={{
            borderBottomRightRadius: "30px",
            borderBottomLeftRadius: "30px",
          }}
        >
          <p className="text-4xl font-bold text-white text-center">Vendors </p>
        </div>

        <div className="w-[90%] gap-4 md:w-[70%] mx-auto flex flex-wrap items-center justify-between py-3 space-x-4">
          <div className="flex-grow">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for the vendors.."
              className="p-2 w-full h-10 rounded-full border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="w-full md:w-[300px] gap-3 flex justify-center items-center">
            <select
              name=""
              id=""
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for the vendors.."
              className=" p-2 w-full h-10 rounded-full border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" selected disabled>
                Select category
              </option>
              {filterData.map((v, i) => (
                <option key={i} value={v.category}>
                  {v.category}
                </option>
              ))}
            </select>
            <Filter size={40} className="text-red-900" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:w-[70%] w-[90%] m-auto mt-10">
          {filterData.length > 0 ? (
            filterData.map((vendor, index) => (
              <Link to={vendor.Route} >
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
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center w-full">
              <img
                className="animate-pulse max-w-[300px]"
                src={notFound}
                alt="Not Found"
              />
              <p className="text-center py-3">Not found</p>
              <button className="bg-green-600 px-4 py-2 rounded-sm text-white">
                Go back
              </button>
            </div>
          )}
        </div>
        <LoverStrip />
      </div>
    </>
  );
}

export default VendorList;
