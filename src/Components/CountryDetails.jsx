import React, { useEffect, useState } from "react";
import axios from "axios";

function CountryDetails() {
  const [data, setData] = useState([]);
  const url = "https://dummyjson.com/products";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.products);
        setData(res.data.products); // Accessing products correctly
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="w-[90%] m-auto py-5 ">
      {data.map((product) => (
        <div
          key={product.id}
          className="w-full shadow-lg border rounded-lg flex gap-5 p-4 mb-6 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Left: Image */}
          <div className="w-[200px] h-[120px]">
            <img
              className="w-full h-full object-cover rounded-sm"
              src={product.thumbnail || "https://via.placeholder.com/200"}
              alt={product.title}
            />
          </div>
          {/* Right: Content */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-sm text-gray-600 mt-2">
              {product.description.length > 150
                ? `${product.description.slice(0, 150)}...`
                : product.description}
            </p>
            <div className="mt-4">
              <p className="font-medium">Price: ${product.price}</p>
              <p className="font-medium">Stock: {product.stock}</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountryDetails;
