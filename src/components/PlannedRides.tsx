import { deliveryData, DeliveryDetails } from "../data/dashboard";
import useRideStore from "../store/RideStore";
import DashboardHeader from "./DashboardHeader";
import HistoryCard from "./HistoryCard";

import "../styles/components/RideHistory.scss";
import GoBackRides from "./GoBackRides";
import DetailsCardPassenger from "./DetailsCardRider";


export default function PlannedRides() {
    const currentId = useRideStore((state)=>state.currentId);

    const selectedDelivery = deliveryData.find((deliveryDetails)=> deliveryDetails.id===currentId);

    console.log(selectedDelivery);

    return (
        <div className="ridehistory">
            <DashboardHeader />
            <GoBackRides text="Planned ride details"/>
            <div className="ridehistory_container">
                <HistoryCard deliveryDetails={selectedDelivery as DeliveryDetails} />
            </div>
            <div className="ridehistory_details-wrapper">
                <button 
                    className={`ridehistory_details-wrapper_details-button`}
                >
                    Passenger list
                </button>
            </div>
            <div className="ridehistory_detailsCard">
                <DetailsCardPassenger />
                <DetailsCardPassenger />
                <DetailsCardPassenger />
                <DetailsCardPassenger />
                <DetailsCardPassenger />
                <DetailsCardPassenger />
                <DetailsCardPassenger />
                <DetailsCardPassenger />
            </div>
        </div>
    )
}