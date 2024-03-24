"use client";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import React, { FC } from "react";

interface AddPropertyButtonProps {
  userId?: string | null;
}
const AddPropertyButton: FC<AddPropertyButtonProps> = ({ userId }) => {
  const addPropertyModal = useAddPropertyModal();
  const loginModal = useLoginModal();
  const handleModal = () => {
    if (userId == null) {
      loginModal.open();
    } else {
      addPropertyModal.open();
    }
  };
  return (
    <div
      onClick={handleModal}
      className="p-2 text-sm cursor-pointer font-semibold rounded-full hover:bg-gray-200"
    >
      Add Airbnb Home
    </div>
  );
};

export default AddPropertyButton;
