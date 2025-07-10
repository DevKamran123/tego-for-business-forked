import { useState, useEffect } from "react";
import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";
import PlannedRidesCard from "../components/PlannedRidesCard";
import RideHistoryCard from "../components/RideHistoryCard";
import useRideStore from "../store/RideStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { getRideHistory, filterRidesByBookingType } from "../lib/trips/rideHistory";
import { RideHistoryItem } from "../types/rideHistory";

const PersonalActivity = () => {
  const activeTab = useRideStore((state) => state.activeTab);
  const setActiveTab = useRideStore((state) => state.setActiveTab);
  
  const [rideHistory, setRideHistory] = useState<RideHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ride history on component mount
  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await getRideHistory();
        
        if (result.success && result.data) {
          setRideHistory(result.data);
        } else {
          setError(result.error?.message || 'Failed to fetch ride history');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Error in fetchRideHistory:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRideHistory();
  }, []);

  // Filter rides based on active tab
  const filteredRides = activeTab === "ride-history" 
    ? filterRidesByBookingType(rideHistory, 'book_now')
    : filterRidesByBookingType(rideHistory, 'scheduled');

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <ContentPageHeader title="Activity" />
        <div className="flex items-center justify-center flex-grow">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full h-full flex flex-col">
        <ContentPageHeader title="Activity" />
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ContentPageHeader title="Activity" />
      <div className="flex flex-col flex-grow p-4 md:p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium text-center ${
              activeTab === "ride-history"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("ride-history")}
          >
            Trip History
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium text-center ${
              activeTab === "planned-rides"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("planned-rides")}
          >
            Scheduled Rides
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="flex-grow overflow-y-auto">
          {activeTab === "ride-history" && (
            <div className="space-y-4">
              {filteredRides.length > 0 ? (
                filteredRides.map((ride) => (
                  <RideHistoryCard
                    deliveryDetails={{
                      id: ride.id,
                      pickupAddress: ride.pickup_location,
                      destinationAddress: ride.dropoff_location,
                      distanceInKm: parseFloat(ride.distance),
                      couponApplied: ride.promocode || 'No coupon applied',
                      date: new Date(ride.pickup_date_time).toLocaleDateString(),
                      passenger: ride.no_of_passenger
                    }}
                    key={ride.id}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No ride history found
                </div>
              )}
            </div>
          )}

          {activeTab === "planned-rides" && (
            <div className="space-y-4">
              {filteredRides.length > 0 ? (
                filteredRides.map((ride) => (
                  <PlannedRidesCard
                    deliveryDetails={{
                      id: ride.id,
                      pickupAddress: ride.pickup_location,
                      destinationAddress: ride.dropoff_location,
                      distanceInKm: parseFloat(ride.distance),
                      couponApplied: ride.promocode || 'No coupon applied',
                      date: new Date(ride.pickup_date_time).toLocaleDateString(),
                      passenger: ride.no_of_passenger
                    }}
                    key={ride.id}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No scheduled rides found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalActivity;
