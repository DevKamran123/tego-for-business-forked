import React from "react";
import RideInfoWrapper from "./RideInfoWrapper";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FiPhoneCall } from "react-icons/fi";
import TripCode from "./TripCode";
import DriverCard from "./DriverCard";

interface DriverDetailsProps {
  open: boolean;
  onCancel: () => void;
}
const DriverDetails: React.FC<DriverDetailsProps> = ({ open, onCancel }) => {
  return (
    open && (
      <RideInfoWrapper title="Driver Details">
        <p className="text-xl font-bold text-black">Arriving in 1-3mins</p>

        <div className=" pt-4 mt-4 border-t border-t-black/5">
          <DriverCard cost={6.2} />
        </div>

        <div className="mt-8">
          <TripCode code={544432} />
        </div>

        <div className="flex justify-between items-center gap-4 pt-4 mt-4 border-t border-t-black/5">
          {/* border color doesn't show in buttons */}
          <div className="py-2 text-center flex w-full items-center justify-center text-xs font-medium gap-2 text-black/60 rounded-lg border !border-black/10">
            <HiOutlineChatBubbleBottomCenterText />
            Chat with driver
          </div>

          <div className="py-2 text-center flex w-full items-center justify-center text-xs font-medium gap-2 text-black/60 rounded-lg border border-black/10">
            <FiPhoneCall />
            Call driver
          </div>
        </div>

        <button
          className="mt-7 py-5 bg-pebbleGray/15 border border-pebbleGray/25 rounded-2xl text-crimsonRed text-sm w-full cursor-pointer"
          onClick={onCancel}
        >
          Cancel ride
        </button>
      </RideInfoWrapper>
    )
  );
};

export default DriverDetails;
