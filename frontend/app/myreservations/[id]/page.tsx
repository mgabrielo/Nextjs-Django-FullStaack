import ReservationButton from "@/app/components/buttons/ReservationButton";
import { apiService } from "@/app/service/apiService";
import Image from "next/image";
import React from "react";

const MyReservationsPage = async ({ params }: { params: { id: string } }) => {
  const reservations = await apiService.getWithToken(
    `/api/auth/myreservations/${params.id}/`
  );

  return (
    <main className="max-w-screen-2xl mx-auto px-5 pb-4">
      <div className="pt-2 pb-2">
        <h1 className="mt-3 mb-5 text-xl px-3"> My Reservations</h1>
        <div className="space-y-3">
          {reservations.length > 0 &&
            reservations.map((reservation: any) => (
              <div
                key={reservation?.id}
                className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 rounded-lg shadow-md border border-gray-300"
              >
                <div className="col-span-3 md:col-span-1">
                  <div className="relative overflow-hidden aspect-square rounded-xl object-cover ">
                    <Image
                      src={reservation?.property?.image_url}
                      className="hover:scale-110 transition h-full w-full "
                      fill
                      alt="img-house"
                    />
                  </div>
                </div>
                <div className="col-span-3 space-y-2">
                  <h2 className="mb-4 text-lg">
                    {reservation?.property?.title}
                  </h2>
                  <p>
                    <strong>Check In Date:</strong> {reservation?.start_date}
                  </p>
                  <p>
                    <strong>Check Out Date:</strong> {reservation?.end_date}
                  </p>
                  <p>
                    <strong>Number of Nights:</strong>{" "}
                    {reservation?.number_of_nights}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${reservation?.total_price}
                  </p>
                  <div />
                  <ReservationButton
                    reservationPropertyId={reservation?.property?.id}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default MyReservationsPage;
