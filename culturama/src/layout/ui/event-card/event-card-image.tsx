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
    // Só atualiza o src se o fallback não for uma string vazia
    if (fallbackLogo) {
      setImageSrc(fallbackLogo);
    }
  };

  if (isError) {
    return (
      <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
        {/* SÓ RENDERIZA A IMAGEM SE O SRC NÃO FOR VAZIO */}
        {fallbackLogo ? (
          <Image
            src={fallbackLogo}
            alt="Culturama"
            width={48} // Adicionado width para manter proporção com height
            height={48}
            className="w-auto opacity-70"
          />
        ) : (
          /* Se não tiver logo, você pode colocar um ícone ou a primeira letra do título */
          <span className="text-gray-400 font-bold text-xl">
            {title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={imageSrc || "/placeholder.png"} // Evita src vazio no render inicial
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      onError={handleImageError}
    />
  );
};

export default EventCardImage;
