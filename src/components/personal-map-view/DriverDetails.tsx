import React, { useEffect } from "react";
import RideInfoWrapper from "./RideInfoWrapper";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FiPhoneCall } from "react-icons/fi";
import TripCode from "./TripCode";
import DriverArriving from "./DriverArriving";
import OnTheGo from "./OnTheGo";
import TripReview from "./TripReview";

interface DriverDetailsProps {
  open: boolean;
  onCancel: () => void;
  onStart: () => void;
  onEnd: () => void;
  onComplete: () => void;
  tripMode: "begin" | "end" | null;
}
const DriverDetails: React.FC<DriverDetailsProps> = ({
  open,
  onCancel,
  tripMode,
  onStart,
  onEnd,
  onComplete,
}) => {
  const COST = 6.2;

  useEffect(() => {
    if (open) {
      if (!tripMode) {
        const beginTimer = setTimeout(() => {
          onStart();
        }, 5000);
        return () => clearTimeout(beginTimer);
      } else if (tripMode === "begin") {
        const endTimer = setTimeout(() => {
          onComplete();
        }, 5000);

        return () => clearTimeout(endTimer);
      }
    }
  }, [open, tripMode]);

  return (
    open && (
      <RideInfoWrapper title={tripMode === "end" ? "" : "Driver Details"}>
        {tripMode === "end" && tripMode !== null ? (
          <TripReview onEnd={onEnd} />
        ) : (
          <div>
            {tripMode === "begin" ? (
              <OnTheGo cost={COST} />
            ) : (
              <DriverArriving cost={COST} />
            )}

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

            {tripMode !== "begin" && (
              <button
                className="mt-7 py-5 bg-pebbleGray/15 border border-pebbleGray/25 rounded-2xl text-crimsonRed text-sm w-full cursor-pointer"
                onClick={onCancel}
              >
                Cancel ride
              </button>
            )}
          </div>
        )}
      </RideInfoWrapper>
    )
  );
};

export default DriverDetails;
