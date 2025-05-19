import React from "react";
import UserAvatar from "./UserAvatar";

interface UserProfileHeaderProps {
  photo?: string;
  fullName: string;
  email: string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  photo,
  fullName,
  email,
}) => {
  return (
    <div className="w-full pt-16">
      <div className="flex flex-col w-full items-center gap-8">
        <UserAvatar photo={photo} size={194} />
        <div className="flex flex-col w-full items-center gap-1">
          <h4 className="text-4xl font-bold text-grayishBlue">{fullName}</h4>
          <h5 className="text-3xl font-medium text-deepMauve/45">{email}</h5>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
