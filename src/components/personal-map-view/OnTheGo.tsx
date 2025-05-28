import React from "react";
import DriverCard from "./DriverCard";
import RideCountdown from "./RideCountdown";

interface OnTheGoProps {
  cost: number;
}

const OnTheGo: React.FC<OnTheGoProps> = ({ cost }) => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl font-bold text-black">On the go</p>
        <RideCountdown timer="05m : 30s" />
      </div>

      <div className=" pt-4 mt-4 border-t border-t-black/5">
        <DriverCard cost={cost} />
      </div>
    </div>
  );
};

export default OnTheGo;
