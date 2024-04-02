"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { resetAuthCookies } from "@/app/actions/serverActions";
import MenuLink from "../navbar/MenuLink";

const LogOutButton = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  const router = useRouter();
  const handleLogOut = () => {
    resetAuthCookies();
    router.push("/");
    setIsOpen(false);
  };
  return <MenuLink label="Log Out" onClick={handleLogOut} className="z-50" />;
};

export default LogOutButton;
