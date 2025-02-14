import "../styles/components/HistoryCard.scss";
import toFrom from "../assets/images/toFrom.png";
import { DeliveryDetails } from "../data/dashboard";
import useRideStore from "../store/RideStore";
import { useNavigate } from "react-router-dom";

interface HistoryCardProps {
    deliveryDetails: DeliveryDetails
}

export default function HistoryCard({deliveryDetails}: HistoryCardProps) {
    const setCurrentId = useRideStore((state)=>state.setCurrentId);
    const navigate = useNavigate();

    const {
        pickupAddress,
        couponApplied,
        destinationAddress,
        distanceInKm,
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