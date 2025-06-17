import { useState, useEffect } from 'react';

interface PHPUserData {
  id: string;
  email: string;
  accountType: string;
  firstName: string;
  lastName: string;
  userType?: string;
  countryCode?: string;
  mobileNo?: string;
  profileImage?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  companyDetails?: {
    companyId: string;
    companyName?: string;
    isEmployed?: boolean;
  };
  residentialAddress?: string;
}

interface UsePHPUserReturn {
  phpUser: PHPUserData | null;
  phpUserId: number | null;
  hasPHPAuth: boolean;
  refreshPHPUser: () => void;
  clearPHPUser: () => void;
}

/**
 * Custom hook to manage PHP user data from localStorage
 * Provides easy access to PHP user information and utilities
 */
export const usePHPUser = (): UsePHPUserReturn => {
  const [phpUser, setPHPUser] = useState<PHPUserData | null>(null);

  const loadPHPUser = () => {
    try {
      const phpUserData = localStorage.getItem('php_user_data');
      if (phpUserData) {
        const userData = JSON.parse(phpUserData) as PHPUserData;
        setPHPUser(userData);
      } else {
        setPHPUser(null);
      }
    } catch (error) {
      console.error('Error parsing PHP user data from localStorage:', error);
      setPHPUser(null);
    }
  };

  const refreshPHPUser = () => {
    loadPHPUser();
  };

  const clearPHPUser = () => {
    localStorage.removeItem('php_user_data');
    localStorage.removeItem('php_access_token');
    setPHPUser(null);
  };

  // Load user data on mount
  useEffect(() => {
    loadPHPUser();
  }, []);

  // Listen for storage changes (useful for multiple tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'php_user_data') {
        loadPHPUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Convert string ID to number for API calls
  const phpUserId = phpUser ? parseInt(phpUser.id, 10) : null;
  
  // Check if PHP authentication is available
  const hasPHPAuth = !!phpUser && !!localStorage.getItem('php_access_token');

  return {
    phpUser,
    phpUserId,
    hasPHPAuth,
    refreshPHPUser,
    clearPHPUser,
  };
};

/**
 * Utility function to get PHP user ID directly (non-reactive)
 * Useful for one-off checks without subscribing to changes
 */
export const getPHPUserId = (): number | null => {
  try {
    const phpUserData = localStorage.getItem('php_user_data');
    if (phpUserData) {
      const userData = JSON.parse(phpUserData) as PHPUserData;
      return parseInt(userData.id, 10);
    }
  } catch (error) {
    console.error('Error getting PHP user ID:', error);
  }
  return null;
};

/**
 * Utility function to check if PHP authentication is available
 */
export const hasPHPAuthentication = (): boolean => {
  const phpUserData = localStorage.getItem('php_user_data');
  const phpToken = localStorage.getItem('php_access_token');
  return !!(phpUserData && phpToken);
};
