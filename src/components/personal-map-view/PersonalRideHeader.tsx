import rideTegoLogo from "../../assets/images/rideTegoLogoBlue.png";
import { useNavigate } from "react-router-dom";
import DropdownArrow from "../icons/DropdownArrow";
import AccountCircle from "../icons/AccountCircle";
import UserProfileMenu from "./UserProfileMenu";
import BookmarkFlag from "../icons/BookmarkFlag";
import { useClickOutside } from "../../hooks/useClickOutside";

const PersonalRideHeader = () => {
  const navigate = useNavigate();

  const { openState: isOpen, toggleOpen, ref } = useClickOutside(false);

  const userInfo = {
    name: "Daniel Victor",
    token: 648,
    rating: 5,
  };

  return (
    <div className="flex w-screen justify-between items-center h-[4.77rem] px-20 bg-darkBluish">
      <div className="flex items-center gap-14">
        <div
          onClick={() => navigate("/")}
          className="headerCont_logo cursor-pointer"
        >
          <img src={rideTegoLogo} alt="logo" />
          RideTEGO
        </div>

        <div className="headerCont_details text-white">
          <div
            onClick={() => navigate("/dashboard/rides")}
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
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="flex items-center gap-1">
          <BookmarkFlag size={20} />
          <p className="text-white text-base">Activity</p>
        </div>

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => toggleOpen()}
        >
          <div className="size-10 rounded-full bg-white flex items-center justify-center">
            <AccountCircle />
          </div>

          <DropdownArrow isOpen={isOpen as boolean} />
        </div>
      </div>

      <UserProfileMenu
        open={isOpen as boolean}
        name={userInfo.name}
        token={userInfo.token}
        rating={userInfo.rating}
        ref={ref}
      />
    </div>
  );
};

export default PersonalRideHeader;
