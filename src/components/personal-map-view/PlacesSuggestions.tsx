import React from "react";
import { Suggestion } from "use-places-autocomplete"; // Import the Suggestion type

interface PlacesSuggestionsProps {
  open: boolean;
  suggestions: Suggestion[]; // Changed from google.maps.places.AutocompletePrediction[] to Suggestion[]
  onSelect: (suggestion: Suggestion) => void; // Changed from (addr: string) to (suggestion: Suggestion)
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
          {suggestions.map((suggestion) => (
            <button
              onClick={() => onSelect(suggestion)} // Pass the whole suggestion object
              key={suggestion.place_id}
              className={`p-3 cursor-pointer hover:bg-darkBluish hover:text-white text-left rounded-xl ${textColorClass}`} // Applied conditional text color
            >
              {suggestion.description}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default PlacesSuggestions;
