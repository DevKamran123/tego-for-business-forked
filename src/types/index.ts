// filepath: c:\Users\newsy\ceed\tego-for-business\src\types\index.ts
// Wallet Transaction Enums
export enum WalletEntryType {
  Credit = 0,
  Debit = 1,
  Transfer = 2
}

export enum WalletTransactionType {
  Cash = 0,
  Points = 1,
  CoPay = 2
}

export enum WalletTransactionStatus {
  Pending = 0,
  Successful = 1,
  Failed = 2
}

export interface WalletData {
  id: string;
  customerId: string;
  currency: string;
  cashBalance: number;
  pointsBalance: number;
  escrowBalance: number;
  pendingBalance: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  entry: WalletEntryType; // 0 - Credit, 1 - Debit, 2 - Transfer
  amount: number;
  currency: string;
  transactionDate: string;
  status: WalletTransactionStatus; // 0 - Pending, 1 - Successful, 2 - Failed
  type: WalletTransactionType; // 0 - Cash, 1 - Points, 2 - CoPay
  sourceAccount: string;
  destinationAccount: string;
  reference: string;
  metadata?: string;
  createdAt: string;
  updatedAt: string;
}

// Add other existing types from tego-for-business if any below this line


// Define UserData type
export type UserData = {
  accessToken: string;
  refreshToken: string;
  email: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
    pimId: string | null;
    companyDetails?: {
      companyId: string;
      isEmployed: boolean;
    };
    residentialAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    socialSecurityNumber?: string;
    profileImage?: string;
    status: string;
    isPersonalMode?: boolean;
    referralLink?: string | null;
    companyName?: string;
    companyDomain?: string;
    companyPhone?: string;
    companyAddress?: string;
    principalFirstName?: string;
    principalLastName?: string;
    principalEmail?: string;
    taxIdentityNumber?: string;
    domain?: string;
    createdAt: string;
    updatedAt: string;
  };
};