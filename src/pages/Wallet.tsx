// Placeholder for Wallet page UI
// Content will be adapted from tego-admin
import React, { useState } from "react";
import {
  MdAccountBalanceWallet,
  MdStars,
  MdHourglassTop,
} from "react-icons/md";
import { BiPlus, BiSearch } from "react-icons/bi";
import {
  Table,
  Modal,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Spin,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Stack from "../components/stack/Stack";
import OverviewCard from "../components/cards/OverviewCard";
import CardWrapper from "../components/cards/CardWrapper";
import {
  UserData,
  WalletEntryType,
  WalletTransaction,
  WalletTransactionStatus,
  WalletTransactionType,
} from "../types"; // Added WalletTransaction
import useAppStore from "../store/AppStore";
import {
  useGetCustomerWalletByPimId,
  useGetWalletTransactions, // Import useGetWalletTransactions
} from "../hooks/useGetWallet";
import { formatAmount, getCurrencySymbol } from "../utils/currencyUtils";
import { formatDate } from "../utils/dateUtils"; // Import formatDate
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { creditWallet } from "../lib/wallet/manageWallet";
import { TInput, TInputLabel } from "../components/styled";
import TButton from "../components/buttons/TButton";
// import "../styles/pages/Wallet.scss"; // Stylesheet import (can be uncommented if file exists)

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Define validation schema using Yup
const DepositSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .min(10, "Amount must be at least 10"),
});

interface DepositFormValues {
  amount: string;
}


const WalletPage: React.FC = () => {
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  // --- Filter State ---
  const [filteredTransactions, setFilteredTransactions] = useState<
    WalletTransaction[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  // --------------------

  const { session } = useAppStore((state) => state);
  const sessionJson: UserData | null = session
    ? JSON.parse(session)
    : null;
  const pimId = sessionJson?.profile?.pimId || null;

  console.log("PIM ID:", pimId, sessionJson);

  const {
    data: walletData,
    isLoading: isLoadingWallet,
    error: walletError,
    refetch: refetchWallet,
  } = useGetCustomerWalletByPimId(pimId);

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useGetWalletTransactions(pimId, sessionJson !== null || undefined);

  console.log(
    "Wallet Data:",
    walletData,
    "Loading Wallet:",
    isLoadingWallet,
    "Wallet Error:",
    walletError
  );
  console.log(
    "Transactions Data:",
    transactionsData,
    "Loading Transactions:",
    isLoadingTransactions,
    "Transactions Error:",
    transactionsError
  );

  // Get currency symbol
  const currencySymbol = getCurrencySymbol(walletData?.currency);

  // --- Apply Filters ---
  const applyFilters = (
    transactions: WalletTransaction[] | undefined,
    search: string,
    status: string,
    dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (!transactions) {
      setFilteredTransactions([]);
      return;
    }

    let result = [...transactions];

    // Filter by search text (reference)
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((tx) =>
        tx.reference.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by status
    if (status !== "all") {
      const numericStatus = parseInt(status, 10);
      result = result.filter((tx) => tx.status === numericStatus);
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      result = result.filter((tx) => {
        const txDate = dayjs(tx.transactionDate);
        if (!txDate.isValid() || !startDate.isValid() || !endDate.isValid()) {
          return false;
        }
        return (
          txDate.isAfter(startDate.startOf("day")) &&
          txDate.isBefore(endDate.endOf("day"))
        );
      });
    }

    setFilteredTransactions(result);
  };

  React.useEffect(() => {
    applyFilters(transactionsData, searchText, statusFilter, dateRangeFilter);
  }, [transactionsData, searchText, statusFilter, dateRangeFilter]);
  // ---------------------

  // --- Event Handlers ---
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    const range: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null = dates
      ? [dates[0], dates[1]]
      : null;
    setDateRangeFilter(range);
  };
  // ----------------------

  const overviewData = [
    {
      title: "Wallet Balance",
      value: isLoadingWallet
        ? "Loading..."
        : walletError
        ? "Error"
        : formatAmount(walletData?.cashBalance || 0), // Changed to formatAmount
      icon: <MdAccountBalanceWallet size={30} className="text-blue-500" />,
      loading: isLoadingWallet,
      error: !!walletError,
    },
    {
      title: "Points Balance",
      value: isLoadingWallet
        ? "Loading..."
        : walletError
        ? "Error"
        : `${walletData?.pointsBalance || 0} pts`,
      icon: <MdStars size={30} className="text-yellow-500" />,
      loading: isLoadingWallet,
      error: !!walletError,
    },
    {
      title: "Pending Balance",
      value: isLoadingWallet
        ? "Loading..."
        : walletError
        ? "Error"
        : formatAmount(walletData?.pendingBalance || 0), // Changed to formatAmount
      icon: <MdHourglassTop size={30} className="text-green-500" />,
      loading: isLoadingWallet,
      error: !!walletError,
    },
  ];

  const columns: ColumnsType<WalletTransaction> = [
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "date",
      render: (date: string) => formatDate(date), // Use date-fns format again
      sorter: (a, b) =>
        new Date(b.transactionDate).getTime() - // Changed to sort newest to oldest
        new Date(a.transactionDate).getTime(),
      defaultSortOrder: "ascend", // Set default sort order
    },
    {
      title: "Entry",
      dataIndex: "entry",
      key: "entry",
      render: (type: WalletEntryType) => {
        switch (type) {
          case WalletEntryType.Credit:
            return "Credit";
          case WalletEntryType.Debit:
            return "Debit";
          case WalletEntryType.Transfer:
            return "Transfer";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: WalletTransactionType) => {
        switch (type) {
          case WalletTransactionType.Cash:
            return "Cash";
          case WalletTransactionType.Points:
            return "Points";
          case WalletTransactionType.CoPay:
            return "CoPay";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: `Amount (${currencySymbol})`,
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number, record: WalletTransaction) => (
        <span
          style={{
            color:
              record.entry === WalletEntryType.Credit ? "#52c41a" : "#ff4d4f",
          }}
        >
          {record.entry === WalletEntryType.Credit
            ? `+${currencySymbol}${formatAmount(amount)}`
            : `-${currencySymbol}${formatAmount(amount)}`}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        let color = "#faad14"; // Pending (0)
        let text = "Pending";
        if (status === 1) {
          // Completed
          color = "#52c41a";
          text = "Completed";
        } else if (status === 2) {
          // Failed
          color = "#ff4d4f";
          text = "Failed";
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
  ];

  // Updated deposit handler that makes an actual API call
  const handleDeposit = async (
    values: DepositFormValues,
    { setSubmitting, resetForm }: FormikHelpers<DepositFormValues>
  ) => {
    try {
      // Check if we have the required customer ID from the profile
      if (!sessionJson?.profile?.id) {
        message.error("Customer ID is not available. Please try again later.");
        setSubmitting(false);
        return;
      }

      // Make the API call to credit the wallet
      const response = await creditWallet({
        customerId: sessionJson.profile.pimId ?? "",
        amount: Number(values.amount),
        type: 0,
      });

      if (response.success) {
        // Check if metadata URL exists and show iframe modal
        if (response.data?.metadata) {
          setCheckoutUrl(response.data.metadata);
          setIsDepositModalVisible(false);
          setIsCheckoutModalVisible(true);
        } else {
          message.success(
            response.message || "Deposit request submitted successfully!"
          );
          setIsDepositModalVisible(false);
        }

        // Refresh wallet data and transactions to show the new balance
        refetchWallet();
        refetchTransactions();
        resetForm();
      } else {
        message.error(response.message || "Failed to process deposit");
      }
    } catch (error) {
      console.error("Error processing deposit:", error);
      message.error(
        "An unexpected error occurred while processing your deposit"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDepositClick = () => {
    // if (sessionJson?.profile.status !== "active") {
    //   message.error("User must be activated to be able to deposit funds");
    //   return;
    // }
    setIsDepositModalVisible(true);
  };

  const handleCheckoutModalClose = () => {
    setIsCheckoutModalVisible(false);
    setCheckoutUrl(null);
    refetchTransactions(); // Refresh transactions after closing the modal
    refetchWallet(); // Refresh wallet data to reflect any changes
  };

  return (
    <div className="space-y-8">
      <Stack direction="row" classnames="justify-between items-center">
        <h2 className="text-2xl font-semibold">My Wallet</h2>
        <Button
          type="primary"
          icon={<BiPlus size={20} />}
          onClick={handleDepositClick}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Deposit Funds
        </Button>
      </Stack>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewData.map((data, index) => (
          <OverviewCard
            key={index}
            title={data.title}
            value={data.value}
            icon={data.icon}
          />
        ))}
      </div>

      <CardWrapper title="Transaction History" className="static">
        {/* Filters Section */}
        <div className="table-filters mb-6">
          <Stack direction="row" gap={15} classnames="align-center nowrap">
            <Search
              placeholder="Search by reference"
              allowClear
              enterButton={<BiSearch size={20} />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              style={{ flexGrow: 1, minWidth: "250px", width: "100%" }}
            />

            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              style={{ width: "180px" }}
              size="large"
            >
              <Option value="all">All Statuses</Option>
              <Option value={WalletTransactionStatus.Pending.toString()}>
                Pending
              </Option>
              <Option value={WalletTransactionStatus.Successful.toString()}>
                Successful
              </Option>
              <Option value={WalletTransactionStatus.Failed.toString()}>
                Failed
              </Option>
            </Select>

            <Select
              value={typeFilter}
              onChange={handleTypeFilterChange}
              style={{ width: "180px" }}
              size="large"
            >
              <Option value="all">All Types</Option>
              <Option value={WalletTransactionType.Cash.toString()}>
                Cash
              </Option>
              <Option value={WalletTransactionType.Points.toString()}>
                Points
              </Option>
              <Option value={WalletTransactionType.CoPay.toString()}>
                CoPay
              </Option>
            </Select>

            <RangePicker
              size="large"
              onChange={handleDateRangeChange}
              style={{ minWidth: "280px" }}
            />
          </Stack>
        </div>
        {/* End Filters Section */}

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          loading={isLoadingTransactions}
          rowKey="id" // Assuming 'id' is a unique key in WalletTransaction
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          className="w-full"
        />
      </CardWrapper>

      <Modal
        title="Deposit Funds"
        open={isDepositModalVisible} // Static visibility, or manage with a simple local boolean if absolutely needed for UI check
        onCancel={() => setIsDepositModalVisible(false)} // Static close action
        footer={null}
        width={400}
      >
        <Formik
          initialValues={{ amount: "" }}
          validationSchema={DepositSchema}
          onSubmit={handleDeposit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="standard-form">
              <div>
                <TInputLabel>{`Amount $`}</TInputLabel>
                <Field
                  as={TInput}
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                />
                <ErrorMessage
                  name="amount"
                  component="p"
                  className="input-error"
                />
              </div>

              <div className="modal-button-group" style={{ marginTop: "20px" }}>
                <TButton
                  tvariant="secondary"
                  onClick={() => setIsDepositModalVisible(false)}
                  className="modal-button"
                  disabled={isSubmitting}
                >
                  Cancel
                </TButton>
                <TButton
                  htmlType="submit"
                  tvariant="primary"
                  className="modal-button"
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  Submit Deposit
                </TButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        title="Complete Payment"
        open={isCheckoutModalVisible} // Static visibility
        // onCancel removed
        footer={[
          <TButton
            key="close"
            tvariant="secondary"
            onClick={handleCheckoutModalClose}
          >
            Close
          </TButton>,
        ]}
        width={800}
        bodyStyle={{ height: "600px", padding: 0 }}
      >
        {checkoutUrl ? (
          <iframe
            src={checkoutUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="Payment Checkout"
            allow="payment"
            sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation allow-popups"
          />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
            <p style={{ marginTop: "20px" }}>Loading payment gateway...</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WalletPage;
