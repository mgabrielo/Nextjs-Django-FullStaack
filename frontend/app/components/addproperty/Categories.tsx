import React, { FC } from "react";
import SwimIcon from "../icons/SwimIcon";
import VillaIcon from "../icons/VillaIcon";
import CabinIcon from "../icons/CabinIcon";
import TinyHome from "../icons/TinyHome";
interface ICategories {
  dataCategory?: string;
  setDatacategory?: (category: string) => void;
}
const Categories: FC<ICategories> = ({ dataCategory, setDatacategory }) => {
  return (
    <div className="w-full pt-3 cursor-pointer pb-6 flex items-center space-x-3">
      <div
        onClick={() =>
          setDatacategory !== undefined && setDatacategory("Beach")
        }
        className={`min-w-[50px] pb-4 flex flex-col justify-center items-center ${
          dataCategory == "Beach" ? "border-gray-800" : "border-white"
        } border-b-2  hover:border-gray-800 opacity-60 hover:opacity-100`}
      >
        <SwimIcon />
        <span className="text-xs pt-[2px]">Beach</span>
      </div>
      <div
        onClick={() =>
          setDatacategory !== undefined && setDatacategory("Villas")
        }
        className={`min-w-[50px] pb-4 flex flex-col justify-center items-center ${
          dataCategory == "Villas" ? "border-gray-800" : "border-white"
        } border-b-2  hover:border-gray-800 opacity-60 hover:opacity-100`}
      >
        <VillaIcon />
        <span className="text-xs pt-[2px]">Villas</span>
      </div>
      <div
        onClick={() =>
          setDatacategory !== undefined && setDatacategory("Cabins")
        }
        className={`min-w-[50px] pb-4 flex flex-col justify-center items-center ${
          dataCategory == "Cabins" ? "border-gray-800" : "border-white"
        } border-b-2  hover:border-gray-800 opacity-60 hover:opacity-100`}
      >
        <CabinIcon />
        <span className="text-xs pt-[2px]">Cabins</span>
      </div>
      <div
        onClick={() =>
          setDatacategory !== undefined && setDatacategory("Tiny Homes")
        }
        className={`min-w-[50px] pb-4 flex flex-col justify-center items-center ${
          dataCategory == "Tiny Homes" ? "border-gray-800" : "border-white"
        } border-b-2  hover:border-gray-800 opacity-60 hover:opacity-100`}
      >
        <TinyHome />
        <span className="text-xs pt-[2px]">Tiny Homes</span>
      </div>
    </div>
  );
};

export default Categories;
