import React from "react";

type navLink = {
  label: string;
  slug: string;
};

interface CouponNavProps {
  navLinks: navLink[];
  handleClick: (slug: string) => void;
  activeTab: string;
}

const CouponNav: React.FC<CouponNavProps> = ({
  navLinks,
  handleClick,
  activeTab,
}) => {
  return (
    <div className="px-5 2xl:px-7 py-5 border-b border-pebbleGray">
      <div className="flex items-center gap-12 xl:gap-16 ">
        {navLinks.map((nav, index) => {
          return (
            <button
              className={`${
                activeTab === nav.slug ? "text-black" : "text-pebbleGray"
              } text-2xl 2xl:text-[28px] font-medium`}
              onClick={() => handleClick(nav.slug)}
              key={index}
            >
              {nav.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CouponNav;
