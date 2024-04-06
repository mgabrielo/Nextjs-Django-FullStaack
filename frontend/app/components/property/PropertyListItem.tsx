import Image from "next/image";
import React, { FC } from "react";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../buttons/FavoriteButton";

interface PropertyItemProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: FC<PropertyItemProps> = ({
  property,
  markFavorite,
}) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer z-0"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl">
        {property?.image_url !== undefined && (
          <Image
            src={property?.image_url}
            fill
            sizes="(max-width:768px) 750px, (max-width:1200px): 768px"
            alt="img-23"
            className="hover:scale-110 object-cover transition h-full w-full"
          />
        )}
        {markFavorite && (
          <FavoriteButton
            id={property?.id}
            isFavorite={property?.is_favorite}
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )}
      </div>
      <div className="pt-2 px-2 w-full">
        <p className="text-md font-semibold">{property.title}</p>
        <p className="text-sm text-gray-500 font-semibold pt-1">
          Category:&nbsp;{property?.category}
        </p>
      </div>
      <div className="pt-2 px-2 w-full">
        <p className="text-sm  font-medium">
          <strong>${property.price_per_night}</strong> per Night
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
