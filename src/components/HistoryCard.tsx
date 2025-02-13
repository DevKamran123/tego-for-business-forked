import "../styles/components/HistoryCard.scss";
import toFrom from "../assets/images/toFrom.png";

export default function HistoryCard() {
    return (
        <div className="historycard">
            <img src={toFrom} alt="to and fro" />
            <div className="historycard_layout">
                <div className="historycard_layout_address">
                    <div className="historycard_layout_address_pickup">
                        <div className="historycard_layout_address_pickup_main">
                            235 Palm Street, Detroit
                        </div>
                        <div className="historycard_layout_address_pickup_sub">
                            Pickup point
                        </div>
                    </div>

                    <div className="historycard_layout_address_destination">
                        <div className="historycard_layout_address_destination_main">
                            35 Main street, Detroit
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
                            Coupon
                        </div>
                    </div>

                    <div className="historycard_layout_other_destination">
                        <div className="historycard_layout_other_destination_sub">
                            Distance
                        </div>
                        <div className="historycard_layout_other_destination_main">
                            15km
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}