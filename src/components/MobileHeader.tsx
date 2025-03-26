import useMenuStore from "../store/MenuStore";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import menu from "../assets/icons/menu.png";
import "../styles/components/MobileHeader.scss";
import notification from "../assets/icons/notification.svg";
import { useNavigate } from "react-router-dom";

export default function MobileHeader() {
    const toggleMenu = useMenuStore((state)=>state.toggleMenu);
    const isOpen = useMenuStore((state)=>state.isOpen);
    const navigate = useNavigate();
    return (
        <>
            <div className="headerPlacement"></div>
            <div className="mobileHeader">
                <div className={`mobileHeader_menu ${isOpen? "open" : "normal"}`}
                    onClick={()=>toggleMenu()}
                >
                    <img src={menu} alt="menu" />
                </div>
                <div className="mobileHeader_logo" onClick={() => navigate("/")}>
                    <img src={rideTegoLogo} alt="logo" />
                    RideTEGO
                </div>
                <div className="mobileHeader_layout">
                    <img src={notification} alt="bell" />
                    <div></div>
                </div>
            </div>
        </>
    )
}