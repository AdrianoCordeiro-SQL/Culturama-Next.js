"use client";

import Image from "next/image";
import { useState } from "react";

interface EventCardImageProps {
  imageUrl: string;
  title: string;
  fallbackLogo: string;
}

const EventCardImage = ({
  imageUrl,
  title,
  fallbackLogo,
}: EventCardImageProps) => {
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
    setImageSrc(fallbackLogo);
  };

  if (isError) {
    return (
      <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
        <Image
          src={fallbackLogo}
          alt={"Culturama"}
          height={48}
          className="w-auto opacity-70"
        />
      </div>
    );
  }
  return (
    <Image
      src={imageSrc}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      onError={handleImageError}
    />
  );
};

export default EventCardImage;
