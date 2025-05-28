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
      <div className="flex items-center gap-10 xl:gap-16">
        {btnGroup.map((btn, index) => (
          <div
            className="bg-pebbleGray/15 border border-pebbleGray/25 rounded-[20px] w-full p-4 cursor-pointer flex flex-col items-center gap-2.5"
            onClick={btn.action}
            key={index}
          >
            <div className="size-[60px] 2xl:size-[70px] relative">
              <img src={btn.icon} alt={btn.label} className="w-full" />
            </div>
            <span className="text-base 2xl:text-xl font-semibold text-grayishBlue">
              {btn.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletActions;
