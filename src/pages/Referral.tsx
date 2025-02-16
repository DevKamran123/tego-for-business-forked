import DashboardHeader from "../components/DashboardHeader";
import Total from "../components/Total";
import "../styles/pages/Referral.scss";

export default function Referral() {
    return (
        <div className="referral">
            <DashboardHeader />
            <div className="referral_title">
                Referral
            </div>
            <div className="referral_top">
                <div className="referral_top_layout">
                    <div className="referral_top_layout_total">
                        <Total />
                        <Total />
                    </div>
                    <div className="referral_top_layout_ref">
                        <div className="referral_top_layout_ref_text">
                            YOUR REFERRAL LINK
                        </div>
                        <div className="referral_top_layout_ref_container">
                            <div></div>
                            <button>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="referral_bottom">
                
            </div>
        </div>
    )
}