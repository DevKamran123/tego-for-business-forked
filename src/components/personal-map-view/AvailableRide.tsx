import React from "react";
import carImage from "../../assets/images/rear-view-of-white-car.svg";
import { FaUser } from "react-icons/fa6";

interface AvailableRideProps {
  type: string;
  timeOfArrival: string;
  cost: string;
  isActive: boolean;
}

const AvailableRide: React.FC<AvailableRideProps> = ({
  type,
  timeOfArrival,
  cost,
  isActive,
}) => {
  return (
    <div
      className={`flex rounded-xl justify-between items-start p-4 border  cursor-pointer ${
        isActive ? "border-darkIndigo" : "border-black/5"
      }`}
    >
      <div className="flex gap-4 items-center">
        <div className="w-[51px] h-[40px]">
          <img src={carImage} alt="rear view of white car" className="w-full" />
        </div>

        <div className="flex flex-col gap-0.5 ">
          <div className="flex items-center gap-2">
            <p className="text-black font-bold">{type}</p>

            {isActive && (
              <div className="flex items-center gap-0.5 text-xs text-black font-semibold">
                <FaUser /> <span>4</span>
              </div>
            )}
          </div>
          <p className="text-xs font-normal text-black">{timeOfArrival}</p>
        </div>
      </div>
      <p className="text-base font-bold text-darkIndigo pt-1.5">{cost}</p>
    </div>
  );
};

export default AvailableRide;
