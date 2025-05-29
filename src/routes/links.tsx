import { JSX } from "react";
import DashboardIcon from "../assets/icons/dashboard.png";
import RidesIcon from "../assets/icons/swap_driving_apps.png";
import ReferralIcon from "../assets/icons/group.png";
import CouponsIcon from "../assets/icons/confirmation_number.png"
import {
  MdAccountBalanceWallet,
} from "react-icons/md";
import { FiSettings, FiCreditCard, FiUser } from "react-icons/fi"; // Added FiUser

// Define the interface for link items
interface LinkItem {
  TITLE: string;
  LINK: string;
  SLUG: string;
  ISDASHBOARD?: boolean;
  ISHELP?: boolean;
  ISLOGOUT?: boolean;
  PARENT_SLUG?: string;
  IS_EXTERNAL?: boolean; // New property for external links
  ICON: (isActive: boolean) => JSX.Element;
  CHILDREN?: LinkItem[]; // Define children as an array of LinkItem
}

export const DASHBOARD_LINKS: LinkItem[] = [
  {
    TITLE: "Dashboard",
    LINK: "/dashboard",
    SLUG: "dashboard",
    ISDASHBOARD: true,
    ICON: () => <img src={DashboardIcon} alt="" />,
  },
  {
    TITLE: "Scheduled Rides",
    LINK: "/dashboard/rides",
    SLUG: "rides",
    ISDASHBOARD: true,
    ICON: () => <img src={RidesIcon} alt="" />,
  },
  {
    TITLE: "Referral Code",
    LINK: "/dashboard/referral-code",
    SLUG: "referral-code",
    ISDASHBOARD: true,
    ICON: () => <img src={ReferralIcon} alt="" />,
  },
  {
    TITLE: "Coupons",
    LINK: "/dashboard/coupons",
    SLUG: "coupons",
    ISDASHBOARD: true,
    ICON: () => <img src={CouponsIcon} alt="" />,
  },
   {
    TITLE: "Wallet",
    LINK: "/dashboard/wallet",
    SLUG: "wallet",
    ISDASHBOARD: true,
    ICON: () => <MdAccountBalanceWallet color="white" size={24}/>, 
  },
  {
    TITLE: "Profile",
    LINK: "/dashboard/profile",
    SLUG: "profile",
    ISDASHBOARD: true,
    ICON: () => <FiUser color="white" size={24}/>, 
  },
];

export const MobileBottomNavLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <img src={DashboardIcon} alt="" />,
  },
  {
    name: "Scheduled Rides",
    path: "/dashboard/rides",
    icon: <img src={RidesIcon} alt="" />,
  },
  {
    name: "Referral Code",
    path: "/dashboard/referral-code",
    icon: <img src={ReferralIcon} alt="" />,
  },
  {
    name: "Coupons",
    path: "/dashboard/coupons",
    icon: <img src={CouponsIcon} alt="" />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FiSettings className="w-5 h-5" />,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: <FiCreditCard className="w-5 h-5" />, // Assuming FiCreditCard or similar icon
  },
];
