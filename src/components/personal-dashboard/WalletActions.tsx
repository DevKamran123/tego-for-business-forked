import buyIcon from "../../assets/svgs/add_card.svg";
import earnIcon from "../../assets/svgs/approval_delegation.svg";

const WalletActions = () => {
  const btnGroup = [
    {
      label: "Buy",
      icon: buyIcon,
      action: () => {
        return;
      },
    },
    {
      label: "Earn",
      icon: earnIcon,
      action: () => {
        return;
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {btnGroup.map((btn, index) => (
          <div
            className="bg-pebbleGray/15 border border-pebbleGray/25 rounded-[20px] w-full p-4 max-w-[200px] lg:max-w-[304px] cursor-pointer flex flex-col items-center gap-2.5"
            onClick={btn.action}
            key={index}
          >
            <div className="size-[70px] relative">
              <img src={btn.icon} alt={btn.label} className="w-full" />
            </div>
            <span className="text-xl font-semibold text-grayishBlue">
              {btn.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletActions;
