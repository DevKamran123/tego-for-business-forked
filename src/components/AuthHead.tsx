import "../styles/components/AuthHead.scss";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import alert from "../assets/svgs/alert.svg"

interface AuthHeadProps {
    text: string;
    subText?: string;
}

export default function AuthHead({text, subText}: AuthHeadProps) {
    return (
        <div className="authHead">
            <div className="authHead_logo">
                <img src={rideTegoLogo} alt="logo" />
                RideTEGO
            </div>
            <div className="authHead_text">
                {text}
            </div>
            {subText && <div className="authHead_subText">
                <img src={alert} alt="" />
                <div>{subText}</div>
            </div>}
        </div>
    )
}