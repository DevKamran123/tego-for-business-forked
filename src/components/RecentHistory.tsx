import "../styles/components/HistoryCard.scss";
import toFrom from "../assets/images/toFrom.png";
import { DeliveryDetails } from "../data/dashboard";
import useRideStore from "../store/RideStore";
import { useUnitContext } from "../useUnitContext";

interface RecentHistoryProps {
    deliveryDetails: DeliveryDetails
}

export default function RecentHistory({deliveryDetails}: RecentHistoryProps) {
    const activeTab = useRideStore((state)=>state.activeTab);
    const { formatDistance } = useUnitContext();

    const {
        pickupAddress,
        couponApplied,
        destinationAddress,
        distanceInKm,
        passenger,
        date,
    } = deliveryDetails;


    return (
        <div className="historycard">
            <img src={toFrom} alt="to and fro" />
            <div className="historycard_layout">
                <div className="historycard_layout_address">
                    <div className="historycard_layout_address_pickup">
                        <div className="historycard_layout_address_pickup_main">
                            {pickupAddress}
                        </div>
                        <div className="historycard_layout_address_pickup_sub">
                            Pickup point
                        </div>
                    </div>

                    <div className="historycard_layout_address_destination">
                        <div className="historycard_layout_address_destination_main">
                            {destinationAddress}
                        </div>
                        <div className="historycard_layout_address_destination_sub">
                            Destination
                        </div>
                    </div>
                </div>

                
                {activeTab==="planned-rides" &&
                <div className="historycard_layout_optional">
                    <div className="historycard_layout_optional_pickup">
                        <div className="historycard_layout_optional_pickup_sub">
                            Date
                        </div>
                        <div className="historycard_layout_optional_pickup_main">
                            {date}
                        </div>
                    </div>

                    <div className="historycard_layout_optional_destination">
                        <div className="historycard_layout_optional_destination_sub">
                            Number of Passengers
                        </div>
                        <div className="historycard_layout_optional_destination_main">
                            {passenger}
                        </div>
                    </div>
                </div>}


                <div className="historycard_layout_other">
                    <div className="historycard_layout_other_pickup">
                        <div className="historycard_layout_other_pickup_sub">
                            Payment
                        </div>
                        <div className="historycard_layout_other_pickup_main">
                            {couponApplied}
                        </div>
                    </div>

                    <div className="historycard_layout_other_destination">
                        <div className="historycard_layout_other_destination_sub">
                            Distance
                        </div>
                        <div className="historycard_layout_other_destination_main">
                            {formatDistance(distanceInKm)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}