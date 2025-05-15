import clsx from "clsx";
import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "full";
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  variant = "primary",
  className = "",
  type,
  icon,
  iconPosition = "right",
  size = "small",
}) => {
  const baseClasses =
    "text-sm md:text-base lg:text-lg px-6 py-3.5 md:px-12 md:py-7 rounded-lg md:rounded-xl lg:rounded-2xl font-medium transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-darkIndigo text-white disabled:opacity-50",
    secondary: "bg-crimsonRed text-white disabled:opacity-50",
  };

  const sizes = {
    small: "w-fit",
    full: "w-full flex items-center justify-center",
  };

  const combinedClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    className,
    {
      "opacity-50 pointer-events-none": isLoading || disabled,
      "flex items-center gap-2": icon,
      "flex-row": iconPosition === "right",
      "flex-row-reverse": iconPosition === "left",
    }
  );

  const buttonContent = (
    <>
      {isLoading ? "..." : children}
      {icon && !isLoading && icon}
    </>
  );

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={combinedClasses}
    >
      {buttonContent}
    </button>
  );
};

export default CustomButton;
