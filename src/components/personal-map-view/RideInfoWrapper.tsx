import React from "react";

interface RideInfoWrapperProps {
  title?: string;
  children: React.ReactNode;
}
const RideInfoWrapper: React.FC<RideInfoWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div className="w-full max-w-[23.5%] absolute right-8  top-[30px] z-20 bg-white shadow-lg rounded-2xl px-4 py-8">
      {title && title.length > 0 && (
        <h4 className="text-black font-semibold text-base xl:text-lg">
          {title}
        </h4>
      )}
      <div className={`${title && "mt-6"}`}>{children}</div>
    </div>
  );
};

export default RideInfoWrapper;
