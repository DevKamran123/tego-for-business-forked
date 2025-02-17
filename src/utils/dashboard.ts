export const generateReferralLink = (refCode: string) => {
    const baseUrl = window.location.origin; // Gets your website's base URL
    return `${baseUrl}/signup?ref=${encodeURIComponent(refCode)}`;
  };