import { phpAxiosInstance, handlePHPAxiosError, hasPHPToken } from "../phpAxiosSetup";
import { getPHPApiUrl } from "../../utils/env";
import { PHP_API_VERSION } from "../version";

export interface BookTripPayload {
  user_id: number;
  booking_type: "book_now" | "book_later";
  rent_type: "taxi";
  distance: number;
  pickup_location: string;
  dropoff_location: string;
  pickup_lat: number;
  pickup_lng: number;
  dropoff_lat: number;
  dropoff_lng: number;
  no_of_passenger: number;
  pickup_date_time: string;
}

export async function bookTrip(payload: BookTripPayload): Promise<{
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}> {
  // Check if PHP token is available
  if (!hasPHPToken()) {
    return {
      success: false,
      message: "PHP authentication required. Please login with dual authentication to book rides.",
    };
  }

  try {
    const response = await phpAxiosInstance.post(
      `${getPHPApiUrl()}${PHP_API_VERSION}/customer/bookings`,
      payload
    );

    return {
      success: true,
      message: response.data.message || "Trip booked successfully",
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: handlePHPAxiosError(error),
    };
  }
}
