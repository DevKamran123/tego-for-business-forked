import { useState, useEffect } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  userType: string;
  accountType: string;
  countryCode: string;
  mobileNo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  companyDetails?: {
    companyId: string;
    isEmployed: boolean;
  };
}

interface UseUserDataReturn {
  userData: UserData | null;
  fullName: string;
  email: string;
  isLoading: boolean;
  error: string | null;
  refreshUserData: () => void;
}

/**
 * Custom hook to manage user data from localStorage
 * Provides easy access to user information from PHP user data
 */
export const useUserData = (): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const phpUserData = localStorage.getItem('php_user_data');
      if (phpUserData) {
        const parsedData = JSON.parse(phpUserData);
        setUserData({
          firstName: parsedData.firstName || '',
          lastName: parsedData.lastName || '',
          email: parsedData.email || '',
          id: parsedData.id || '',
          userType: parsedData.userType || '',
          accountType: parsedData.accountType || '',
          countryCode: parsedData.countryCode || '',
          mobileNo: parsedData.mobileNo || '',
          status: parsedData.status || '',
          createdAt: parsedData.createdAt || '',
          updatedAt: parsedData.updatedAt || '',
          companyDetails: parsedData.companyDetails || {
            companyId: parsedData.companyId || '0',
            isEmployed: parsedData.isEmployed || false
          }
        });
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error parsing PHP user data:', error);
      setError('Failed to load user data');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = () => {
    loadUserData();
  };

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Listen for storage changes (useful for multiple tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'php_user_data') {
        loadUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Construct full name
  const fullName = userData ? `${userData.firstName} ${userData.lastName}`.trim() : '';
  const email = userData?.email || '';

  return {
    userData,
    fullName,
    email,
    isLoading,
    error,
    refreshUserData,
  };
}; 