import React from "react";

function Shimmerefect() {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-sm mt-5 py-5 flex-col gap-10">
        {Array.from({ length: 30 }).map((el, i) => {
          return (
            <div className="flex p-1 gap-3  ">
              <div className="w-[300px] h-[200px] bg-slate-300 rounded:sm animate-pulse"></div>
              <div className="w-full">
                <div className="w-[300px] rounded-lg   bg-slate-300 p-4  animate-pulse "></div>
                <div className="w-[90%] p-3 bg-slate-300 mt-2 rounded-lg  animate-pulse "></div>
                <div className="w-[90%] p-3 bg-slate-300 mt-2 rounded-lg  animate-pulse "></div>
                <div className="w-[20%] p-3 bg-slate-300 mt-5 rounded-lg   animate-pulse"></div>
                <div className="w-[20%] p-3 bg-slate-300 mt-5 rounded-lg  animate-pulse "></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Shimmerefect;
