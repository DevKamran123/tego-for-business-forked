import { TransactionHistoryTypes } from "../../data/transactionHistory";

import incomingIcon from "../../assets/icons/call_received.svg";
import outgoingIcon from "../../assets/icons/arrow_outward.svg";
import moreIcon from "../../assets/icons/more_vert.svg";
import IconWrapper from "../IconWrapper";
import TransactionToken from "./TransactionToken";

const TransactionHistoryItem = ({
  title,
  type,
  date,
  token,
}: TransactionHistoryTypes) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-1 items-center">
        <div className="w-2/3 flex items-center gap-5">
          <div className="w-fit">
            <IconWrapper
              icon={type === "incoming" ? incomingIcon : outgoingIcon}
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm text-grayishBlue font-bold">{title}</span>
            <span className="text-[8px] text-deepMauve/45 font-medium">
              {date}
            </span>
          </div>
        </div>
        <div className="w-1/3 flex items-center">
          <TransactionToken
            color={type === "incoming" ? "#0D9547" : "#FF3A44"}
            token={token}
          />
        </div>
      </div>

      <button className="size-5 relative">
        <img src={moreIcon} alt="more icon" className="w-full" />
      </button>
    </div>
  );
};

export default TransactionHistoryItem;
