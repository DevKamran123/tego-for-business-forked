import React from "react";

interface IconWrapperProps {
  icon: string;
  className?: string;
}
const IconWrapper: React.FC<IconWrapperProps> = ({
  icon,
  className = "bg-paleSilver px-2.5 xl:p-3.5 rounded-2xl border border-pebbleGray/50",
}) => {
  return (
    <div className={className}>
      <div className="size-5 xl:size-6 relative">
        <img src={icon} className="w-full" />
      </div>
    </div>
  );
};

export default IconWrapper;
