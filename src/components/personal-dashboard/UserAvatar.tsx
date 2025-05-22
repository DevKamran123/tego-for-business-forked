import React from "react";
import editIcon from "../../assets/icons/edit.svg";

interface UserAvatarProps {
  photo?: string;
  size?: string | number;
  edit?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  photo,
  size = "170px",
  edit = false,
}) => {
  const RenderEditBtn = () =>
    edit && (
      <div className="size-[70px] rounded-full bg-white absolute bottom-0 right-0 border border-pebbleGray/25 cursor-pointer flex items-center justify-center">
        <div className="size-[40px] relative">
          <img src={editIcon} alt="edit icon" className="w-full" />
        </div>
      </div>
    );

  return photo ? (
    <div className="relative w-fit">
      <div style={{ width: size, height: size }} className="relative">
        <img src={photo} alt="profile picture" className="w-full" />
      </div>
      {RenderEditBtn()}
    </div>
  ) : (
    <div className="relative w-fit">
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-paleSilver"
      ></div>
      {RenderEditBtn()}
    </div>
  );
};

export default UserAvatar;
