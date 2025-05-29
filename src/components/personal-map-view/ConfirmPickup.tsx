import React from "react";
import locationPin from "../../assets/svgs/location-pin.svg";
import PencilIcon from "../icons/PencilIcon";
import CustomButton from "../buttons/CustomButton";

interface ConfirmPickupProps {
  open: boolean;
  destination: string;
  onConfirm: () => void;
  isConfirmed: boolean;
  onEdit: () => void;
  rideSelected: boolean;
}

const ConfirmPickup: React.FC<ConfirmPickupProps> = ({
  open,
  destination,
  onConfirm,
  isConfirmed,
  onEdit,
  rideSelected,
}) => {
  const handleConfirmation = () => {
    onConfirm();
  };

  const editPickUpDetails = () => {
    onEdit();
  };

  return (
    open && (
      <div className="max-w-[370px] lg:max-w-[500px] xl:max-w-[600px] w-full absolute left-1/2 transform -translate-x-1/2 top-[30px] z-20 bg-white shadow-lg rounded-2xl px-4 py-5">
        {!isConfirmed && (
          <h4 className="text-black font-semibold text-base xl:text-lg px-4">
            Confirm pick up location
          </h4>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center justify-center size-[50px] xl:size-[65px] rounded-full bg-[#f8f8f8]">
              <div className="size-[30px] xl:size-[35px]">
                <img
                  src={locationPin}
                  alt="location pin icon"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-black/60 text-sm md:text-base lg:text-lg">
                Pickup location
              </p>
              <h4 className="text-xl font-semibold text-black">
                {destination}
              </h4>
            </div>
          </div>

          {!rideSelected && (
            <button
              onClick={editPickUpDetails}
              className="hover:bg-[#f8f8f8] rounded-full p-4"
            >
              <PencilIcon width={25} height={25} />
            </button>
          )}
        </div>

        {!isConfirmed && (
          <div className="mt-4 flex justify-end">
            <CustomButton
              onClick={handleConfirmation}
              className="!py-3"
            >
              Confirm pickup
            </CustomButton>
          </div>
        )}
      </div>
    )
  );
};

export default ConfirmPickup;
