import React from "react";

interface DropdownArrowProps {
  isOpen?: boolean;
}

const DropdownArrow: React.FC<DropdownArrowProps> = ({ isOpen }) => {
  return (
    <div
      className={`inline-block transition-transform duration-300 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <mask
          id="mask0_47_228"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="25"
          height="25"
        >
          <rect
            x="0.0237122"
            y="0.972321"
            width="24"
            height="24"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_47_228)">
          <path
            d="M12.0237 15.9723L7.02371 10.9723H17.0237L12.0237 15.9723Z"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
};

export default DropdownArrow;
