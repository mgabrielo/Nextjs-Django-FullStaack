"use client";
import React from "react";
import SearchIcon from "../icons/SearchIcon";
import useSearchModal from "@/app/hooks/useSearchModal";

const SearchFilter = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={() => searchModal.open("location")}
      className="h-[54px] flex flex-row items-center justify-between border rounded-full"
    >
      <div className="hidden lg:flex">
        <div className="flex flex-row items-center justify-between">
          <div className="w-[150px] h-[50px] cursor-pointer justify-center px-8 flex flex-col rounded-full hover:bg-gray-300">
            <p className="text-xs font-semibold">Where</p>
            <p className="text-sm ">Location</p>
          </div>
          <div className="w-fit h-[50px] cursor-pointer justify-center px-8 flex flex-col rounded-full hover:bg-gray-300">
            <p className="text-xs font-semibold">Check-In</p>
            <p className="text-sm ">Add date</p>
          </div>
          <div className="w-fit h-[50px] cursor-pointer justify-center px-8 flex flex-col rounded-full hover:bg-gray-300">
            <p className="text-xs font-semibold">Check-Out</p>
            <p className="text-sm ">Add Date</p>
          </div>
          <div className="w-fit h-[50px] cursor-pointer justify-center px-8 flex flex-col rounded-full hover:bg-gray-300">
            <p className="text-xs font-semibold">Who</p>
            <p className="text-sm ">Add Guest</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="p-1 lg:p-2 bg-airbnb hover:bg-airbnb-dark cursor-pointer rounded-full text-white">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
