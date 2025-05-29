import React from "react";

interface PlacesSuggestionsProps {
  open: boolean;
  suggestions: google.maps.places.AutocompletePrediction[];
  onSelect: (addr: string) => void;
  variant?: "default" | "dark"; // Added variant prop
}

const PlacesSuggestions: React.FC<PlacesSuggestionsProps> = ({
  open,
  suggestions,
  onSelect,
  variant = "default", // Default to 'default'
}) => {
  const textColorClass = variant === "dark" ? "text-gray-700" : "text-white";

  return (
    open && (
      <div className="absolute z-10 top-full w-full">
        <div
          className="flex flex-col border p-2 w-full max-h-[500px] rounded-2xl overflow-y-auto 
        bg-white/10 text-sm placeholder:text-white border-white/35 backdrop-blur-xl
        "
        >
          {suggestions.map(({ place_id, description }) => (
            <button
              onClick={() => onSelect(description)}
              key={place_id}
              className={`p-3 cursor-pointer hover:bg-darkBluish hover:text-white text-left rounded-xl ${textColorClass}`} // Applied conditional text color
            >
              {description}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default PlacesSuggestions;
