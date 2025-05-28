import React from "react";
import PersonalInfoItem from "./PersonalInfoItem";

interface PersonalInfoListProps {
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}

const PersonalInfoList: React.FC<PersonalInfoListProps> = ({ user }) => {
  return (
    <div className="w-full mt-5">
      <div className="w-full flex flex-col gap-8 2xl:gap-10">
        <PersonalInfoItem
          label="Name"
          value={`${user.firstName} ${user.lastName}`}
          params="name"
          border
        />
        <PersonalInfoItem
          label="Phone number"
          value={user.phone}
          params="phone"
          border
        />
        <PersonalInfoItem label="Email" value={user.email} />
      </div>
    </div>
  );
};

export default PersonalInfoList;
