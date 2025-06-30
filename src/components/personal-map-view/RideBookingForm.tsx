import CustomButton from "../buttons/CustomButton";
import CustomInput from "../CustomInput";
import addCircle from "../../assets/icons/add_circle.svg";
import CustomSelect from "../CustomSelect";
import PlacesSuggestions from "./PlacesSuggestions";
import { usePlacesAutocompleteHook } from "../../hooks/usePlacesAutocompleteHook";
import { Suggestion } from "use-places-autocomplete";
import {
  getLocationNameFromCoordinates,
  getUserLocationFromBrowser,
} from "../../utils/locationUtils";
import { useEffect, useRef, Dispatch, SetStateAction, useState } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;

interface RideBookingFormProps {
  open: boolean;
  setPickUpPosition: (position: LatLngLiteral) => void;
  setDestinationPosition: (position: LatLngLiteral) => void;
  handleSubmit: (
    pickUpAddress: string,
    destinationAddress: string,
    bookingType: "book_now" | "book_later",
    passengerCount: number
  ) => void;
  isConfirmed: boolean;
  editMode: boolean;
  searching: boolean;
  tripHasEnded: boolean;
  initialPickUpAddress?: string;
  initialDestinationAddress?: string;
  bookingType?: string;
  setBookingType?: Dispatch<SetStateAction<"book_now" | "book_later">>;
}

const RideBookingForm: React.FC<RideBookingFormProps> = ({
  open,
  setPickUpPosition,
  setDestinationPosition,
  handleSubmit,
  isConfirmed,
  editMode,
  searching,
  tripHasEnded,
  initialPickUpAddress,
  initialDestinationAddress,
  bookingType,
  setBookingType,
}) => {
  const pickUpInputRef = useRef<HTMLInputElement>(null);
  const [passengerCount, setPassengerCount] = useState<number>(1);

  const {
    ready: pickUpReady,
    value: pickUpValue,
    setValue: setPickUpValue,
    suggestions: pickUpSuggestionData,
    suggestionsOpen: pickUpSuggestionsOpen,
    handleSelect: handlePickUpLocation,
    containerRef: pickUpContainerRef,
  } = usePlacesAutocompleteHook();

  const {
    ready: destinationReady,
    value: destinationValue,
    setValue: setDestinationValue,
    suggestions: destinationSuggestions,
    suggestionsOpen: destinationSuggestionsOpen,
    handleSelect: handleDestinationLocation,
    containerRef: destinationContainerRef,
  } = usePlacesAutocompleteHook();

  useEffect(() => {
    if (editMode && pickUpInputRef.current) {
      pickUpInputRef.current.focus();
    }
  }, [editMode]);

  // if trip has ended clear all inputs
  useEffect(() => {
    if (tripHasEnded) {
      setPickUpValue("");
      setDestinationValue("");
      setPassengerCount(1);
    }
    if (pickUpInputRef.current && !tripHasEnded) {
      pickUpInputRef.current.focus();
    }
  }, [tripHasEnded, setPickUpValue, setDestinationValue]);

  useEffect(() => {
    if (initialPickUpAddress) {
      setPickUpValue(initialPickUpAddress, false); // Modified
    }
    if (initialDestinationAddress) {
      setDestinationValue(initialDestinationAddress, false); // Modified
    }
  }, [
    initialPickUpAddress,
    initialDestinationAddress,
    setPickUpValue,
    setDestinationValue,
  ]);

  // Wrapped handlers to update positions
  const handlePickUpSelect = async (suggestion: Suggestion) => {
    // Changed parameter type
    const address = suggestion.description; // Get address from suggestion
    const position = await handlePickUpLocation(address);
    if (position) {
      setPickUpPosition(position);
    }
    // setPickUpValue(address, false); // Already handled by handlePickUpLocation
  };

  const handleDestinationSelect = async (suggestion: Suggestion) => {
    // Changed parameter type
    const address = suggestion.description; // Get address from suggestion
    const position = await handleDestinationLocation(address);
    if (position) {
      setDestinationPosition(position);
    }
    // setDestinationValue(address, false); // Already handled by handleDestinationLocation
  };

  const getUserCurrentLocation = async () => {
    try {
      const position = await getUserLocationFromBrowser();
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setPickUpPosition(currentPosition);

      try {
        const pickUpAddress = await getLocationNameFromCoordinates(
          currentPosition
        );
        setPickUpValue(pickUpAddress?.formatted_address as string);
      } catch (error) {
        console.error("Unable to get pickup address", error);
      }
    } catch (error) {
      console.error("Failed to get user coordinates:", error);
    }
  };

  return (
    open && (
      <div className="w-full max-w-[22%] absolute left-8 top-[30px] z-20 bg-personal-ride-form rounded-2xl bg-cover bg-no-repeat bg-center px-4 py-4 lg:px-6 lg:py-10 xl:px-8 max-h-fit">
        <div className="w-full flex flex-col space-y-3">
          <h3 className="text-2xl font-bold text-white">Book a ride</h3>

          <div className="relative w-full" ref={pickUpContainerRef}>
            <CustomInput
              placeholder="Enter pick up location"
              className="bg-white/10 text-white placeholder:text-white placeholder:text-lg border-white/35 py-3.5 pl-4 xl:pl-5 pr-10 !rounded-xl backdrop-blur-xl relative"
              value={pickUpValue}
              ref={pickUpInputRef}
              disabled={!pickUpReady || isConfirmed || searching}
              onChange={(e) => setPickUpValue(e.target.value)}
            />

            <button
              onClick={() => {
                getUserCurrentLocation();
              }}
              className="absolute top-4 right-3.5 size-5 cursor-pointer"
              disabled={isConfirmed || searching}
            >
              <img src={addCircle} alt="add circle icon" className="w-full" />
            </button>

            <PlacesSuggestions
              onSelect={handlePickUpSelect}
              open={pickUpSuggestionsOpen}
              suggestions={pickUpSuggestionData}
            />
          </div>

          <div className="relative w-full" ref={destinationContainerRef}>
            <CustomInput
              placeholder="Enter destination"
              className="bg-white/10 text-white placeholder:text-white placeholder:text-lg border-white/35 py-3.5 pl-4 xl:pl-5 pr-10 !rounded-xl backdrop-blur-xl relative"
              value={destinationValue}
              disabled={!destinationReady || isConfirmed || searching}
              onChange={(e) => setDestinationValue(e.target.value)}
            />

            <button
              onClick={() => {
                console.log("add another input");
              }}
              disabled={isConfirmed || searching}
              className="absolute top-4 right-3.5 size-5 cursor-pointer"
            >
              <img src={addCircle} alt="add circle icon" className="w-full" />
            </button>

            <PlacesSuggestions
              onSelect={handleDestinationSelect}
              open={destinationSuggestionsOpen}
              suggestions={destinationSuggestions}
            />
          </div>

          {/* {additionalInputs.map((value, index) => (
          <div className="relative w-full" key={index}>
            <CustomInput
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              placeholder="Enter stop trip"
              className="bg-white/10 text-xl text-white placeholder:text-white placeholder:text-xl border-white/35 py-5 px-6 !rounded-2xl backdrop-blur-xl"
            />

            <button
              onClick={() => handleRemoveInput(index)}
              className="absolute top-6 right-6 size-6 cursor-pointer text-white text-xl"
            >
              <FiMinusCircle />
            </button>
          </div>
        ))} */}

          <CustomSelect
            options={["Pick up now", "Pick up later"]}
            value={bookingType === "book_now" ? "Pick up now" : "Pick up later"}
            onChange={(value) => {
              if (setBookingType) {
                setBookingType(
                  value === "Pick up later" ? "book_later" : "book_now"
                );
              }
            }}
            className="bg-white/10 text-white placeholder:text-white border-white/35 pl-4 xl:pl-5 !rounded-xl backdrop-blur-xl"
            dropDownClassName="bg-white/10 text-base text-white placeholder:text-white border-white/35 !rounded-2xl backdrop-blur-xl"
            optionClassName="text-white"
            disabled={isConfirmed || searching}
          />

          <div className="w-3/5">
            <CustomSelect
              options={["For me", "For someone"]}
              value={"For me"}
              className="bg-white/10 text-white placeholder:text-white border-white/35 pl-4 xl:pl-5 !rounded-full backdrop-blur-xl"
              dropDownClassName="bg-white/10 text-base text-white placeholder:text-white placeholder:text-xl border-white/35 !rounded-2xl backdrop-blur-xl"
              optionClassName="text-white"
              disabled={isConfirmed || searching}
            />
          </div>

          <div className="relative w-full">
            <CustomInput
              type="number"
              placeholder="Number of passengers"
              className="bg-white/10 text-white placeholder:text-white placeholder:text-lg border-white/35 py-3.5 pl-4 xl:pl-5 pr-10 !rounded-xl backdrop-blur-xl relative"
              value={passengerCount}
              disabled={isConfirmed || searching}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > 0 && value <= 10) {
                  setPassengerCount(value);
                }
              }}
              min={1}
              max={10}
            />
          </div>
        </div>

        <div className="w-full px-2.5 mt-10 flex flex-col space-y-4">
          <CustomButton
            size="full"
            variant="secondary"
            onClick={() => {
              handleSubmit(
                pickUpValue || "",
                destinationValue || "",
                (bookingType as "book_now" | "book_later") || "book_now",
                passengerCount
              );
            }}
            disabled={isConfirmed || searching}
          >
            Search
          </CustomButton>
          <div className="w-full border border-white rounded-lg md:rounded-xl lg:rounded-xl">
            <CustomButton
              size="full"
              variant="outline"
              disabled={isConfirmed || searching}
            >
              Book from previous
            </CustomButton>
          </div>
        </div>
      </div>
    )
  );
};

export default RideBookingForm;
