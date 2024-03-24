"use client";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import { apiService } from "@/app/service/apiService";

export type PropertyType = {
  id: string;
  image_url: string;
  price_per_night: number;
  title: string;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  useEffect(() => {
    const getProperties = async () => {
      const data = await apiService.get(`/api/properties/`);
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
