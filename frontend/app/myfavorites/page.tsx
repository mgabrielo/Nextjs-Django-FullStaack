import React from "react";
import { getUserId } from "../actions/serverActions";
import PropertyList from "../components/property/PropertyList";

const MyFavorites = async () => {
  const userId = await getUserId();
  return !userId ? (
    <main className="max-w-screen-2xl mx-auto px-5 py-10">
      <p>You Need to be Authenicated </p>
    </main>
  ) : (
    <main className="max-w-screen-2xl mx-auto px-5 py-10">
      <h1 className="my-3 text-lg">My Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
        <PropertyList favorites={true} />
      </div>
    </main>
  );
};

export default MyFavorites;
