import Image from "next/image";
import React from "react";

const MyReservationsPage = () => {
  return (
    <main className="max-w-screen-2xl mx-auto px-5 pb-4">
      <div className="pt-2 pb-2">
        <h1 className="mt-3 mb-5 text-xl px-3"> My Reservations</h1>
        <div className="space-y-3">
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 rounded-lg shadow-md border border-gray-300">
            <div className="col-span-3 md:col-span-1">
              <div className="relative overflow-hidden aspect-square rounded-xl object-cover ">
                <Image
                  src={"/images/download-33.jpg"}
                  className="hover:scale-110 transition h-full w-full "
                  fill
                  alt="img-house"
                />
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <h2 className="mb-4 text-lg">Property Name</h2>
              <p>
                <strong>Check In Date:</strong> 14/02/2034
              </p>
              <p>
                <strong>Check Out Date:</strong> 14/02/2034
              </p>
              <p>
                <strong>Number of Nights:</strong> 2
              </p>
              <p>
                <strong>Total Price:</strong> $3750
              </p>
              <div />
              <div className="cursor-pointer inline-block py-2 px-3 bg-airbnb hover:bg-airbnb-dark text-white rounded-lg mt-3">
                Click Property
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyReservationsPage;
