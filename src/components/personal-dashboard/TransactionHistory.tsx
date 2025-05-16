import { transactionHistoryData } from "../../data/transactionHistory";
import TransactionHistoryItem from "./TransactionHistoryItem";

const TransactionHistory = () => {
  return (
    <div className="w-full flex flex-col">
      <h6 className="text-sm text-grayishBlue font-bold">History</h6>
      <div className="w-full mt-5">
        <div className="bg-pebbleGray/15 border border-pebbleGray/25 rounded-[20px] w-full pl-5 pr-12 py-1.5 overflow-y-auto max-h-[447px]">
          {transactionHistoryData.map((transaction, index) => (
            <div
              className={`w-full ${
                index === 0 ? "" : "border-t border-pebbleGray/25"
              } py-4`}
              key={index}
            >
              <TransactionHistoryItem
                title={transaction.title}
                type={transaction.type}
                date={transaction.date}
                token={transaction.token}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
