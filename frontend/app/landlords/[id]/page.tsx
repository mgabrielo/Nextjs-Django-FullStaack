import ContactButton from "@/app/components/buttons/ContactButton";
import PropertyList from "@/app/components/property/PropertyList";
import Image from "next/image";
import React from "react";

const LandLordDetailPage = () => {
  return (
    <main className="max-w-screen-2xl mx-auto px-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <aside className="col-span-3 md:col-span-1 mb-4">
          <div className="flex flex-col items-center p-4 rounded-xl border border-gray-300 shadow-xl">
            <Image
              src={"/profile.png"}
              width={200}
              height={200}
              alt="land-lord"
              className="rounded-full"
            />
            <h1 className="text-lg mt-3">Landlord Name</h1>
            <ContactButton />
          </div>
        </aside>
        <div className="col-span-3 pl-0 md:pl-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
          <PropertyList />
        </div>
      </div>
    </main>
  );
};

export default LandLordDetailPage;
