import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import RideBookingForm from "./RideBookingForm";
import ZoomControls from "./ZoomControls";
import carIcon from "../../assets/svgs/car-driver.svg";
import MapOverlay from "./MapOverlay";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
const MIN_ZOOM = 4;

const RideMapView = () => {
  const [zoom, setZoom] = useState(10);
  const [pickUp, setPickUp] = useState<LatLngLiteral>();
  const [destination, setDestination] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [cars, setCars] = useState<LatLngLiteral[]>([]);

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

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <RideBookingForm
        setPickUpPosition={(position) => {
          setPickUp(position);
          mapRef.current?.panTo(position);
        }}
        setDestinationPosition={(position) => {
          setDestination(position);
        }}
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
        {cars.map((car, index) => (
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
