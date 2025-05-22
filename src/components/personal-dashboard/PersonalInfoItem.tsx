import React from "react";
import { useNavigate } from "react-router-dom";
import arrowNext from "../../assets/icons/arrow_forward_ios.svg";

interface PersonalInfoItemProps {
  label: string;
  value: string;
  params: string;
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
        navigate(`/personal/dashboard/personal-info/edit?field=${params}`);
      }}
      className={`w-full pb-6 cursor-pointer ${
        border && "border-b border-b-pebbleGray/25"
      }`}
      role="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full">
          <h5 className="font-bold text-xl text-grayishBlue">{label}</h5>
          <p className="text-3xl text-deepMauve/45 font-light">{value}</p>
        </div>
        <div className="relative size-6">
          <img src={arrowNext} alt="arrow forward ios" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoItem;
