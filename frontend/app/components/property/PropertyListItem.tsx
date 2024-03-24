import Image from "next/image";
import React, { FC } from "react";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";

interface PropertyItemProps {
  property: PropertyType;
}
const PropertyListItem: FC<PropertyItemProps> = ({ property }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer z-10"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          src={property.image_url}
          fill
          sizes="(max-width:768px) 750px, (max-width:1200px): 768px"
          alt="img-23"
          className="hover:scale-110 object-cover transition h-full w-full"
        />
      </div>
      <div className="pt-2 px-2 w-full">
        <p className="text-md font-semibold">{property.title}</p>
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
