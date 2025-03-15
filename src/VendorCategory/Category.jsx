import React from "react";
import band from "../assets/Vendor/band.png";
import camera from "../assets/Vendor/camera.png";
import catering from "../assets/Vendor/catering.png";
import decoration from "../assets/Vendor/decoration.png";
import dhol from "../assets/Vendor/dhol.png";
import dj from "../assets/Vendor/dj.png";
import entertainment from "../assets/Vendor/entertainment.png";
import hotel from "../assets/Vendor/hotel.png";
import makeup from "../assets/Vendor/makeup.png";
import pandit from "../assets/Vendor/pandit.png";
import tent from "../assets/Vendor/tent.png";
import tours from "../assets/Vendor/tours.png";
import varmala from "../assets/Vendor/varmala.png";
import venue from "../assets/Vendor/venue.png";
import weddingdress from "../assets/Vendor/weddinddress.png";
import { Link } from "react-router-dom";

// Convert style to a proper object
const style = {
  width: "20px",
  height: "18px",
};

const categories = [
  { icon: dj, title: "DJ", route: "/service/dj" },
  { icon: varmala, title: "varmala", route: "/service/varmala" },
  { icon: dhol, title: "Dhol", route: "/service/dhol" },
  { icon: tent, title: "Tent", route: "/service/tent" },
  { icon: pandit, title: "Pandit", route: "/service/pandit" },
  { icon: makeup, title: "Mehndi Artist", route: "/service/mehndi" },
  { icon: venue, title: "Venue", route: "/service/venue" },
  { icon: entertainment, title: "Corporate Events", route: "/service/corporate" },
  { icon: band, title: "Wedding Band", route: "/service/bandservices" },
  { icon: camera, title: "Photography", route: "/service/photography", css: style },
  { icon: catering, title: "Catering", route: "/service/catering" },
  { icon: decoration, title: "Decoration", route: "/service/decoration" },
  { icon: hotel, title: "Hotel", route: "/service/hotel" },
  { icon: tours, title: "Tours and travels", route: "/service/tours" },
  { icon: weddingdress, title: "Dress On rent", route: "/service/dress" },
];

function Category() {
  return (
    <div className="mt-20 w-[90%] m-auto ">
      <div>
        <h1 className="text-3xl font-bold text-center text-red-600 mt-16">
          Our Most popular Services
        </h1>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-6 py-10">
            {categories.map((category, index) => (
              <Link to={category.route} key={index}>
                <div
                  className="flex flex-col items-center justify-center p-3 bg-white shadow-md rounded-lg hover:-translate-y-2 transition-all ease-linear duration-500"
                >
                  <div className="w-16 h-16 rounded-full bg-red-100 flex justify-center items-center">
                    <img
                      src={category.icon}
                      alt={category.title}
                      className="w-7 h-7"
                      style={category.css || {}}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold">{category.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;