import { useState } from "react";
import CouponNav from "../components/personal-dashboard/CouponNav";
import CouponCard from "../components/CouponCard";

const PersonalCoupon = () => {
  const navLinks = [
    {
      label: "Available",
      slug: "available",
    },
    {
      label: "Used",
      slug: "used",
    },
    {
      label: "Expired",
      slug: "expired",
    },
  ];

  const [activeTab, setActiveTab] = useState("available");
  const onTabClick = (slug: string) => {
    setActiveTab(slug);
  };

  const availableCouponPlaceholders = Array(6).fill(null);
  const usedCouponPlaceholders = Array(3).fill(null);
  const expiredCouponPlaceholders = Array(2).fill(null);

  const tabToDisplay =
    activeTab === "used"
      ? usedCouponPlaceholders
      : activeTab === "expired"
      ? expiredCouponPlaceholders
      : availableCouponPlaceholders;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="max-w-[85%] mx-auto w-full flex flex-col gap-10">
        <div className="w-full py-9">
          <h1 className="text-2xl 2xl:text-3xl font-bold text-grayishBlue">
            Coupons
          </h1>
        </div>

        <CouponNav
          navLinks={navLinks}
          handleClick={onTabClick}
          activeTab={activeTab}
        />

        <div className="grid grid-cols-3 gap-3">
          {tabToDisplay.map((_, index) => {
            return <CouponCard key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonalCoupon;
