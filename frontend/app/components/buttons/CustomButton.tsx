"use client";
import React from "react";

const CustomButton = ({
  label,
  onClick,
  className,
}: {
  label?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-block py-2 px-3 bg-airbnb hover:bg-airbnb-dark text-white rounded-lg transition cursor-pointer ${className}`}
    >
      {label}
    </div>
  );
};

export default CustomButton;
