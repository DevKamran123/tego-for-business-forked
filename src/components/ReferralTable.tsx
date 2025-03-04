import { useMediaQuery } from "react-responsive";
import "../styles/components/ReferralTable.scss";
import ReferralCard from "./ReferralCard";

export default function ReferralTable() {
    const isMobile = useMediaQuery({maxWidth: 865});

    return (
        <div className="referralTable">
           {!isMobile &&
           <div className="referralTable_title">
                <div className="referralTable_title_first">DATE</div>
                <div>USER</div>
                <div>REFFERRALS FROM THE USER</div>
                <div className="referralTable_title_last">POINTS FROM THE USER</div>
            </div>}

            {isMobile &&
           <div className="referralTable_title">
                <div className="referralTable_title_first">DATE</div>
                <div>USER</div>
                <div style={{textAlign: "center"}}>REFFERRALS</div>
                <div className="referralTable_title_last">POINTS</div>
            </div>}

            <ReferralCard />
            <ReferralCard />
            <ReferralCard />
            <ReferralCard />
            
        </div>
    )
}