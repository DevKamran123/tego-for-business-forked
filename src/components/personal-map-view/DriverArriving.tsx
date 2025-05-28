import React from "react";
import DriverCard from "./DriverCard";

interface DriverArrivingProps {
  cost: number;
}

const DriverArriving: React.FC<DriverArrivingProps> = ({ cost }) => {
  return (
    <div>
      <p className="text-xl font-bold text-black">Arriving in 1-3mins</p>

      <div className=" pt-4 mt-4 border-t border-t-black/5">
        <DriverCard cost={cost} />
      </div>
    </div>
  );
};

export default DriverArriving;
