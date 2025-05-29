import { useState, useEffect, useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type Position = google.maps.LatLngLiteral;

interface UsePlacesAutocompleteReturn {
  ready: boolean;
  value: string;
  setValue: (value: string) => void;
  suggestions: google.maps.places.AutocompletePrediction[];
  suggestionsOpen: boolean;
  position: Position | null;
  clearSuggestions: () => void;
  handleSelect: (address: string) => Promise<Position | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const usePlacesAutocompleteHook = (): UsePlacesAutocompleteReturn => {
  const [position, setPosition] = useState<Position | null>(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setSuggestionsOpen(status === "OK");
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestionsOpen(false);
        clearSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearSuggestions]);

  const handleSelect = async (address: string): Promise<Position | null> => {
    setValue(address, false);
    clearSuggestions();
    setSuggestionsOpen(false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      const newPosition = { lat, lng };
      setPosition(newPosition);
      return newPosition;
    } catch (error) {
      console.error("Error getting geocode:", error);
      return null;
    }
  };

  return {
    ready,
    value,
    setValue,
    suggestions: data,
    suggestionsOpen,
    position,
    clearSuggestions,
    handleSelect,
    containerRef,
  };
};
