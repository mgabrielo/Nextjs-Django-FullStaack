"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import CustomButton from "../buttons/CustomButton";
import { Range } from "react-date-range";
import CalendarDatePicker from "../calendar/Calendar";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SaerchModal = () => {
  const searchModal = useSearchModal();
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [numberOfGuest, setNumberOfGuest] = useState<string>("1");
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<string>("0");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState<string>("0");

  const handleSearchDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }
    setDateRange(selection);
  };

  const handleCloseAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numberOfGuest),
      bedrooms: parseInt(numberOfBedrooms),
      bathrooms: parseInt(numberOfBathrooms),
      category: "",
    };
    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };

  let content = <></>;
  const contentLocation = (
    <>
      <h2 className="mb-4 text-xl">Where Would You Like To Go ?</h2>
      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />
      <div className="mt-4 flex flex-row gap-3">
        <CustomButton
          label="check-in date"
          onClick={() => searchModal.open("checkin")}
        />
      </div>
    </>
  );
  const contentCheckIn = (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="mb-4 text-xl">When Would You Like To Check-In ?</h2>
      <CalendarDatePicker
        value={dateRange}
        onChange={(value) => handleSearchDateRange(value.selection)}
      />
      <div className="w-full items-center justify-center mt-4 flex flex-row gap-3">
        <CustomButton
          label="Location"
          onClick={() => searchModal.open("location")}
          className="flex-1 text-center"
        />
        <CustomButton
          label="Check Out Date"
          onClick={() => searchModal.open("checkout")}
          className="flex-1 text-center"
        />
      </div>
    </div>
  );
  const contentCheckOut = (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="mb-4 text-xl">When Would You Like To Check-Out ?</h2>
      <CalendarDatePicker
        value={dateRange}
        onChange={(value) => handleSearchDateRange(value.selection)}
      />
      <div className="w-full items-center justify-center mt-4 flex flex-row gap-3">
        <CustomButton
          label="Check In Date"
          onClick={() => searchModal.open("checkin")}
          className="flex-1 text-center"
        />
        <CustomButton
          label="Details"
          onClick={() => searchModal.open("details")}
          className="flex-1 text-center"
        />
      </div>
    </div>
  );
  const contentDetails = (
    <div className="w-full flex flex-col">
      <h2 className="mb-4 text-xl">Details ?</h2>
      <div className="w-full mt-4 flex flex-col gap-3">
        <div className="space-y-3">
          <div className="space-y-2">
            <label>Number Of Guests</label>
            <input
              type="number"
              min={"1"}
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              placeholder="Number of Guest"
            />
          </div>
          <div className="space-y-2">
            <label>Number Of Bedrooms</label>
            <input
              type="number"
              min={"1"}
              value={numberOfBedrooms}
              onChange={(e) => setNumberOfBedrooms(e.target.value)}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label>Number Of Bathrooms</label>
            <input
              type="number"
              min={"1"}
              value={numberOfBathrooms}
              onChange={(e) => setNumberOfBathrooms(e.target.value)}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-3">
          <CustomButton
            label="Check Out Date"
            onClick={() => searchModal.open("checkout")}
          />
          <CustomButton label="Search" onClick={handleCloseAndSearch} />
        </div>
      </div>
    </div>
  );
  if (searchModal.step == "location") {
    content = contentLocation;
  } else if (searchModal.step == "checkin") {
    content = contentCheckIn;
  } else if (searchModal.step == "checkout") {
    content = contentCheckOut;
  } else if (searchModal.step == "details") {
    content = contentDetails;
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      close={searchModal.close}
      label={"Search"}
      content={content}
    />
  );
};

export default SaerchModal;
