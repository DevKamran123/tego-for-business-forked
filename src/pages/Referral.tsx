import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Total from "../components/Total";
import "../styles/pages/Referral.scss";
import copy from "../assets/icons/copy.svg";
import smallBag from "../assets/icons/smallBag.png";
import mediumBag from "../assets/icons/mediumBag.png";
import people from "../assets/icons/people.png";
import ReferralTable from "../components/ReferralTable";
import toast from "react-hot-toast";
import MobileHeader from "../components/MobileHeader";
import MobileSidebar from "../components/MobileSiebar";


export default function Referral() {
    const [copied, setCopied] = useState(false);
    
        const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("RideTEGO.ng/ref=129834765");
            toast.success("copied");
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            console.log(copied);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        };
    return (
        <div className="referral">
            <DashboardHeader />
            <MobileHeader />
            <MobileSidebar />
            <div className="referral_title">
                Referral
            </div>
            <div className="referral_top">
                <div className="referral_top_layout">
                    <div className="referral_top_layout_total">
                        <Total details={{image: people, text:"TOTAL REFERRALS", value: 12}} />
                        <Total details={{image: mediumBag, text:"TOTAL POINTS", value: 120}}/>
                    </div>
                    <div className="referral_top_layout_ref">
                        <div className="referral_top_layout_ref_text">
                            YOUR REFERRAL LINK
                        </div>
                        <div className="referral_top_layout_ref_container">
                            <div className="referral_top_layout_ref_container_sep">
                                <div className="referral_top_layout_ref_container_sep_link">
                                    RideTEGO.ng/ref=129834765
                                </div>
                                <div className="referral_top_layout_ref_container_sep_copy" onClick={handleCopy}>
                                    <div>
                                        {copied? "Copied" : "Copy link"}
                                    </div>
                                    <img src={copy} alt="copy"/>
                                </div>
                            </div>
                            <button>
                                Share
                            </button>
                        </div>
                        <div className="referral_top_layout_ref_bonus">
                            Get <span>10.0</span> <img src={smallBag} alt="" /> for each invited user
                        </div>
                    </div>
                </div>
            </div>
            <div className="referral_bottom">
                <div className="referral_bottom_title">
                    My referrals
                </div>
                <ReferralTable />
            </div>
        </div>
    )
}