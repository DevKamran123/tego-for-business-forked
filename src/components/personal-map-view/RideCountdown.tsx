import React from "react";

interface RideCountdownProps {
  timer: string;
}

const RideCountdown: React.FC<RideCountdownProps> = ({ timer }) => {
  return (
    <div className="bg-deepBlue/10 text-deepBlue py-1 px-2 text-xs rounded-lg">
      {timer}
    </div>
  );
};

export default RideCountdown;
