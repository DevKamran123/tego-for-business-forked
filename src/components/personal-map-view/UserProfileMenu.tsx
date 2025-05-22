import React from "react";
import AccountCircle from "../icons/AccountCircle";
import starIcon from "../../assets/icons/star.svg";
import PokerChip from "../icons/PokerChip";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import UserMenuItems from "./UserMenuItems";
import { useNavigate } from "react-router-dom";

interface UserProfileMenuProps {
  open: boolean;
  name: string;
  token: number;
  rating: number;
  ref: React.RefObject<HTMLDivElement | null>;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  open,
  name,
  token,
  rating,
  ref,
}) => {
  const navigate = useNavigate();

  return (
    open && (
      <div
        ref={ref}
        className="fixed bg-white border border-black/15 shadow-md shadow-black/5 rounded-3xl px-6 py-5 top-[100px] xl:top-[110px] 2xl:top-[130px] max-w-[360px] xl:max-w-[400px] 2xl:max-w-[428px] w-full right-20 z-30"
      >
        <div className="flex items-center justify-between pb-2.5">
          <h3 className="text-3xl font-bold max-w-[240px] truncate">{name}</h3>

          <AccountCircle size={60} />
        </div>

        <div className="bg-pebbleGray/15 rounded-3xl py-1 px-2 flex items-center gap-2.5 w-fit">
          <div className="size-3.5">
            <img src={starIcon} alt="star icon" className="w-full" />
          </div>
          <span className="text-xs text-grayishBlue">{rating.toFixed(2)}</span>
        </div>

        <div className="mt-6 bg-pebbleGray/15 border border-pebbleGray/25 rounded-2xl p-4 flex justify-between items-center">
          <p className="text-sm font-bold text-grayishBlue">RideTEGO Credits</p>

          <div className="flex items-center gap-1">
            <PokerChip size={30} />
            <span className="text-2xl font-bold text-grayishBlue">{token}</span>
          </div>
        </div>

        <div className="mt-8 flex-col flex gap-4">
          <button className="flex items-center gap-5 cursor-pointer">
            <span className="text-midnightInk text-lg">
              <IoPersonSharp />
            </span>
            <p className="text-grayishBlue text-lg">Account</p>
          </button>
          <div className="h-[1px] bg-pebbleGray/20 w-full"></div>
          <button className="flex items-center gap-5 cursor-pointer">
            <span className="text-midnightInk text-lg">
              <IoMdPricetag />
            </span>
            <p className="text-grayishBlue text-lg">Coupons</p>
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
