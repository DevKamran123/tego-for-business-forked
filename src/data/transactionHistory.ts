export interface TransactionHistoryTypes {
  title: string;
  type: "incoming" | "outgoing";
  date: string;
  token: number;
}

export const transactionHistoryData: TransactionHistoryTypes[] = [
  { title: "Ride payment", type: "outgoing", date: "30/04/2025", token: 85 },
  {
    title: "Refer and Earn bonus",
    type: "incoming",
    date: "26/04/2025",
    token: 120,
  },
  { title: "Card purchase", type: "incoming", date: "25/04/2025", token: 650 },
  { title: "Ride payment", type: "outgoing", date: "23/04/2025", token: 60 },
  {
    title: "RideTEGO sign up bonus",
    type: "incoming",
    date: "23/04/2025",
    token: 100,
  },
];
