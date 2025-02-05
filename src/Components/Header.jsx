import React from "react";
import pencilEditIcon from "../assets/svg/penciledit.svg";
import mobile from "../assets/svg/mobile.svg";

function Header() {
  return (
    <header className="w-full bg-[#C90808] flex items-center justify-between lg:px-[45px] py-2 px-8">
      <div className="hidden lg:flex" >
        <a href="#" className="text-white  text-2xl  font-normal">
          India's Favourite Wedding Planning Platform
        </a>
      </div>
      <nav className="flex  justify-between lg:w-96 w-full ">
        {/* First Review Link */}
        <div className="flex items-center gap-2 text-white cursor-pointer">
          <img 
            className="h-[14px] w-[14px]" 
            src={pencilEditIcon} 
            alt="Write a review" 
          />
          <span md >Write a review</span>
        </div>
        
        {/* Second App Link */}
        <div className="flex items-center gap-2 text-white cursor-pointer">
          <img 
            className="h-[14px] w-[14px]" 
            src={mobile} 
            alt="Write a review" 
          />
          <span>Download App</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;