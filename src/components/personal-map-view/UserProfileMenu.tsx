import React from "react";
import AccountCircle from "../icons/AccountCircle";
import starIcon from "../../assets/icons/star.svg";
import PokerChip from "../icons/PokerChip";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import UserMenuItems from "./UserMenuItems";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";

interface UserProfileMenuProps {
  open: boolean;
  token: number;
  rating: number;
  ref: React.RefObject<HTMLDivElement | null>;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  open,
  token,
  rating,
  ref,
}) => {
  const navigate = useNavigate();
  const { fullName } = useUserData();

  return (
    open && (
      <div
        ref={ref}
        className="fixed bg-white text-black border border-black/15 shadow-md shadow-black/5 rounded-3xl px-6 py-5 top-[90px] w-fit right-20 z-30"
      >
        <div className="flex items-center justify-between pb-2.5">
          <h3 className="text-2xl font-bold max-w-[240px] truncate">{fullName}</h3>

          <AccountCircle size={50} />
        </div>

        <div className="bg-pebbleGray/15 rounded-3xl py-1 px-2 flex items-center gap-1.5 w-fit">
          <div className="size-3">
            <img src={starIcon} alt="star icon" className="w-full" />
          </div>
          <span className="text-xs text-grayishBlue">{rating.toFixed(2)}</span>
        </div>

        <div className="mt-6 bg-pebbleGray/15 border border-pebbleGray/25 rounded-2xl p-4 flex justify-between items-center">
          <p className="text-sm font-bold text-grayishBlue">RideTEGO Credits</p>

          <div className="flex items-center gap-1">
            <PokerChip size={25} />
            <span className="text-xl font-bold text-grayishBlue">{token}</span>
          </div>
        </div>

        <div className="mt-8 flex-col flex gap-4">
          <button
            className="flex items-center gap-5 cursor-pointer"
            onClick={() => {
              navigate("/personal/dashboard/personal-info");
            }}
          >
            <span className="text-midnightInk text-base">
              <IoPersonSharp />
            </span>
            <p className="text-grayishBlue text-base">Account</p>
          </button>
          <div className="h-[1px] bg-pebbleGray/20 w-full"></div>
          <button
            className="flex items-center gap-5 cursor-pointer"
            onClick={() => {
              navigate("/personal/dashboard/coupons");
            }}
          >
            <span className="text-midnightInk text-base">
              <IoMdPricetag />
            </span>
            <p className="text-grayishBlue text-base">Coupons</p>
          </button>
        </div>

        <div className="mt-12">
          <UserMenuItems />
        </div>

        <button
          className="mt-6 py-5 bg-pebbleGray/15 border border-pebbleGray/25 rounded-2xl text-crimsonRed text-sm w-full cursor-pointer"
          onClick={() => navigate("/logout")}
        >
          Sign out
        </button>
      </div>
    )
  );
};

export default UserProfileMenu;
