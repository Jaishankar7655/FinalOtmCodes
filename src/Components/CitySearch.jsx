import { Search } from "lucide-react";
import React from "react";

function CitySearch({ placeholder, citySearch, setCitySearch }) {
  return (
    <div className="relative w-full lg:w-72">
      <input
        type="text"
        value={citySearch}
        onChange={(e) => setCitySearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
}

export default CitySearch;
