"use client";
import React, { useState } from "react";
import SwimIcon from "./icons/SwimIcon";
import VillaIcon from "./icons/VillaIcon";
import CabinIcon from "./icons/CabinIcon";
import TinyHome from "./icons/TinyHome";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";
import AllIcon from "./icons/AllIcon";

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState("");
  const handleSetCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: selectedCategory,
    };
    searchModal.setQuery(query);
  };
  return (
    <div className="pt-3 cursor-pointer pb-5 flex items-center space-x-5 z-0">
      <div
        onClick={() => handleSetCategory("")}
        className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100"
      >
        <AllIcon />
        <span className="text-xs pt-[2px]">All</span>
      </div>
      <div
        onClick={() => handleSetCategory("Beach")}
        className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100"
      >
        <SwimIcon />
        <span className="text-xs pt-[2px]">Beach</span>
      </div>
      <div
        onClick={() => handleSetCategory("Villas")}
        className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100"
      >
        <VillaIcon />
        <span className="text-xs pt-[2px]">Villas</span>
      </div>
      <div
        onClick={() => handleSetCategory("Cabins")}
        className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100"
      >
        <CabinIcon />
        <span className="text-xs pt-[2px]">Cabins</span>
      </div>
      <div
        onClick={() => handleSetCategory("Tiny Homes")}
        className="pb-4 flex flex-col items-center space-x-2 justify-center border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100"
      >
        <TinyHome />
        <span className="text-xs pt-[2px]">Tiny Homes</span>
      </div>
    </div>
  );
};

export default Categories;
