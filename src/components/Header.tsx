import "../styles/components/Header.scss";
import { useNavigate } from "react-router-dom";

import globe from "../assets/images/globe.png";
import rideTegoLogo from "../assets/images/rideTegoLogoBlue.png";
import menu from "../assets/icons/menu.png";
import useMenuStore from "../store/MenuStore";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const isOpen = useMenuStore((state) => state.isOpen);
  const session = Cookies.get("session");

  return (
    <>
      <div className="responsiveHeader">
        <div
          className={`responsiveHeader_menu ${isOpen ? "open" : "normal"}`}
          onClick={() => toggleMenu()}
        >
          <img src={menu} alt="menu" />
        </div>
        <div
          onClick={() => navigate("/")}
          className="responsiveHeader_logo cursor-pointer"
        >
          <img src={rideTegoLogo} alt="logo" />
          RideTEGO
        </div>
      </div>
      <div className="responsivePlaceholder"></div>

      <div className="headerCont px-20">
        <div
          onClick={() => navigate("/")}
          className="headerCont_logo cursor-pointer"
        >
          <img src={rideTegoLogo} alt="logo" />
          RideTEGO
        </div>
        <div className="headerCont_details">
          <div
            onClick={() => navigate("/personal/ride")}
            className="headerCont_details_content"
          >
            Ride
          </div>
          <div
            onClick={() => navigate("/drives")}
            className="headerCont_details_content"
          >
            Drive
          </div>
          <div className="headerCont_details_option">
            <select>
              <option>Business</option>
              <option>For Users</option>
            </select>
          </div>
          <div className="headerCont_details_content">About us</div>
          {/* <div className="headerCont_details_content">Blog</div> */}
        </div>
        <div className="headerCont_auth">
          <div className="headerCont_auth_lang">
            <div className="headerCont_auth_lang_image">
              <img src={globe} alt="globe" />
            </div>
            <div className="headerCont_auth_lang_symbol">EN</div>
          </div>
          {!session && (
            <div
              className="headerCont_auth_login"
              onClick={() => navigate("/login")}
            >
              Log In
            </div>
          )}
          {!session && (
            <div
              className="headerCont_auth_signup"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </div>
          )}

          {session && (
            <div
              className="headerCont_auth_signup"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
        </div>
      </div>
    </>
  );
}
