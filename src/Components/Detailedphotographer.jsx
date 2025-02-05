import React from "react";
import photo from "../assets/images/photographer.png";

import bluetick from "../assets/images/bluetick.png";
import star from "../assets/images/star.png";
import { MapPin, PhoneCall } from "lucide-react";
function DetailedPhotographer() {
  return (
    <div className="">
      <div className=" flex lg:flw w-[80%] m-auto gap-8 pt-10 ">
        <div className="w-[738px] h-[421px] relative shadow-lg">
          <img src={photo} alt="Photographer" className="w-full h-auto " />
          <div className=" h-[192px] absolute -bottom-32 left-0 right-0 bg-white  w-[80%] m-auto  rounded-t-lg">
            <div className="p-4">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div>
                    {" "}
                    <h2 className="text-xl font-bold text-black">
                      White fox Production
                    </h2>{" "}
                  </div>
                  <div className="flex justify-center items-center ">
                    {" "}
                    <img className="w-5 h-5" src={bluetick} alt="" />{" "}
                  </div>
                </div>
                <div>
                  <div className="bg-blue-500  w-[50px] p-1 flex justify-around items-center">
                    <img className="w-3 h-3 " src={star} alt="" />
                    <span className="text-white font-bold text-xs">4.5</span>
                  </div>
                </div>
              </div>
              <div className="flex text-green-500 mt-5 items-center gap-3">
                <MapPin />
                <p className="text-sm font-semibold ">Bhopal madhya padesh </p>
              </div>
              <div className="border border-dotted border-red-200 relative  top-4"></div>
              <div className="flex gap-3 relative mt-9">
                <div className="flex items-center">
                  {" "}
                  <PhoneCall size={18} />
                </div>
                <p>Contact</p>
              </div>
            </div>
            <div className="p-4 bg-slate-200 pb-4 "></div>
          </div>
        </div>

        <div className="w-[40%] shadow-2xl  rounded-lg">
          <div className="flex justify-between px-4 py-3">
            <div>
              <p>PerDay price Estimate </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-red-500">Price info</p>{" "}
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default DetailedPhotographer;
