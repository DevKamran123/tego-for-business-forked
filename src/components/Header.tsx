import "../styles/components/Header.scss";
import { useNavigate } from "react-router-dom";

import globe from "../assets/images/globe.png";
import rideTegoLogo from "../assets/images/rideTegoLogo.png";
import menu from "../assets/icons/menu.png";
import useMenuStore from "../store/MenuStore";

export default function Header() {
    const navigate = useNavigate();
    const toggleMenu = useMenuStore((state)=>state.toggleMenu);
    const isOpen = useMenuStore((state)=>state.isOpen);

    return (
        <>
            <div className="responsiveHeader">
                <div className={`responsiveHeader_menu ${isOpen? "open" : "normal"}`}
                    onClick={()=>toggleMenu()}
                >
                    <img src={menu} alt="menu" />
                </div>
                <div className="responsiveHeader_logo">
                    <img src={rideTegoLogo} alt="logo" />
                    RideTEGO
                </div>
            </div>  
            <div className="headerCont">
                <div className="headerCont_logo">
                    <img src={rideTegoLogo} alt="logo" />
                    RideTEGO
                </div>
                <div className="headerCont_details">
                    <div className="headerCont_details_option">
                        <select>
                            <option>For Enterprise</option>
                            <option>For Users</option>
                        </select>
                    </div>
                    <div className="headerCont_details_content">Ride</div>
                    <div className="headerCont_details_content">Drive</div>
                    <div className="headerCont_details_content">About us</div>
                    <div className="headerCont_details_content">Contact us</div>
                </div>
                <div className="headerCont_auth">
                    <div className="headerCont_auth_lang">
                        <div className="headerCont_auth_lang_image">
                            <img src={globe} alt="globe" />
                        </div>
                        <div className="headerCont_auth_lang_symbol">EN</div>
                    </div>
                    <div className="headerCont_auth_login" onClick={() => navigate("/login")}>Log In</div>
                    <div className="headerCont_auth_signup" onClick={()=>navigate("/signup")}>Sign up</div>
                </div>
            </div>
        </>
    )
}