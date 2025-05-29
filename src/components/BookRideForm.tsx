import "../styles/components/BookRideForm.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlacesAutocompleteHook } from "../hooks/usePlacesAutocompleteHook";
import PlacesSuggestions from "./personal-map-view/PlacesSuggestions";
import { Suggestion } from "use-places-autocomplete"; // Import Suggestion

type LatLngLiteral = { lat: number; lng: number };

export default function BookRideForm() {
    const navigate = useNavigate();
    const [pickUpPosition, setPickUpPosition] = useState<LatLngLiteral | null>(null);
    const [destinationPosition, setDestinationPosition] = useState<LatLngLiteral | null>(null);

    // Pickup Autocomplete
    const {
        ready: pickUpReady,
        value: pickUpValue,
        setValue: setPickUpValue,
        suggestions: pickUpSuggestionsData,
        suggestionsOpen: pickUpSuggestionsOpen,
        handleSelect: handlePickUpLocationLogic,
        containerRef: pickUpContainerRef,
    } = usePlacesAutocompleteHook();

    // Destination Autocomplete
    const {
        ready: destinationReady,
        value: destinationValue,
        setValue: setDestinationValue,
        suggestions: destinationSuggestionsData,
        suggestionsOpen: destinationSuggestionsOpen,
        handleSelect: handleDestinationLocationLogic,
        containerRef: destinationContainerRef,
    } = usePlacesAutocompleteHook();

    const handlePickUpSelect = async (suggestion: Suggestion) => { // Changed parameter type
        const address = suggestion.description; // Get address from suggestion
        const position = await handlePickUpLocationLogic(address);
        if (position) {
            setPickUpPosition(position);
        }
        // Optionally, ensure the input field is also updated if handlePickUpLocationLogic doesn't do it.
        // setPickUpValue(address, false); // Already handled by handlePickUpLocationLogic
    };

    const handleDestinationSelect = async (suggestion: Suggestion) => { // Changed parameter type
        const address = suggestion.description; // Get address from suggestion
        const position = await handleDestinationLocationLogic(address);
        if (position) {
            setDestinationPosition(position);
        }
        // Optionally, ensure the input field is also updated if handleDestinationLocationLogic doesn't do it.
        // setDestinationValue(address, false); // Already handled by handleDestinationLocationLogic
    };

    const handleOrderRide = (e: FormEvent) => {
        e.preventDefault();
        if (!pickUpPosition || !destinationPosition) {
            alert("Please select both pickup and destination locations.");
            return;
        }
        navigate('/dashboard/ride', { 
            state: { 
                pickUp: pickUpPosition, 
                destination: destinationPosition, 
                pickUpAddress: pickUpValue,
                destinationAddress: destinationValue
            } 
        });
    };

    const handleBookFromPrevious = (e: FormEvent) => {
        e.preventDefault();
        console.log("Book from previous");
    };

    return (
        <div className="bookrideformCont">
            <form onSubmit={handleOrderRide}>
                <div ref={pickUpContainerRef} style={{ position: 'relative' }}>
                    <input 
                        placeholder="Enter pick up location"
                        value={pickUpValue}
                        onChange={(e) => setPickUpValue(e.target.value, true)} // Ensure suggestions fetch on change
                        disabled={!pickUpReady} // Enabled based on hook's readiness
                    />
                    {pickUpSuggestionsOpen && pickUpValue && (
                        <PlacesSuggestions 
                            suggestions={pickUpSuggestionsData} 
                            onSelect={handlePickUpSelect}
                            open={pickUpSuggestionsOpen}
                        />
                    )}
                </div>
                <div ref={destinationContainerRef} style={{ position: 'relative' }}>
                    <input 
                        placeholder="Enter destination"
                        value={destinationValue}
                        onChange={(e) => setDestinationValue(e.target.value, true)} // Ensure suggestions fetch on change
                        disabled={!destinationReady} // Enabled based on hook's readiness
                    />
                    {destinationSuggestionsOpen && destinationValue && (
                        <PlacesSuggestions 
                            suggestions={destinationSuggestionsData} 
                            onSelect={handleDestinationSelect}
                            open={destinationSuggestionsOpen}
                        />
                    )}
                </div>
                <button 
                    type="submit" 
                    className="bookrideformCont_order"
                    disabled={!pickUpPosition || !destinationPosition} // Disable button if locations not set
                >
                    Order ride
                </button>
                <button 
                    type="button" 
                    className="bookrideformCont_book"
                    onClick={handleBookFromPrevious}
                >
                    Book from previous
                </button>
            </form>
        </div>
    );
}