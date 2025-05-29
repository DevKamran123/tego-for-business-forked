import React from "react";
import userIcon from "../../assets/icons/person.svg";
import securityIcon from "../../assets/icons/encrypted.svg";
import privacyIcon from "../../assets/icons/lock.svg";
import { useNavigate } from "react-router-dom";

const ProfileOptionsCard: React.FC = () => {
  const navigate = useNavigate();

  const profileOptions = [
    {
      icon: userIcon,
      title: "Personal info",
      sub: "Name, Phone, Email",
      path: "/personal/dashboard/personal-info",
    },
    {
      icon: securityIcon,
      title: "Security",
      sub: "Login methods, activity",
      path: "/personal/dashboard/security",
    },
    {
      icon: privacyIcon,
      title: "Privacy & Data",
      sub: "Privacy center, third party apps",
      path: "/personal/dashboard/privacy-and-data",
    },
  ];

  return (
    <div className="w-full bg-white border border-chromeSilk rounded-2xl 2xl:rounded-3xl py-4 px-8 xl:py-5 2xl:px-10">
      <div className="flex flex-col">
        {profileOptions.map((profile, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(profile.path);
            }}
            className={`cursor-pointer py-6 2xl:py-8  ${
              index > 0 && "border-t border-t-pebbleGray/25"
            }`}
            role="button"
          >
            <div className="flex items-center gap-4 2xl:gap-5">
              <div className="size-[35px] 2xl:size-[50px] relative">
                <img
                  src={profile.icon}
                  alt={profile.title}
                  className="w-full"
                />
              </div>

              <div className="w-full flex flex-col">
                <p className="text-lg 2xl:text-xl text-grayishBlue font-bold">
                  {profile.title}
                </p>
                <p className="text-base 2xl:text-lg text-deepMauve/45 font-medium">
                  {profile.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOptionsCard;
