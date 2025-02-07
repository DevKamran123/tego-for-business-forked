import "../styles/components/Header.scss";
import globe from "../assets/images/globe.png";

export default function Header() {
    return (
        <div className="headerCont">
            <div className="headerCont_logo">
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
                <div className="headerCont_auth_login">Log In</div>
                <div className="headerCont_auth_signup">Sign up</div>
            </div>
        </div>
    )
}