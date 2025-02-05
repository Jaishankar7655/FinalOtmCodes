import React, { useState } from "react";
import { Search } from "lucide-react";

function Searchmenu() {
  

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <input type="text" placeholder="Search for product"   className="w-full p-2 pl-10 outline-none border-2 border-gray-200 rounded-lg focus:border-red-300 transition-all duration-300" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </>
  );
}

export default Searchmenu;
