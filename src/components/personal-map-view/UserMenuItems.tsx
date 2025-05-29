import { MdWallet, MdOutlineSupport } from "react-icons/md";
import BookmarkFlag from "../icons/BookmarkFlag";
import { useNavigate } from "react-router-dom";

const UserMenuItems = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Activity",
      Icon: <BookmarkFlag color="#292D32" size={20} />,
      action: () => {
        // todo: navigate to activity
        // navigate('')
        return;
      },
    },
    {
      label: "Wallet",
      Icon: <MdWallet size={20} />,
      action: () => {
        navigate("/personal/dashboard/wallet");
      },
    },
    {
      label: "Help",
      Icon: <MdOutlineSupport size={20} />,
      action: () => {
        // todo: navigate to route
        // navigate('')
        return;
      },
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 justify-between">
      {items.map((item, index) => (
        <button
          className="px-4 py-2.5 rounded-xl bg-pebbleGray/15 border border-pebbleGray/25 flex flex-col gap-2.5 items-center justify-center cursor-pointer text-sm"
          key={index}
          onClick={item.action}
        >
          {item.Icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default UserMenuItems;
