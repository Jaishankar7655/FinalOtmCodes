import React from "react";
import { X } from "lucide-react";

function Searchfield() {
  return (
    <div className="absolute w-full bg-white shadow-xl top-0 py-9">
      <div className="absolute top-2 right-2">
        <X className="text-gray-600 cursor-pointer" />
      </div>
      
      <div className="flex justify-center items-center space-x-2 px-4 top- relative">
        <div className="flex-grow border rounded">
          <input 
            type="text" 
            className="w-full px-2 py-2 rounded" 
            placeholder="Search..."
          />
        </div>
        <div>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchfield;