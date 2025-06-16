import { axiosInstance, handleAxiosError } from "../axiosSetup";
import { getNodeApiUrl } from "../../utils/env";

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
  try {
    const response = await axiosInstance.post(
      `${getNodeApiUrl()}/api/v3/customer/bookings`,
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
      message: handleAxiosError(error),
    };
  }
}
