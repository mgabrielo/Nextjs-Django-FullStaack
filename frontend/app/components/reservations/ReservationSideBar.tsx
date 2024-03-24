import React, { FC } from "react";

export type Property = {
  id: string;
  price_per_night: number;
  guests: number;
};
interface ReservationProps {
  property: Property;
}
const ReservationSideBar: FC<ReservationProps> = ({ property }) => {
  return (
    <aside className="p-6 mt-6 mb-4 border flex flex-col col-span-2 border-gray-300 shadow-xl rounded-xl">
      <h2 className="mb-3 text-xl">${property?.price_per_night} Per Night</h2>
      <div className="mb-4 p-3 border border-gray-400 rounded-xl">
        <label className="block font-bold text-xs"> Guests</label>
        <select className="w-full ml-1 text-sm py-1 mt-1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="w-full mb-4 py-4 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl">
        Book
      </div>
      <div className="mb-4 px-2 flex justify-between items-center">
        <p>
          ${property?.price_per_night} * {property?.guests} Nights
        </p>
        <p>${property?.price_per_night * property?.guests}</p>
      </div>
      <div className="mb-4 px-2 flex justify-between items-center">
        <p>Service Fee:</p>
        <p>$30</p>
      </div>
      <hr />
      <div className="mt-3 px-2 flex justify-between items-center">
        <p>Total Price:</p>
        <p>${property?.price_per_night * property?.guests + 30}</p>
      </div>
    </aside>
  );
};

export default ReservationSideBar;
