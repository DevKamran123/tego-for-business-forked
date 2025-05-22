import { DistanceUnit } from "../UnitContextTypes";
import { getGoogleMapsApiKey } from "./env";

// Countries that primarily use miles
const mileCountries = [
  "US", // United States
  "GB", // United Kingdom
  "LR", // Liberia
  "MM", // Myanmar (Burma)
];

/**
 * Try to get the user's location using the browser's Geolocation API
 * This will trigger a permission prompt
 */
export const getUserLocationFromBrowser = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    });
  });
};

/**
 * Convert coordinates to country code using reverse geocoding
 */
const getCountryFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=3`
    );
    const data = await response.json();
    return data.address?.country_code?.toUpperCase() || null;
  } catch (error) {
    console.error("Error with reverse geocoding:", error);
    return null;
  }
};

/**
 * Fallback method to get location using IP-based service
 */
const getLocationFromIP = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    console.error("Error determining location from IP:", error);
    return null;
  }
};

/**
 * Determines the default distance unit based on the user's country
 */
export const getLocationBasedUnit = async (): Promise<DistanceUnit> => {
  let countryCode: string | null = null;

  // First try to use the browser's Geolocation API (requires permission)
  try {
    const position = await getUserLocationFromBrowser();
    countryCode = await getCountryFromCoordinates(
      position.coords.latitude,
      position.coords.longitude
    );
    console.log("Got country from browser geolocation:", countryCode);
  } catch (error) {
    console.log("Browser geolocation failed, falling back to IP-based:", error);
    // If geolocation permission denied or failed, try IP-based approach
    countryCode = await getLocationFromIP();
  }

  // If we found a country code and it's in the miles list, use miles
  if (countryCode && mileCountries.includes(countryCode)) {
    return "mi";
  }

  // Default to kilometers
  return "km";
};

/**
 * Gets the default unit preference
 * Checks localStorage first, then falls back to location-based default
 */
export const getDefaultUnit = async (): Promise<DistanceUnit> => {
  // Check for user preference in localStorage first
  const savedUnit = localStorage.getItem("distanceUnit") as DistanceUnit;
  if (savedUnit === "km" || savedUnit === "mi") {
    return savedUnit;
  }

  // If no user preference, determine based on location
  return await getLocationBasedUnit();
};

/**
 * Fetches location details (address, place name) from coordinates using Google Maps Geocoding API.
 * @param position Coordinates to look up.
 * @returns Promise resolving to location details or null if failed.
 */
export const getLocationNameFromCoordinates = async (
  position: google.maps.LatLngLiteral
): Promise<google.maps.GeocoderResult | null> => {
  const apiKey = getGoogleMapsApiKey();
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const result = data.results[0];

      return result;
    } else {
      console.error("Google Geocoding API error", data.status);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch location details", error);
    return null;
  }
};
