import React, { useState } from "react";
import { MapPin } from "lucide-react";

function Filterlocation() {
    
  const [selectedLocation, setSelectedLocation] = useState(""); // State for the selected location

  const indianCities = [
    { name: "Mumbai", pinCode: "400001", state: "Maharashtra" },
    { name: "Delhi", pinCode: "110001", state: "Delhi" },
    { name: "Bangalore", pinCode: "560001", state: "Karnataka" },
    { name: "Hyderabad", pinCode: "500001", state: "Telangana" },
    { name: "Ahmedabad", pinCode: "380001", state: "Gujarat" },
    { name: "Chennai", pinCode: "600001", state: "Tamil Nadu" },
    { name: "Kolkata", pinCode: "700001", state: "West Bengal" },
    { name: "Pune", pinCode: "411001", state: "Maharashtra" },
    { name: "Jaipur", pinCode: "302001", state: "Rajasthan" },
    { name: "Lucknow", pinCode: "226001", state: "Uttar Pradesh" },
    { name: "Kanpur", pinCode: "208001", state: "Uttar Pradesh" },
    { name: "Nagpur", pinCode: "440001", state: "Maharashtra" },
    { name: "Indore", pinCode: "452001", state: "Madhya Pradesh" },
    { name: "Bhopal", pinCode: "462001", state: "Madhya Pradesh" },
    { name: "Patna", pinCode: "800001", state: "Bihar" },
    { name: "Thane", pinCode: "400601", state: "Maharashtra" },
    { name: "Agra", pinCode: "282001", state: "Uttar Pradesh" },
    { name: "Varanasi", pinCode: "221001", state: "Uttar Pradesh" },
    { name: "Surat", pinCode: "395001", state: "Gujarat" },
    { name: "Amritsar", pinCode: "143001", state: "Punjab" },
  ];

  const handleChange = (e) => {
    setSelectedLocation(e.target.value); // Update state on change
  };

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <select
            name="location"
            value={selectedLocation} // Bind the value to state
            onChange={handleChange} // Handle changes
            className="w-full p-2 pl-10 outline-none border-2 border-gray-200 rounded-lg focus:border-red-300 transition-all duration-300"
          >
            <option value="" disabled>
              Filter location
            </option>
            {indianCities.map((option, index) => (
              <option key={index} className="bg-red-100" value={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </>
  );
}

export default Filterlocation;
