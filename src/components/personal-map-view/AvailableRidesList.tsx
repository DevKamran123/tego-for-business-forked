import React, { useState } from "react";
import { BsClockFill } from "react-icons/bs";
import CustomButton from "../buttons/CustomButton";
import { TbCreditCardFilled } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa6";
import AvailableRide from "./AvailableRide";
import RideInfoWrapper from "./RideInfoWrapper";

interface AvailableRidesListProps {
  open: boolean;
  onBook: () => void;
}

const AvailableRidesList: React.FC<AvailableRidesListProps> = ({
  open,
  onBook,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closestRides = [
    {
      type: "Tego StanD",
      approxArrivalTime: "1 min away",
      cost: "$6.20",
    },
    {
      type: "Tego XL",
      approxArrivalTime: "1hr 39min away",
      cost: "$12.00",
    },
    {
      type: "Tego Comfort",
      approxArrivalTime: "1hr 39min away",
      cost: "$8.07",
    },
  ];

  const onSelectRide = (index: number) => {
    setActiveIndex(index);
  };

  const handleBookClick = () => {
    onBook();
  };

  return (
    open && (
      <RideInfoWrapper title="Available Rides">
        <div className="flex flex-col gap-4">
          {closestRides.map((ride, index) => (
            <div
              className=""
              key={index}
              role="button"
              onClick={() => onSelectRide(index)}
            >
              <AvailableRide
                type={ride.type}
                timeOfArrival={ride.approxArrivalTime}
                cost={ride.cost}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </div>

        <div
          role="button"
          className="cursor-pointer bg-[#f8f8f8] flex items-center justify-between px-5 py-2.5 rounded-xl mt-4  text-sm xl:text-base"
        >
          <div className="flex items-center gap-2">
            <TbCreditCardFilled />
            Visa 3455
          </div>

          <FaAngleRight />
        </div>

        <div className="mt-4 flex items-center gap-2 justify-between">
          <button className="text-darkIndigo w-[90%] flex items-center gap-1.5 xl:gap-2 text-sm xl:text-base">
            Schedule trip
            <BsClockFill size={16} className="text-darkIndigo" />
          </button>
          <CustomButton
            disabled={activeIndex === null}
            className="w-full"
            onClick={handleBookClick}
          >
            Book now
          </CustomButton>
        </div>
      </RideInfoWrapper>
    )
  );
};

export default AvailableRidesList;
