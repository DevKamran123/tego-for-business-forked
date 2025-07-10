import "../styles/components/Header.scss";
import { useNavigate } from "react-router-dom";

import globe from "../assets/images/globe.png";
import rideTegoLogo from "../assets/images/rideTegoLogoBlue.png";
import menu from "../assets/icons/menu.png";
import useMenuStore from "../store/MenuStore";
import Cookies from "js-cookie";

import { useClickOutside } from "../hooks/useClickOutside";
import BookmarkFlag from "./icons/BookmarkFlag";
import AccountCircle from "./icons/AccountCircle";
import DropdownArrow from "./icons/DropdownArrow";
import UserProfileMenu from "./personal-map-view/UserProfileMenu";
import useAppStore from "../store/AppStore";

export default function Header() {
  const navigate = useNavigate();
  const toggleMobileMenu = useMenuStore((state) => state.toggleMenu);
  const mobileMenuIsOpen = useMenuStore((state) => state.isOpen);
  const session = Cookies.get("session");
  const {session: userSessionString} = useAppStore((state) => state);
  const userSession = userSessionString ? JSON.parse(userSessionString) : null;

  const { openState: userProfileMenuOpen, toggleOpen: toggleUserProfileMenuDirectly, ref: userProfileMenuRef } = useClickOutside(false);
  const userInfo = {
    name: "Daniel Victor",
    token: 648,
    rating: 5,
  };

  return (
    <>
      <div className="responsiveHeader">
        <div
          className={`responsiveHeader_menu ${mobileMenuIsOpen ? "open" : "normal"}`}
          onClick={() => toggleMobileMenu()}
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
            onClick={() => navigate(session && userSession && userSession?.profile?.accountType !== "personal" ? "/dashboard/rides" : "/personal/ride")}
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
            <>
              <div
                className="headerCont_auth_login"
                onClick={() => navigate("/login")}
              >
                Log In
              </div>
              <div
                className="headerCont_auth_signup"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </div>
            </>
          )}

          {session && (
            <>
              <div
                className="headerCont_auth_signup"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </div>
              <div
                className="headerCont_details_content flex items-center gap-1 cursor-pointer"
                onClick={() => navigate("/personal/activity")}
              >
                <BookmarkFlag size={20} />
                <p>Activity</p>
              </div>
              {/* Profile Dropdown */}
              <div className="relative flex items-center" ref={userProfileMenuRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleUserProfileMenuDirectly()} // Modified to call directly
                >
                  <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"> {/* Adjusted for visibility */}
                    <AccountCircle />
                  </div>
                  <DropdownArrow isOpen={!!userProfileMenuOpen} /> {/* Coerce to boolean */} 
                </div>
                <UserProfileMenu
                  open={!!userProfileMenuOpen} // Coerce to boolean
                  token={userInfo.token}
                  rating={userInfo.rating}
                  ref={userProfileMenuRef} // Pass the ref here
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

