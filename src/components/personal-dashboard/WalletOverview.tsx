import CreditBalanceCard from "./CreditBalanceCard";

const WalletOverview = () => {
  return (
    <div className="flex flex-col w-full">
      <h6 className="text-sm text-grayishBlue font-bold">
        RideTEGO Credit Balance
      </h6>

      <div className="mt-5">
        <CreditBalanceCard balance={648} used={362} received={1000} />
      </div>
    </div>
  );
};

export default WalletOverview;
