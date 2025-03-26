import { JSX } from "react";
import DashboardIcon from "../assets/icons/dashboard.png";
import RidesIcon from "../assets/icons/swap_driving_apps.png";
import ReferralIcon from "../assets/icons/group.png";
import CouponsIcon from "../assets/icons/confirmation_number.png"

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
];
