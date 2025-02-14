import { useNavigate } from "react-router-dom";
import arrowLeft from "../assets/icons/arrow-left.png";

import "../styles/components/GoBackRides.scss";

export default function GoBackRides({text}: {text: string}) {
    const navigate = useNavigate();
    return (
        <div 
            className="gobackrides"
            onClick={()=>navigate(-1)}
        >
            <img src={arrowLeft} alt="go back" />
            <div className="gobackrides_title">{text}</div>
        </div>
    )
}