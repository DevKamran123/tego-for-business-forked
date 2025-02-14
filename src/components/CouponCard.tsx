import "../styles/components/CouponCard.scss";
import copy from "../assets/icons/copy.svg";

export default function CouponCard() {

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
                        <img src={copy} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}