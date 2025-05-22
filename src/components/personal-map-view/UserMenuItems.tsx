import { MdWallet, MdOutlineSupport } from "react-icons/md";
import BookmarkFlag from "../icons/BookmarkFlag";

const UserMenuItems = () => {
  const items = [
    {
      label: "Activity",
      Icon: <BookmarkFlag color="#292D32" size={24} />,
    },
    {
      label: "Wallet",
      Icon: <MdWallet size={24} />,
    },
    {
      label: "Help",
      Icon: <MdOutlineSupport size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 justify-between">
      {items.map((item, index) => (
        <button
          className="px-5 py-3 rounded-2xl bg-pebbleGray/15 border border-pebbleGray/25 flex flex-col gap-2.5 items-center justify-center cursor-pointer text-sm"
          key={index}
        >
          {item.Icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default UserMenuItems;
