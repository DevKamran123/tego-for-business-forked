import RideMapView from "../components/personal-map-view/RideMapView";
import PersonalRideHeader from "../components/personal-map-view/PersonalRideHeader";
import { useLoadScript } from "@react-google-maps/api";
import Loader from "../components/Loader";
import { getGoogleMapsApiKey } from "../utils/env";

const PersonalRide = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(),
    libraries: ["places"],
  });

  return (
    <div className="w-full flex flex-col h-screen overflow-hidden">
      <PersonalRideHeader />
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="w-full overflow-hidden">
          <RideMapView />
        </div>
      )}
    </div>
  );
};

export default PersonalRide;
