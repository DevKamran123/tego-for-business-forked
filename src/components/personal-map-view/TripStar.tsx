import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface TripStarProps {
  rating: number;
  handleClick: (index: number) => void;
}

const TripStar: React.FC<TripStarProps> = ({ rating, handleClick }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex items-center gap-3">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className="cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          <FaStar
            size={20}
            color={index < (hoverRating || rating) ? "#EFBE0C" : "#E6EAEE"}
            className="transition-colors duration-200"
          />
        </button>
      ))}
    </div>
  );
};

export default TripStar;
