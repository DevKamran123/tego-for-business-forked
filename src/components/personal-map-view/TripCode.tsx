import React from "react";
import CarBoldIcon from "../icons/CarBoldIcon";

interface TripCodeProps {
  code: number;
}

const TripCode: React.FC<TripCodeProps> = ({ code }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CarBoldIcon />
        <p className="text-black text-base font-normal">Trip code</p>
      </div>

      <div className="bg-deepBlue/10 py-1 px-2 rounded-lg font-bold text-lg tracking-[0.2em] text-darkBluish">
        {code}
      </div>
    </div>
  );
};

export default TripCode;
