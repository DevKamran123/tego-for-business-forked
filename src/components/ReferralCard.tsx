import "../styles/components/ReferralTable.scss";
import smallPeople from "../assets/icons/smallPeople.png";
import smallCoupon from "../assets/icons/smallCoupon.png";

export default function ReferralCard() {
    return (
        <div className="referralTable_title referralTable_content">
            <div>23.02, 09:45</div>
            <div>Martin Lawrence</div>
            <div className="referralCard_persons">
                <img src={smallPeople} alt="referral" />
                <div>0</div>
            </div>
            <div className="referralTable_title_last">
                <div className="referralCard_points">
                    <div>+10</div>
                    <img src={smallCoupon} alt="coupon" />
                </div>
            </div>
        </div>
    )
}