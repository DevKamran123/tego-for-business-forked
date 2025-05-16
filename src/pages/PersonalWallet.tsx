import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";
import WalletOverview from "../components/personal-dashboard/WalletOverview";
import WalletActions from "../components/personal-dashboard/WalletActions";
import TransactionHistory from "../components/personal-dashboard/TransactionHistory";

const PersonalWallet = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ContentPageHeader title="Wallet" />
      <div className="max-w-[680px] mx-auto w-full flex flex-col gap-10">
        <WalletOverview />
        <WalletActions />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default PersonalWallet;
