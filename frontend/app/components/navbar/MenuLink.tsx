"use client";
import React, { FC } from "react";

interface IMenuLink {
  label?: string;
  className?: string;
  onClick?: () => void;
}

const MenuLink: FC<IMenuLink> = ({ label, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition${className}`}
    >
      {label}
    </div>
  );
};

export default MenuLink;
