import useMenuStore from "../store/MenuStore";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import menu from "../assets/icons/menu.png";
import "../styles/components/MobileHeader.scss";
import notification from "../assets/icons/notification.svg";

export default function MobileHeader() {
    const toggleMenu = useMenuStore((state)=>state.toggleMenu);
    const isOpen = useMenuStore((state)=>state.isOpen);
    return (
        <div className="mobileHeader">
            <div className={`mobileHeader_menu ${isOpen? "open" : "normal"}`}
                onClick={()=>toggleMenu()}
            >
                <img src={menu} alt="menu" />
            </div>
            <div className="mobileHeader_logo">
                <img src={rideTegoLogo} alt="logo" />
                RideTEGO
            </div>
            <div className="mobileHeader_layout">
                <img src={notification} alt="bell" />
                <div></div>
            </div>
        </div>
    )
}