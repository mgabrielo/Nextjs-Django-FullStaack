"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ReservationButtonProps {
  reservationPropertyId: string;
}
const ReservationButton: React.FC<ReservationButtonProps> = ({
  reservationPropertyId,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/properties/${reservationPropertyId}`)}
      className="cursor-pointer inline-block py-2 px-3 bg-airbnb hover:bg-airbnb-dark text-white rounded-lg mt-3"
    >
      Click Property
    </div>
  );
};

export default ReservationButton;
