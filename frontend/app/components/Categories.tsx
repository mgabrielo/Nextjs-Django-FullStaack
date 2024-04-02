import React from "react";
import SwimIcon from "./icons/SwimIcon";

const Categories = () => {
  return (
    <div className="pt-3 cursor-pointer pb-5 flex items-center space-x-5 z-0">
      <div className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
        <SwimIcon />
        <span className="text-xs pt-[2px]">Beach</span>
      </div>
      <div className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
        <SwimIcon />
        <span className="text-xs pt-[2px]">Villas</span>
      </div>
      <div className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
        <SwimIcon />
        <span className="text-xs pt-[2px]">Cabins</span>
      </div>
      <div className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100">
        <SwimIcon />
        <span className="text-xs pt-[2px]">Tiny Homes</span>
      </div>
    </div>
  );
};

export default Categories;
