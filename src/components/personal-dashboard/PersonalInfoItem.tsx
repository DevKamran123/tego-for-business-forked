import React from "react";
import { useNavigate } from "react-router-dom";
import arrowNext from "../../assets/icons/arrow_forward_ios.svg";

interface PersonalInfoItemProps {
  label: string;
  value: string;
  params?: string;
  border?: boolean;
}

const PersonalInfoItem: React.FC<PersonalInfoItemProps> = ({
  label,
  value,
  params,
  border = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (params) {
          navigate(`/personal/dashboard/personal-info/edit?field=${params}`);
        }
      }}
      className={`w-full pb-6 ${params ? "cursor-pointer" : ""} ${
        border && "border-b border-b-pebbleGray/25"
      }`}
      role="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full">
          <h5 className="font-bold text-base 2xl:text-lg text-grayishBlue">
            {label}
          </h5>
          <p className="text-xl 2xl:text-2xl text-deepMauve/45 font-light">
            {value}
          </p>
        </div>
        <div className="relative size-5">
          <img src={arrowNext} alt="arrow forward ios" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoItem;
