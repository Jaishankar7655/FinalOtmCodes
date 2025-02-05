import React from "react";
import { Home, MessageCircle, Share, File } from "lucide-react";
import {Link} from "react-router-dom"

const BottomNavStrip = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full md:hidden bg-slate-100">
      <nav className="flex justify-evenly items-center bg-white border-t border-gray-200 p-4">
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <Link to="/">
            {" "}
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Chat</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <Share size={24} />
          <span className="text-xs mt-1">Share</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <File size={24} />
          <span className="text-xs mt-1">Files</span>
        </button>
      </nav>
    </div>
  );
};

export default BottomNavStrip;
