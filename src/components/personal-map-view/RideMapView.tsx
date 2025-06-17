import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { bookTrip } from "../../lib/trips/bookride";
import { usePHPUser } from "../../hooks/usePHPUser";
import RideBookingForm from "./RideBookingForm";
import ZoomControls from "./ZoomControls";
import carIcon from "../../assets/svgs/car-driver.svg";
import MapOverlay from "./MapOverlay";
import ConfirmPickup from "./ConfirmPickup";
import AvailableRidesList from "./AvailableRidesList";
import DriverDetails from "./DriverDetails";
import toast from "react-hot-toast";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
const MIN_ZOOM = 4;
const INITIAL_ZOOM = 10;

interface RideMapViewProps {
  initialPickUp?: LatLngLiteral;
  initialDestination?: LatLngLiteral;
  initialPickUpAddress?: string;
  initialDestinationAddress?: string;
}

const RideMapView: React.FC<RideMapViewProps> = ({
  initialPickUp,
  initialDestination,
  initialPickUpAddress,
  initialDestinationAddress,
}) => {
  // Get PHP user data for API calls
  const { phpUserId, hasPHPAuth } = usePHPUser();

  // manage map zoom
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // manage location
  const [pickUp, setPickUp] = useState<LatLngLiteral | null>(
    initialPickUp || null
  );
  const [destination, setDestination] = useState<LatLngLiteral | null>(
    initialDestination || null
  );
  const [directions, setDirections] = useState<DirectionsResult | undefined>();
  const [cars, setCars] = useState<LatLngLiteral[] | null>(null);
  const [pickUpAddress, setPickUpAddress] = useState<string>(
    initialPickUpAddress || ""
  );
  const [destinationAddress, setDestinationAddress] = useState<string>(
    initialDestinationAddress || ""
  ); // Added state for destination address

  // manage rider state
  const [showBookingForm, setShowBookingForm] = useState<boolean>(true);
  const [showPickUpConfirmation, setShowPickUpConfirmation] =
    useState<boolean>(false);
  const [showAvailableRides, setShowAvailableRides] = useState<boolean>(false);
  const [showDriverDetails, setShowDriverDetails] = useState<boolean>(false);

  // manage trip modes
  const [isSearching, setIsSearching] = useState(false);
  const [mode, setMode] = useState<"confirmed" | "edit" | "booked" | null>(
    null
  );
  const [tripMode, setTripMode] = useState<"begin" | "end" | null>(null);

  const [bookingType, setBookingType] = useState<"book_now" | "book_later">(
    "book_now"
  );

  const mapRef = useRef<google.maps.Map | null>(null);
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 30.27, lng: -97.75 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "995930f9b99fd8641d678b27",
    }),
    []
  );

  useEffect(() => {
    if (pickUp) {
      const newCars = generateCars(pickUp);
      setCars(newCars);
      // Pan to pickup location when set
      mapRef.current?.panTo(pickUp);
    } else {
      setCars([]);
    }
  }, [pickUp]);

  const handleZoomChanged = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom !== undefined) {
        const clampedZoom = Math.max(currentZoom, MIN_ZOOM);
        if (currentZoom !== clampedZoom) {
          mapRef.current.setZoom(clampedZoom);
        }
        setZoom(clampedZoom);
      }
    }
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (pickUp && destination) {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: pickUp,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);

            const bounds = new google.maps.LatLngBounds();
            result.routes[0].legs.forEach((leg) => {
              bounds.extend(leg.start_location);
              bounds.extend(leg.end_location);
            });
            mapRef.current?.fitBounds(bounds);
          } else {
            console.error("Directions request failed:", status);
            setDirections(undefined);
          }
        }
      );
    } else {
      setDirections(undefined);
    }
  }, [pickUp, destination]);
  const handleBookingFormSubmit = async (
    address: string,
    destAddress: string,
    bookingType: "book_now" | "book_later"
  ) => {
    if (destination && pickUp && directions) {
      // Check if PHP authentication is available
      if (!hasPHPAuth || !phpUserId) {
        toast.error("PHP authentication required for ride booking. Please login with dual authentication.");
        return;
      }

      setPickUpAddress(address);
      setDestinationAddress(destAddress);
      setShowPickUpConfirmation(true);
      setIsSearching(true);

      const distanceMeters = directions.routes[0].legs[0]?.distance?.value || 0;
      const distanceKm = distanceMeters / 1000;

      const payload = {
        user_id: phpUserId, // Dynamic user ID from PHP authentication
        booking_type: bookingType,
        rent_type: "taxi" as const,
        distance: distanceKm,
        pickup_location: address,
        dropoff_location: destAddress,
        pickup_lat: pickUp.lat,
        pickup_lng: pickUp.lng,
        dropoff_lat: destination.lat,
        dropoff_lng: destination.lng,
        no_of_passenger: 3, // TODO: Make dynamic from user input
        pickup_date_time: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "), // "YYYY-MM-DD HH:mm:ss"
      };

      const result = await bookTrip(payload);

      if (result.success) {
        toast.success("Trip booked!");
        console.log("Booking response:", result.data);
        // You can optionally store this in state or trigger next UI phase
      } else {
        toast.error(result.message);
      }

      setIsSearching(false); // Stop loading
    }
  };

  const handlePickupConfirmationClick = () => {
    setShowAvailableRides(true);
    setMode("confirmed");
  };

  const handleEditPickUpClick = () => {
    setMode("edit");
    setShowPickUpConfirmation(false);
    setShowAvailableRides(false);
    setIsSearching(false);
  };

  const handleBookRideClick = () => {
    setShowAvailableRides(false);
    setShowDriverDetails(true);
    setMode("booked");
  };

  const handleCancelRideClick = () => {
    setShowDriverDetails(false);
    setShowAvailableRides(false);
    setMode(null);
  };

  const onEndTrip = () => {
    // return all states to null and false
    setTripMode(null);
    setMode(null);
    setIsSearching(false);
    setShowDriverDetails(false);
    setShowPickUpConfirmation(false);
    setShowBookingForm(true);
    setPickUp(null);
    setDestination(null);
    setCars(null);
    setPickUpAddress("");
    setDestinationAddress("");
    setZoom(INITIAL_ZOOM);
  };

  const onStartTrip = () => {
    setTripMode("begin");
    setShowBookingForm(false);
    setShowPickUpConfirmation(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <RideBookingForm
        open={showBookingForm}
        bookingType={bookingType}
        setBookingType={setBookingType}
        setPickUpPosition={(position) => {
          setPickUp(position);
          mapRef.current?.panTo(position);
        }}
        setDestinationPosition={(position) => {
          setDestination(position);
        }}
        handleSubmit={handleBookingFormSubmit}
        isConfirmed={mode === "confirmed" || mode === "booked"}
        editMode={mode === "edit"}
        tripHasEnded={tripMode === "end"}
        searching={isSearching}
        initialPickUpAddress={pickUpAddress} // Pass down initial address
        initialDestinationAddress={destinationAddress} // Pass down initial address
      />

      <ConfirmPickup
        open={showPickUpConfirmation}
        destination={pickUpAddress}
        onConfirm={handlePickupConfirmationClick}
        isConfirmed={mode === "confirmed" || mode === "booked"}
        onEdit={handleEditPickUpClick}
        rideSelected={mode === "booked"}
      />

      <AvailableRidesList
        open={showAvailableRides}
        onBook={handleBookRideClick}
      />

      <DriverDetails
        open={showDriverDetails}
        onCancel={handleCancelRideClick}
        tripMode={tripMode}
        onComplete={() => setTripMode("end")}
        onStart={onStartTrip}
        onEnd={onEndTrip}
      />

      <MapOverlay side="left" />
      <MapOverlay side="right" />
      <GoogleMap
        zoom={zoom}
        center={center}
        options={options}
        onLoad={onLoad}
        mapContainerClassName="w-full h-screen"
        onZoomChanged={handleZoomChanged}
      >
        {/* Render car markers */}
        {cars &&
          cars.map((car, index) => (
            <Marker
              icon={{
                url: carIcon,
                scaledSize: new google.maps.Size(40, 40),
              }}
              position={car}
              key={index}
            />
          ))}

        {pickUp && <Marker position={pickUp} />}

        {destination && <Marker position={destination} />}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                zIndex: 10,
                strokeColor: "#3E4095",
                strokeWeight: 5,
                strokeOpacity: 0.8,
              },
              preserveViewport: true,
            }}
          />
        )}
      </GoogleMap>
      <ZoomControls setZoom={setZoom} currentZoom={zoom} />
    </div>
  );
};

// Helper function to generate random car positions
const generateCars = (position: LatLngLiteral) => {
  const _cars: Array<LatLngLiteral> = [];
  for (let i = 0; i < 5; i++) {
    const direction = Math.random() < 0.5 ? -1.5 : 1.5;
    _cars.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _cars;
};

export default RideMapView;
