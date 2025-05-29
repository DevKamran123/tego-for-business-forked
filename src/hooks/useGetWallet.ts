// Placeholder for wallet React Query hooks
// Content will be adapted from tego-admin

import { useQuery } from "@tanstack/react-query"; // Assuming @tanstack/react-query is used
import { 
  getCustomerWalletByPimId, 
  GetWalletResponse, 
  getCustomerWalletTransactions,
  GetWalletTransactionsResponse
} from "../lib/wallet/manageWallet";
import { WalletData, WalletTransaction } from "../types";

/**
 * Hook for fetching customer wallet data by PIM ID.
 * @param pimId The PIM ID of the customer whose wallet to fetch.
 * @param enabled Whether the query should automatically run (defaults to true).
 * @returns React Query result with wallet data, loading and error states.
 */
export const useGetCustomerWalletByPimId = (pimId: string | null | undefined, enabled = true) => {
  return useQuery<WalletData | undefined, Error>({
    queryKey: ["wallet", pimId],
    queryFn: async () => {
      if (!pimId) {
        // Or handle as per project's error handling for missing ID
        return undefined; 
      }
      
      const response: GetWalletResponse = await getCustomerWalletByPimId(pimId);

      if (!response.success) {
        // Consider throwing an error or returning a specific error object
        throw new Error(response.message || "Failed to fetch wallet data");
      }
      return response.data;
    },
    enabled: !!pimId && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Type for the return value of useGetCustomerWalletByPimId.
 */
export type UseGetCustomerWalletResult = ReturnType<typeof useGetCustomerWalletByPimId>;

/**
 * Hook for fetching customer wallet transactions by PIM ID.
 * @param pimId The PIM ID of the customer whose transactions to fetch.
 * @param enabled Whether the query should automatically run (defaults to true).
 * @returns React Query result with wallet transactions, loading and error states.
 */
export const useGetWalletTransactions = (pimId: string | null | undefined, enabled = true) => {
  return useQuery<WalletTransaction[] | undefined, Error>({
    queryKey: ["walletTransactions", pimId],
    queryFn: async () => {
      if (!pimId) {
        return undefined;
      }
      
      const response: GetWalletTransactionsResponse = await getCustomerWalletTransactions(pimId);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch wallet transactions");
      }
      return response.data;
    },
    enabled: !!pimId && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Type for the return value of useGetWalletTransactions.
 */
export type UseGetWalletTransactionsResult = ReturnType<typeof useGetWalletTransactions>;
