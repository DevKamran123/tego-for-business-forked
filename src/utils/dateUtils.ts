import dayjs from 'dayjs';
/**
 * Date formatting utilities for consistent date/time display across the application
 */

/**
 * Format a date string to display as "DD, Month YYYY" (e.g., "14, March 2025")
 * @param dateString ISO date string (e.g., "2025-03-14T13:32:57.547Z")
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    return `${day}, ${month} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a date string to display as "hh:mmam/pm" (e.g., "01:32pm")
 * @param dateString ISO date string (e.g., "2025-03-14T13:32:57.547Z")
 * @returns Formatted time string
 */
export const formatTime = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours || 12; // Convert 0 to 12 for 12 AM
    
    return `${hours.toString().padStart(2, '0')}:${minutes}${period}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

/**
 * Formats a date string using dayjs with a specified format.
 * Returns 'N/A' if the dateString is null or undefined.
 * @param dateString Optional ISO date string (e.g., "2025-03-14T13:32:57.547Z") or null/undefined.
 * @param format Optional dayjs format string. Defaults to 'YYYY-MM-DD HH:mm'.
 * @returns Formatted date-time string or 'N/A'.
 */
export const formatDateTime = (dateString?: string | null, format = 'YYYY-MM-DD HH:mm') => {
  if (!dateString) return 'N/A';
  return dayjs(dateString).format(format);
};
