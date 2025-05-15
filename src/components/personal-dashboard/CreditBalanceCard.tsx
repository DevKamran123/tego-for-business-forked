import React from "react";
import IconWrapper from "../IconWrapper";

import incomingIcon from "../../assets/icons/call_received.svg";
import outgoingIcon from "../../assets/icons/arrow_outward.svg";
import PokerChip from "../icons/PokerChip";
import TransactionToken from "./TransactionToken";

interface CreditBalanceCardProps {
  balance: number;
  used: number;
  received: number;
}

const CreditBalanceCard: React.FC<CreditBalanceCardProps> = ({
  balance,
  used,
  received,
}) => {
  const transactions = [
    {
      type: "Used",
      token: used,
      icon: outgoingIcon,
    },
    {
      type: "Received",
      token: received,
      icon: incomingIcon,
    },
  ];

  return (
    <div className="bg-pebbleGray/15 border border-pebbleGray/25 rounded-[20px] w-full px-5 py-6 xl:py-7">
      <div className="flex flex-col gap-5">
        {/* credit balance */}
        <div className="flex items-center gap-3">
          <PokerChip size={100} />
          <h1 className="text-6xl xl:text-7xl font-bold text-grayishBlue">
            {balance}
          </h1>
        </div>

        <div className="w-full px-4 flex items-center gap-10 md:gap-14 xl:gap-20">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center gap-4 xl:gap-5">
              <IconWrapper icon={transaction.icon} />
              <div className="text-center">
                <p className="text-sm font-normal text-grayishBlue">
                  {transaction.type}
                </p>

                <TransactionToken
                  token={transaction.token}
                  iconColor="#1C1B1F"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditBalanceCard;
