// Create a new file for cookie management
import Cookies from 'js-cookie';

// Default cookie options to use across the application
const DEFAULT_OPTIONS: Cookies.CookieAttributes = {
  sameSite: 'strict',
  path: '/',
  expires: 7, // Default 7 days for remember me
  secure: window.location.protocol === 'https:' // Use secure cookies in production
};

// Single source of truth for cookie names
export const COOKIE_NAMES = {
  SESSION: 'session',
};

/**
 * Sets a session cookie with consistent options
 * @param value - Value to store in the cookie
 * @param rememberMe - Whether to set a long-term cookie (30 days) or use default expiry
 */
export const setSessionCookie = (value: string, rememberMe: boolean = false) => {
  const options = {
    ...DEFAULT_OPTIONS,
    expires: rememberMe ? 30 : 7, // 30 days for remember me, otherwise 7
  };
  
  // console.log(`Setting session cookie with options:`, options);
  Cookies.set(COOKIE_NAMES.SESSION, value, options);
};

/**
 * Gets the session cookie value
 * @returns The cookie value or null if not found
 */
export const getSessionCookie = (): string | null => {
  return Cookies.get(COOKIE_NAMES.SESSION) || null;
};

/**
 * Removes the session cookie
 */
export const removeSessionCookie = () => {
  Cookies.remove(COOKIE_NAMES.SESSION, { path: '/' });
};

/**
 * Renews the session cookie with the same value and options
 * Prevents the cookie from disappearing during idle periods
 */
export const renewSessionCookie = () => {
  const currentValue = getSessionCookie();
  if (currentValue) {
    // console.log('Renewing session cookie at:', new Date().toLocaleString());
    setSessionCookie(currentValue);
  }
};