import "../styles/components/CouponCard.scss";
import copy from "../assets/icons/copy.svg";
// import { generateReferralLink } from "../utils/dashboard";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CouponCard() {

    const [copied, setCopied] = useState(false);
    // const referralLink = generateReferralLink(user?.user.referralCode as string);

    const handleCopy = async () => {
    try {
        // await navigator.clipboard.writeText(referralLink);
        await navigator.clipboard.writeText("Retr2356Go");
        toast.success("copied");
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        console.log(copied);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    };


    return (
        <div className="couponCard">
            <div className="couponCard_top">
                Company summer retreat
            </div>
            <div className="couponCard_bottom">
                <div className="couponCard_bottom_bonus">
                    <div className="couponCard_bottom_bonus_percent">
                        100% <span>off</span>
                    </div>
                    <div className="couponCard_bottom_bonus_validity">
                        Valid Until: 01 -12-2025
                    </div>
                </div>
                <div className="couponCard_bottom_refferal">
                    <div className="couponCard_bottom_refferal_code">
                        Retr2356Go
                    </div>
                    <div className="couponCard_bottom_refferal_copy">
                        <div>
                            Copy code
                        </div>
                        <img src={copy} alt="" onClick={handleCopy}/>
                    </div>
                </div>
            </div>
        </div>
    )
}