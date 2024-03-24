"use client";
import ReservationSideBar from "@/app/components/reservations/ReservationSideBar";
import { apiService } from "@/app/service/apiService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const property = await apiService.get(`/api/properties/${id}/`);
      setProperty(property);
    };
    fetchData();
  }, [id]);

  return property ? (
    <main className="max-w-screen-2xl mx-auto px-5">
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
            {property.bathrooms} Bathrooms
          </span>
          <hr />
          <div className="py-6 flex items-center space-x-3 object-cover">
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
              <strong>{property?.landlord?.name}</strong> is your host.
            </p>
          </div>
          <hr />
          <p className="mt-5 text-lg">{property?.description}</p>
        </div>
        <ReservationSideBar property={property} />
      </div>
    </main>
  ) : null;
};

export default PropertyDetailPage;
