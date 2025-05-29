import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";
import PlannedRidesCard from "../components/PlannedRidesCard";
import RideHistoryCard from "../components/RideHistoryCard";
import { deliveryData } from "../data/dashboard";
import useRideStore from "../store/RideStore";

const PersonalActivity = () => {
  const activeTab = useRideStore((state) => state.activeTab);
  const setActiveTab = useRideStore((state) => state.setActiveTab);

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
              {deliveryData.map((deliveryDetails) => (
                <RideHistoryCard
                  deliveryDetails={deliveryDetails}
                  key={deliveryDetails.id}
                />
              ))}
            </div>
          )}

          {activeTab === "planned-rides" && (
            <div className="space-y-4">
              {deliveryData.map((deliveryDetails) => (
                <PlannedRidesCard
                  deliveryDetails={deliveryDetails}
                  key={deliveryDetails.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalActivity;
