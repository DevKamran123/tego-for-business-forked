// Placeholder for wallet API functions
// Content will be adapted from tego-admin

// filepath: c:\Users\newsy\ceed\tego-for-business\src\lib\wallet\manageWallet.ts
import { getNodeApiUrl } from "../../utils/env"; // Assuming utils/env exists in tego-for-business
import { WalletData, WalletTransaction } from "../../types";
import { axiosInstance } from "../axiosSetup"; // Assuming axiosSetup exists
import { isAxiosError } from "axios";
import { API_VERSION } from "../version"; // Assuming version exists

// Define the base URL for wallet endpoints
const WALLET_URL = `${getNodeApiUrl()}${API_VERSION}/wallet`;

// Define the response interface for getting wallet data
export interface GetWalletResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: WalletData;
}

// Define the response interface for getting wallet transactions
export interface GetWalletTransactionsResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: WalletTransaction[];
}

// Define the request payload for crediting a wallet
export interface CreditWalletRequest {
  customerId: string;
  amount: number;
  type: number; // Assuming type is still relevant for business customer deposits
}

// Define the response interface for credit wallet operation
export interface CreditWalletResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: WalletTransaction; // Assuming the response includes the transaction
}

/**
 * Fetches customer wallet data by their PIM ID.
 * @param pimId The customer's PIM ID.
 * @returns A promise resolving to the GetWalletResponse structure.
 */
export const getCustomerWalletByPimId = async (pimId: string): Promise<GetWalletResponse> => {
  try {
    const response = await axiosInstance.get<GetWalletResponse>(
      `${WALLET_URL}/${pimId}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Failed to fetch wallet data.",
        code: error.response.status,
        data: undefined,
      };
    }
    console.error("Unexpected error fetching wallet:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching wallet data.",
      data: undefined,
    };
  }
};

/**
 * Fetches customer wallet transactions by their PIM ID.
 * @param pimId The customer's PIM ID.
 * @returns A promise resolving to the GetWalletTransactionsResponse structure.
 */
export const getCustomerWalletTransactions = async (pimId: string): Promise<GetWalletTransactionsResponse> => {
  try {
    const response = await axiosInstance.get<GetWalletTransactionsResponse>(
      `${WALLET_URL}/transactions/${pimId}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Failed to fetch wallet transactions.",
        code: error.response.status,
        data: undefined,
      };
    }
    console.error("Unexpected error fetching wallet transactions:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching wallet transactions.",
      data: undefined,
    };
  }
};

/**
 * Credits a customer's wallet with the specified amount.
 * This function might be used for customer top-ups in tego-for-business.
 * @param payload The credit wallet request payload containing customerId and amount.
 * @returns A promise resolving to the CreditWalletResponse structure.
 */
export const creditWallet = async (payload: CreditWalletRequest): Promise<CreditWalletResponse> => {
  try {
    const response = await axiosInstance.post<CreditWalletResponse>(
      `${WALLET_URL}/credit`, // Ensure this endpoint is appropriate for customer deposits
      payload
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Failed to credit wallet.",
        code: error.response.status,
        data: undefined,
      };
    }
    console.error("Unexpected error crediting wallet:", error);
    return {
      success: false,
      message: "An unexpected error occurred while crediting the wallet.",
      data: undefined,
    };
  }
};
