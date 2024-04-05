import React from "react";
import ReservationSideBar from "@/app/components/reservations/ReservationSideBar";
import { apiService } from "@/app/service/apiService";
import Image from "next/image";
import { getUserId } from "@/app/actions/serverActions";
import Link from "next/link";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await apiService.get(`/api/properties/${params.id}/`);
  const userId = await getUserId();
  return (
    <main className="max-w-screen-2xl mx-auto px-5 z-20">
      {/* use or add higher z-index on layouts to make it acessible above the modal that has lesser z-index */}
      <div className="w-full h-[64vh] overflow-hidden object-cover rounded-xl relative mt-3">
        <Image
          src={property?.image_url}
          fill
          alt="img-23"
          className="w-full h-full"
        />
      </div>
      <div className="pt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="col-span-3 py-4 pr-3">
          <h1 className="pt-2 text-lg font-semibold">{property?.title}</h1>
          <span className="mb-4 block text-md text-gray-500">
            {property?.guests} Guests - {property?.bedrooms} Bedrooms -{" "}
            {property?.bathrooms} Bathrooms
          </span>
          <hr />
          <Link
            href={`/landlords/${property?.landlord?.id}`}
            className="py-6 flex items-center space-x-3 object-cover"
          >
            {property?.landlord?.avatar_url && (
              <Image
                src={property?.landlord?.avatar_url}
                width={50}
                height={50}
                className="rounded-full"
                alt="landlord"
              />
            )}
            <p className="font-normal text-md">
              <strong>{property?.landlord?.email}</strong> is your host.
            </p>
          </Link>
          <hr />
          <p className="mt-5 text-lg">{property?.description}</p>
        </div>
        <ReservationSideBar property={property} userId={userId} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
