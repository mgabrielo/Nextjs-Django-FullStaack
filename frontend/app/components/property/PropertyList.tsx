"use client";
import { FC, useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import { apiService } from "@/app/service/apiService";

export type PropertyType = {
  id: string;
  image_url: string;
  price_per_night: number;
  title: string;
};

interface PropertyListProps {
  landlordId?: string | null;
}
const PropertyList: FC<PropertyListProps> = ({ landlordId }) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  useEffect(() => {
    const getProperties = async () => {
      let url = "/api/properties/";
      if (landlordId) {
        url += `?landlord_id=${landlordId}`;
      }
      const data = await apiService.get(url);
      setProperties(data);
    };
    getProperties();
  }, []);
  return (
    <>
      {properties.length > 0 &&
        properties.map((property) => (
          <PropertyListItem key={property?.id} property={property} />
        ))}
    </>
  );
};

export default PropertyList;
