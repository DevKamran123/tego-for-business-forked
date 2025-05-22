import React from "react";

interface MapOverlayProps {
  side: "left" | "right";
}

const MapOverlay: React.FC<MapOverlayProps> = ({ side }) => {
  const gradientDirection =
    side === "left"
      ? "bg-gradient-to-r from-white to-transparent"
      : "bg-gradient-to-l from-white to-transparent";

  return (
    <div
      className={`w-1/4 z-10 absolute h-screen ${gradientDirection} ${
        side === "left" ? "left-0" : "right-0"
      }`}
    ></div>
  );
};

export default MapOverlay;
