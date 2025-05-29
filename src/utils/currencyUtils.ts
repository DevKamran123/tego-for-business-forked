/**
 * Returns the currency symbol for a given currency code.
 * @param currencyCode The ISO 4217 currency code (e.g., "NGN", "USD").
 * @returns The currency symbol (e.g., "₦", "$") or the code itself if no symbol is found.
 */
export const getCurrencySymbol = (currencyCode: string | undefined): string => {
  if (!currencyCode) {
    return "$"; // Default to dollar if no code provided
  }

  const upperCaseCode = currencyCode.toUpperCase();

  switch (upperCaseCode) {
    case "NGN":
      return "₦";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    // Add more currency codes and symbols as needed
    default:
      return upperCaseCode; // Return the code itself if symbol is unknown
  }
};

/**
 * Formats a number or string into a currency string with commas and 2 decimal places.
 * @param amount The number or string to format.
 * @returns The formatted currency string (e.g., "1,234.56").
 */
export const formatAmount = (amount: number | string): string => {
  const num = parseFloat(String(amount));
  if (isNaN(num)) {
    return "0.00"; // Or throw an error, or return as is, depending on desired behavior
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
