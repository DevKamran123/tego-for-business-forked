import RideMapView from "../components/personal-map-view/RideMapView";
// import PersonalRideHeader from "../components/personal-map-view/PersonalRideHeader";
import { useLoadScript } from "@react-google-maps/api";
import Loader from "../components/Loader";
import { getGoogleMapsApiKey } from "../utils/env";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

// Define the expected state type from navigation
interface LocationState {
  pickUp?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  pickUpAddress?: string;
  destinationAddress?: string;
  // Add other properties from state if needed, e.g., date, time
}

const PersonalRide = () => {
  const location = useLocation();
  const navigateState = location.state as LocationState | undefined;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(),
    libraries: ["places"],
  });

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
    <div className="w-full flex flex-col h-screen overflow-hidden">
      <Header />
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="w-full overflow-hidden">
          <RideMapView
            initialPickUp={navigateState?.pickUp}
            initialDestination={navigateState?.destination}
            initialPickUpAddress={navigateState?.pickUpAddress}
            initialDestinationAddress={navigateState?.destinationAddress}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalRide;
