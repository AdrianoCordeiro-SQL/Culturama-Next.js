import { useState } from 'react';
import Button from './Button';
import logo from '../assets/logo.png';

interface EventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  onViewClick?: () => void;
}

const EventCard = ({ imageUrl, title, date, location, onViewClick }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-[#D9D9D9] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 h-full flex flex-col">
      <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <img
              src={logo}
              alt="Culturama"
              className="h-12 w-auto opacity-70"
            />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-fjalla mb-3 text-black h-12 flex items-start leading-tight" style={{ fontFamily: "'Fjalla One', sans-serif" }}>
          {title}
        </h3>

        <p className="text-base mb-1 text-black" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          {date}
        </p>

        <p className="text-base mb-4 text-black" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          {location}
        </p>

        <div className="mt-auto">
          <Button onClick={onViewClick} className="w-full sm:w-auto">
            Ver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;