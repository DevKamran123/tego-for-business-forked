import "../styles/components/HistoryCard.scss";
import toFrom from "../assets/images/toFrom.png";
import { DeliveryDetails } from "../data/dashboard";
import useRideStore from "../store/RideStore";
import { useNavigate } from "react-router-dom";

interface PlannedRidesCardProps {
    deliveryDetails: DeliveryDetails
}

export default function PlannedRidesCard({deliveryDetails}: PlannedRidesCardProps) {
    const setCurrentId = useRideStore((state)=>state.setCurrentId);
    const navigate = useNavigate();

    const {
        pickupAddress,
        couponApplied,
        destinationAddress,
        distanceInKm,
        passenger,
        date,
        id,
    } = deliveryDetails;

    function action() {
        setCurrentId(id);
        navigate(`/dashboard/rides/${id}`);
    }

    return (
        <div className="historycard" onClick={action}>
            <img src={toFrom} alt="to and fro" />
            <div className="historycard_layout">
                <div className="historycard_layout_address">
                    <div className="historycard_layout_address_pickup">
                        <div className="historycard_layout_address_pickup_sub">
                            Pickup point
                        </div>
                        <div className="historycard_layout_address_pickup_main">
                            {pickupAddress}
                        </div>
                    </div>

                    <div className="historycard_layout_address_destination">
                        <div className="historycard_layout_address_destination_sub">
                            Destination
                        </div>
                        <div className="historycard_layout_address_destination_main">
                            {destinationAddress}
                        </div>
                    </div>
                </div>

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
                </div>


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
                            {distanceInKm}km
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}