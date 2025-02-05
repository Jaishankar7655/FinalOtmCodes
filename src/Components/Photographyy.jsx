import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
function Photographyy({ search }) {
  const url = "https://otmpracel.com/list";
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data.products);
      console.log(res);
    });
  }, []);
  const filteredData = data.filter((products) => {
    return (
      products.title.toLowerCase().includes(search.toLowerCase()) ||
      products.brand.toLowerCase().includes(search.toLowerCase()) ||
      products.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <div className="lg:w-[80%] px-2 m-auto mt-10 flex flex-wrap gap-4 justify-between">
        {filteredData.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4 justify-between">
              {filteredData.map((photographer, index) => (
                <div
                  key={index}
                  className="w-[376px] shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden"
                >
                  <img
                    className="h-[196px] w-full object-cover hover:scale-105 transition-transform duration-300"
                    src={photographer.images[0]}
                    alt={photographer.brand}
                  />
                  <div className="p-4">
                    <div className="w-full flex justify-between items-center">
                      <p className="text-[18px] font-[600] text-gray-800 hover:text-gray-600">
                        {photographer.category}
                      </p>
                      <p className="text-gray-400 font-medium">
                        ⭐ {photographer.rating}{" "}
                        <span className="text-sm">({photographer.stock} )</span>
                      </p>
                    </div>
                    <div className="flex gap-1 text-green-500 pt-2 items-center">
                      <MapPin className="h-5 w-5" />
                      <div className="text-green-600">{photographer.title}</div>
                    </div>
                    <div className="pt-3 pl-2">
                      <p className="font-semibold text-[#B3AFB3] hover:text-gray-600 transition-colors">
                        {photographer.service}
                      </p>
                    </div>
                    <div className="pt-3 pl-2">
                      <p className="font-semibold text-[#B3AFB3]">
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
    </>
  );
}

export default Photographyy;
