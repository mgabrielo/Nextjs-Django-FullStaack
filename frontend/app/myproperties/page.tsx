import React from "react";
import PropertyList from "../components/property/PropertyList";

const MyProperties = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 pb-4">
      <h1 className="my-3 text-lg">MyProperties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
        <PropertyList />
      </div>
    </div>
  );
};

export default MyProperties;
