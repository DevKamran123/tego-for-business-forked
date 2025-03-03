import { deliveryData, DeliveryDetails } from "../data/dashboard";
import useRideStore from "../store/RideStore";
import DashboardHeader from "./DashboardHeader";

import "../styles/components/RideHistory.scss";
import GoBackRides from "./GoBackRides";
import DetailsCardDriver from "./DetailsCardDriver";
import RideHistoryCard from "./RideHistoryCard";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSiebar";


export default function RideHistory() {
    const currentId = useRideStore((state)=>state.currentId);

    const selectedDelivery = deliveryData.find((deliveryDetails)=> deliveryDetails.id===currentId);

    console.log(selectedDelivery);

    return (
        <div className="ridehistory">
            <DashboardHeader />
            <MobileHeader />
            <MobileSidebar />
            <GoBackRides text="Ride History"/>
            <div className="ridehistory_container">
                <RideHistoryCard deliveryDetails={selectedDelivery as DeliveryDetails} />
            </div>
            <div className="ridehistory_details-wrapper">
                <button 
                    className={`ridehistory_details-wrapper_details-button`}
                >
                    DETAILS
                </button>
            </div>
            <div className="ridehistory_detailsCard">
                <DetailsCardDriver />
            </div>
        </div>
    )
}