import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchFilter from "./SearchFilter";
import UserNav from "./UserNav";
import AddPropertyButton from "../buttons/AddPropertyButton";

const Navbar = ({ userId }: { userId: string | null }) => {
  return (
    <nav className="w-full fixed top-0 left-0 py-4 border-b bg-white z-10">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <div className="flex w-24 h-12 object-cover">
              <Image
                src={"/airbnb-logo.jpg"}
                alt="Django-AirBnb"
                width={100}
                height={100}
              />
            </div>
          </Link>
          <div className="flex space-x-5 px-1">
            <SearchFilter />
          </div>
          <div className="flex items-center space-x-5">
            <AddPropertyButton userId={userId} />
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
