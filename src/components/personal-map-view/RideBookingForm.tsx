import CustomButton from "../buttons/CustomButton";
import CustomInput from "../CustomInput";
import addCircle from "../../assets/icons/add_circle.svg";
import CustomSelect from "../CustomSelect";
import PlacesSuggestions from "./PlacesSuggestions";
import { usePlacesAutocompleteHook } from "../../hooks/usePlacesAutocompleteHook";
import {
  getLocationNameFromCoordinates,
  getUserLocationFromBrowser,
} from "../../utils/locationUtils";

type LatLngLiteral = google.maps.LatLngLiteral;

interface RideBookingFormProps {
  setPickUpPosition: (position: LatLngLiteral) => void;
  setDestinationPosition: (position: LatLngLiteral) => void;
}

const RideBookingForm: React.FC<RideBookingFormProps> = ({
  setPickUpPosition,
  setDestinationPosition,
}) => {
  // const [additionalInputs, setAdditionalInputs] = useState<string[]>([]);

  // const handleAddInput = () => {
  //   setAdditionalInputs([...additionalInputs, ""]);
  // };

  // const handleInputChange = (index: number, value: string) => {
  //   const newInputs = [...additionalInputs];
  //   newInputs[index] = value;
  //   setAdditionalInputs(newInputs);
  // };

  // const handleRemoveInput = (index: number) => {
  //   const newInputs = [...additionalInputs];
  //   newInputs.splice(index, 1);
  //   setAdditionalInputs(newInputs);
  // };

  const {
    ready: destinationReady,
    value: destinationValue,
    setValue: setDestinationValue,
    suggestions: destinationSuggestions,
    suggestionsOpen: destinationSuggestionsOpen,
    handleSelect: handleDestinationLocation,
    containerRef: destinationContainerRef,
  } = usePlacesAutocompleteHook();

  const {
    ready: pickUpReady,
    value: pickUpValue,
    setValue: setPickUpValue,
    suggestions: pickUpSuggestionData,
    suggestionsOpen: pickUpSuggestionsOpen,
    handleSelect: handlePickUpLocation,
    containerRef: pickUpContainerRef,
  } = usePlacesAutocompleteHook();

  // Wrapped handlers to update positions
  const handlePickUpSelect = async (address: string) => {
    const position = await handlePickUpLocation(address);
    if (position) {
      setPickUpPosition(position);
    }
  };

  const handleDestinationSelect = async (address: string) => {
    const position = await handleDestinationLocation(address);
    if (position) {
      setDestinationPosition(position);
    }
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
    <div className="max-w-[400px] xl:max-w-[450px] 2xl:max-w-[560px] w-full absolute left-8 top-[30px] z-20 bg-personal-ride-form rounded-2xl bg-cover bg-no-repeat bg-center px-8 py-12 max-h-fit">
      <div className="w-full flex flex-col space-y-4">
        <h3 className="text-3xl font-bold text-white">Book a ride</h3>

        <div className="relative w-full" ref={pickUpContainerRef}>
          <CustomInput
            placeholder="Enter pick up location"
            className="bg-white/10 text-lg text-white placeholder:text-white placeholder:text-lg border-white/35 py-4 pl-6 pr-14 !rounded-2xl backdrop-blur-xl relative"
            value={pickUpValue}
            disabled={!pickUpReady}
            onChange={(e) => setPickUpValue(e.target.value)}
          />

          <button
            onClick={() => {
              getUserCurrentLocation();
            }}
            className="absolute top-5 right-5 size-6 cursor-pointer"
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
            className="bg-white/10 text-lg text-white placeholder:text-white placeholder:text-lg border-white/35 py-4 pl-6 pr-14 !rounded-2xl backdrop-blur-xl"
            value={destinationValue}
            disabled={!destinationReady}
            onChange={(e) => setDestinationValue(e.target.value)}
          />

          <button
            onClick={() => {
              console.log("add another input");
            }}
            className="absolute top-5 right-5 size-6 cursor-pointer"
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
          value={"Pick up now"}
          className="bg-white/10 text-lg text-white placeholder:text-white border-white/35 py-4 px-6 !rounded-2xl backdrop-blur-xl"
          dropDownClassName="bg-white/10 text-base text-white placeholder:text-white border-white/35 !rounded-2xl backdrop-blur-xl"
          optionClassName="text-white"
        />
        <div className="max-w-[220px] w-full">
          <CustomSelect
            options={["For me", "For someone"]}
            value={"For me"}
            className="bg-white/10 text-lg text-white placeholder:text-white border-white/35 py-4 px-6 !rounded-full backdrop-blur-xl"
            dropDownClassName="bg-white/10 text-base text-white placeholder:text-white placeholder:text-xl border-white/35 !rounded-2xl backdrop-blur-xl"
            optionClassName="text-white"
          />
        </div>
      </div>

      <div className="w-full px-2.5 mt-10 flex flex-col space-y-4">
        <CustomButton size="full" variant="secondary">
          Search
        </CustomButton>
        <div className="w-full border border-white rounded-lg md:rounded-xl lg:rounded-2xl">
          <CustomButton size="full" variant="outline">
            Book from previous
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default RideBookingForm;
