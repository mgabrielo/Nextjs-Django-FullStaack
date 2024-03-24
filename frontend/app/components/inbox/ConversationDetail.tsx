"use client";
import React from "react";
import CustomButton from "../buttons/CustomButton";

const ConversationDetail = () => {
  return (
    <div className="w-full mx-auto relative">
      <div className="max-h-[400px] px-3 mt-4 overflow-auto flex flex-col space-y-4">
        <div className="w-[80%] py-4 px-6 rounded-lg bg-gray-200">
          <p className="font-bold text-gray-500">Jon Doe</p>
          <p>Message </p>
        </div>
        <div className="w-[80%] py-4 px-6 rounded-lg bg-blue-200 ml-[20%]">
          <p className="font-bold text-gray-blue">grey scott</p>
          <p>Message </p>
        </div>
      </div>

      <div className="w-full px-3 bottom-0 fixed py-3 flex items-center border border-gray-300 space-x-3 rounded-lg">
        <input
          type="text"
          placeholder="type your message"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />
        <CustomButton label="Send" onClick={() => console.log("send")} />
      </div>
    </div>
  );
};

export default ConversationDetail;
