import RideMapView from "../components/personal-map-view/RideMapView";
// import PersonalRideHeader from "../components/personal-map-view/PersonalRideHeader";
import { useLoadScript } from "@react-google-maps/api";
import Loader from "../components/Loader";
import { getGoogleMapsApiKey } from "../utils/env";
import { useLocation } from "react-router-dom"; // Added

// Define the expected state type from navigation - Added
interface LocationState {
  pickUp?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  pickUpAddress?: string;
  destinationAddress?: string;
}

const BusinessRide = () => {
  const location = useLocation(); // Added
  const navigateState = location.state as LocationState | undefined; // Added

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(),
    libraries: ["places"],
  });

  // Added loadError handling
  if (loadError)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-600">
            We couldn't load the map. Please check your internet connection or try
            again later.
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      {/* Consider adding a BusinessRideHeader if needed */}
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="w-full overflow-hidden">
          <RideMapView
            initialPickUp={navigateState?.pickUp} // Added
            initialDestination={navigateState?.destination} // Added
            initialPickUpAddress={navigateState?.pickUpAddress} // Added
            initialDestinationAddress={navigateState?.destinationAddress} // Added
          />
        </div>
      )}
    </div>
  );
};

export default BusinessRide;
