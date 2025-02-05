import axios from "axios";
import React, { useEffect, useState } from "react";
import heroimage from "../assets/images/heroimage.png";
import Shimmerefect from "./Shimmerefect";
import { Link } from "react-router-dom";

function Mehndisectio() {
  const [data, setdata] = useState([]);
  const url = "https://dummyjson.com/products";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.products);
        setdata(res.data.products);
      })
      .catch((err) => {
        console.log("error fetching data ", err);
      });
  }, []);

  return (
    <>
      {
        data.length===0 ?(<>
          <Shimmerefect/>
        </>):
        <div className="w-full max-w-7xl mx-auto p-4 border border-gray-200 rounded-lg shadow-sm mt-4 ">
          {data.map((product) => {
            return (
              <div
                key={product.id}
                className="flex flex-col lg:flex-row items-center gap-6 my-10"
              >
                {/* Image Container */}
                <div className="w-full lg:w-[250px] h-[250px] lg:h-[250px] rounded-md overflow-hidden shadow-md flex-shrink-0">
                  <img
                    src={product.thumbnail}
                    alt="Mehndi Decoration"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="w-full space-y-4">
                  <h1 className="text-3xl lg:text-2xl font-bold text-gray-800 leading-tight">
                    {product.title}
                  </h1>

                  <p className="text-slate-600 text-base leading-relaxed">
                    {product.description}
                  </p>

                  <p className="text-xl text-blue-600 font-semibold">
                    {Math.round(product.price * 84.85)} ₹ {`(INR)`}
                  </p>

                  <div className="pt-2">
                   <Link to={`/Mendidetailed/${product.id}`} >
                   <button className="bg-red-700 hover:bg-red-800 px-8 py-3 text-white rounded-md transition-colors duration-300 shadow-md active:scale-95">
                      Book Now
                    </button>
                   </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
}

export default Mehndisectio;
