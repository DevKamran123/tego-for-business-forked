import { phpAxiosInstance } from "../phpAxiosSetup";
import { getPHPApiUrl } from "../../utils/env";
import { PHP_API_VERSION } from "../version";
import { 
  RideHistoryItem, 
  RideHistoryResponse, 
  RideHistoryResult 
} from "../../types/rideHistory";

/**
 * Fetch ride history from the PHP API
 * @returns Promise<RideHistoryResult> - The ride history data or error
 */
export const getRideHistory = async (): Promise<RideHistoryResult> => {
  try {
    const response = await phpAxiosInstance.get<RideHistoryResponse>(
      `${getPHPApiUrl()}${PHP_API_VERSION}/customer/bookings/history`
    );
    
    return {
      success: true,
      data: response.data.data
    };
  } catch (error: unknown) {
    console.error('Error fetching ride history:', error);
    
    let errorMessage = 'Failed to fetch ride history';
    let status: number | undefined;

    // Type guard for axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number; data?: { message?: string } } };
      status = axiosError.response?.status;
      errorMessage = axiosError.response?.data?.message || `Server error: ${status}`;
    } else if (error && typeof error === 'object' && 'request' in error) {
      // Network error
      errorMessage = 'Network error: Unable to connect to server';
    } else if (error instanceof Error) {
      // Other error
      errorMessage = error.message || 'An unexpected error occurred';
    }

    return {
      success: false,
      error: {
        message: errorMessage,
        status
      }
    };
  }
};

/**
 * Filter ride history by booking type
 * @param rides - Array of ride history items
 * @param bookingType - The booking type to filter by ('book_now' for immediate rides, others for scheduled)
 * @returns Filtered array of rides
 */
export const filterRidesByBookingType = (
  rides: RideHistoryItem[],
  bookingType: 'book_now' | 'scheduled'
): RideHistoryItem[] => {
  if (bookingType === 'book_now') {
    return rides.filter(ride => ride.booking_type === 'book_now');
  } else {
    return rides.filter(ride => ride.booking_type !== 'book_now');
  }
}; 