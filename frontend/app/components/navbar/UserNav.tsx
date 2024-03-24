"use client";
import React, { FC, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import UserIcon from "../icons/UserIcon";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import LogOutButton from "../buttons/LogOutButton";

interface IUSerNav {
  userId?: string | null;
}

const UserNav: FC<IUSerNav> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logInModal = useLoginModal();
  const signUpModal = useSignUpModal();
  return (
    <>
      <div className="inset-0 fixed -z-10" onClick={() => setIsOpen(false)} />
      <div className="p-2 relative inline-block rounded-full border">
        <button
          className="flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
          <UserIcon />
        </button>
        {isOpen && (
          <div className="w-[220px] absolute top-[42px] z-20 right-0 bg-white border-1 border-gray-300  rounded-b-lg shadow-md">
            {userId ? (
              <LogOutButton setIsOpen={(value) => setIsOpen(value)} />
            ) : (
              <>
                <MenuLink
                  label="Log In"
                  onClick={() => {
                    setIsOpen(false);
                    logInModal.open();
                  }}
                />
                <MenuLink
                  label="Sign Up"
                  onClick={() => {
                    setIsOpen(false);
                    signUpModal.open();
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserNav;
