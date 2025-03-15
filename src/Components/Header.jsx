import React from "react";
import { Link } from "react-router-dom";
import { Handshake, Phone } from "lucide-react";

function Header() {
  return (
    <header className="w-full bg-[#C90808] flex items-center justify-between lg:px-[45px] py-2 px-8 fixed top-0 z-50">
      <div className="hidden lg:flex">
        <a href="#" className="text-white text-2xl font-normal">
        India favourite event management platform
        </a>
      </div>
      <nav className="flex justify-between md:gap-10 lg:w-96 w-full">
        {/* First Review Link */}
        <Link
          to="https://vendor.onetouchmoments.com"
          className="flex items-center space-x-2 text-white font-medium py-2"
        >
          <Handshake size={18} />
          <span>I am Vendor</span>
        </Link>

        {/* Second App Link */}
        <div className="flex items-center gap-2 text-white cursor-pointer">
          <Phone />
          <span>Download App</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;