import React from "react";
import UserAvatar from "./UserAvatar";
import { useUserData } from "../../hooks/useUserData";

interface UserProfileHeaderProps {
  photo?: string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ photo }) => {
  const { fullName, email } = useUserData();

  return (
    <div className="w-full pt-16">
      <div className="flex flex-col w-full items-center gap-6 2xl:gap-8">
        <UserAvatar photo={photo} size={140} />
        <div className="flex flex-col w-full items-center gap-1">
          <h4 className="text-2xl 2xl:text-3xl font-bold text-grayishBlue">
            {fullName}
          </h4>
          <h5 className="text-xl 2xl:text-2xl font-medium text-deepMauve/45">
            {email}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
