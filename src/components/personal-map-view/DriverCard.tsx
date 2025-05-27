import React from "react";
import driverProfilePic from "../../assets/images/driver-for-trip.png";
import ratingStar from "../../assets/svgs/rating-star.svg";
import CarBoldIcon from "../icons/CarBoldIcon";

interface DriverCardProps {
  cost?: number;
}

const DriverCard: React.FC<DriverCardProps> = ({ cost }) => {
  return (
    <div className="bg-darkBluish p-4 rounded-xl flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[50px] rounded-full">
          <img
            src={driverProfilePic}
            alt="driver profile picture"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <p className="text-white font-bold text-sm">Andrew Pan</p>

            <div className="flex items-center gap-[1px]">
              <div className="size-[13px]">
                <img src={ratingStar} alt="rating icon" className="w-full" />
              </div>
              <p className="text-xs font-semibold text-[#EAAE00]">4</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <CarBoldIcon color="#B3B3B3" size={13} />
            <p className="text-xs font-normal text-white">Red Accord-124DGK</p>
          </div>
        </div>
      </div>

      {cost && (
        <p className="text-white font-bold text-sm">{`$${cost.toFixed(2)}`}</p>
      )}
    </div>
  );
};

export default DriverCard;
