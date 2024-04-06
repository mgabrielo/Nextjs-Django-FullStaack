"use client";

import React, { FC, useEffect } from "react";
import HeartIcon from "../icons/HeartIcon";
import { apiService } from "@/app/service/apiService";
import HeartIconOutlIned from "../icons/HeartIconOutlIned";

interface FavoriteProps {
  id: string;
  isFavorite?: boolean;
  markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: FC<FavoriteProps> = ({
  id,
  isFavorite,
  markFavorite,
}) => {
  const toggleFavorite = async (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    const response = await apiService.postWithToken(
      `/api/properties/toggle_favorite/${id}/`,
      {}
    );
    markFavorite(response?.data?.is_favorite);
  };

  useEffect(() => {
    if (id) {
      toggleFavorite();
    }
  }, [id]);
  return (
    <div
      onClick={toggleFavorite}
      className={`absolute top-2 right-2 ${
        isFavorite ? "text-airbnb" : "text-gray-500"
      } hover:text-airbnb`}
    >
      {isFavorite ? <HeartIcon /> : <HeartIconOutlIned />}
    </div>
  );
};

export default FavoriteButton;
