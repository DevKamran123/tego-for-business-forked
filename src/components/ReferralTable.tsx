import "../styles/components/ReferralTable.scss";
import ReferralCard from "./ReferralCard";

export default function ReferralTable() {
    return (
        <div className="referralTable">
            <div className="referralTable_title">
                <div>DATE</div>
                <div>USER</div>
                <div>REFFERRALS FROM THE USER</div>
                <div className="referralTable_title_last">POINTS FROM THE USER</div>
            </div>

            <ReferralCard />
            <ReferralCard />
            <ReferralCard />
            <ReferralCard />
            
        </div>
    )
}