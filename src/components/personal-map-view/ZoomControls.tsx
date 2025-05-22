import React from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

interface ZoomControlsProps {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  currentZoom: number;
}
const ZoomControls: React.FC<ZoomControlsProps> = ({
  setZoom,
  currentZoom,
}) => {
  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 1, 20);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 1, 4);
    setZoom(newZoom);
  };

  return (
    <div className="flex flex-col fixed z-10 border border-pebbleGray/25 rounded-3xl bottom-10 right-5">
      <button
        className="rounded-t-2xl p-4 bg-white text-lg cursor-pointer"
        onClick={handleZoomIn}
      >
        <IoMdAdd />
      </button>
      <div className="h-0.5 w-full bg-pebbleGray/25"></div>
      <button
        className="rounded-b-2xl p-4 bg-white text-lg cursor-pointer"
        onClick={handleZoomOut}
      >
        <IoMdRemove />
      </button>
    </div>
  );
};

export default ZoomControls;
