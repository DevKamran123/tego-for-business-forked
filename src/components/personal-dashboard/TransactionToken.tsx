import React from "react";
import PokerChip from "../icons/PokerChip";

interface TransactionTokenProps {
  token: number;
  color?: string;
  iconColor?: string;
}

const TransactionToken: React.FC<TransactionTokenProps> = ({
  token,
  color = "#292D32",
  iconColor,
}) => {
  return (
    <div className="flex items-center gap-1">
      <PokerChip size={25} color={iconColor || color} />
      <p style={{ color }} className={`text-xl font-semibold`}>
        {token}
      </p>
    </div>
  );
};

export default TransactionToken;
