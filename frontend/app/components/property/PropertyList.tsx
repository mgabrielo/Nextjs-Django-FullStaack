"use client";
import { FC, useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import { apiService } from "@/app/service/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";

export type PropertyType = {
  id: string;
  image_url: string;
  price_per_night: number;
  title: string;
  is_favorite?: boolean;
  category?: string;
};

interface PropertyListProps {
  landlordId?: string | null;
  favorites?: boolean | null;
}
const PropertyList: FC<PropertyListProps> = ({ landlordId, favorites }) => {
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const guests = searchModal.query.guests;
  const bedrooms = searchModal.query.bedrooms;
  const bathrooms = searchModal.query.bathrooms;
  const checkInDate = searchModal.query.checkIn;
  const checkOutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const markFavorite = (id: string, is_favorite: boolean) => {
    const existingProperties = properties.map((property: PropertyType) => {
      if (property.id === id) {
        property.is_favorite = is_favorite;
        if (is_favorite) {
          console.log("added to properties favorites list");
        } else {
          console.log("removed from properties favorites list");
        }
      }
      return property;
    });
    setProperties(existingProperties);
  };

  useEffect(() => {
    const getProperties = async () => {
      let url = "/api/properties/";

      if (landlordId) {
        url += `?landlord_id=${landlordId}`;
        const data = await apiService.get(url);
        setProperties(data?.property_data);
      } else if (favorites) {
        url += `?is_favorites=true`;
        const data = await apiService.getWithToken(url);
        setProperties(data?.property_data);
      } else {
        let query = "";
        if (country) {
          query += `&country=${country}`;
        }
        if (category) {
          query += `&category=${category}`;
        }
        if (guests) {
          query += `&numberOfGuest=${guests}`;
        }
        if (bedrooms) {
          query += `&numberOfBedrooms=${bedrooms}`;
        }
        if (bathrooms) {
          query += `&numberOfBathrooms=${bathrooms}`;
        }
        if (checkInDate) {
          query += `&checkIn=${format(checkInDate, "yyyy-MM-dd")}`;
        }
        if (checkOutDate) {
          query += `&checkOut=${format(checkOutDate, "yyyy-MM-dd")}`;
        }
        if (query.length) {
          query = "?" + query.substring(1);
          url += query;
        }
        const data = await apiService.get(url);
        setProperties(data?.property_data);
      }
    };
    getProperties();
  }, [category, searchModal.query]);
  return (
    <>
      {properties.length > 0 &&
        properties.map((property) => (
          <PropertyListItem
            key={property?.id}
            property={property}
            markFavorite={(is_favorite: any) =>
              markFavorite(property.id, is_favorite)
            }
          />
        ))}
    </>
  );
};

export default PropertyList;
