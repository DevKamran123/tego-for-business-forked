import React from "react";

interface PencilIconProps {
  className?: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

const PencilIcon: React.FC<PencilIconProps> = ({
  className = "",
  fillColor = "#F8F8F8",
  strokeColor = "black",
  strokeWidth = 1.375,
  width = 45,
  height = 44,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 45 44"
      fill="none"
      className={className}
    >
      <path
        d="M24.6545 6.59999L9.60287 22.5317C9.03454 23.1367 8.48454 24.3283 8.37454 25.1533L7.6962 31.0933C7.45787 33.2383 8.99787 34.705 11.1245 34.3383L17.0279 33.33C17.8529 33.1833 19.0079 32.5783 19.5762 31.955L34.6279 16.0233C37.2312 13.2733 38.4045 10.1383 34.3529 6.30666C30.3195 2.51166 27.2579 3.84999 24.6545 6.59999Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1328 9.2583C22.9211 14.3183 27.0278 18.1866 32.1245 18.7"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83594 40.3333H38.8359"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilIcon;
