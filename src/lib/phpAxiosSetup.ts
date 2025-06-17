import axios from "axios";

// Create a separate axios instance for PHP API calls
export const phpAxiosInstance = axios.create();

// PHP API request interceptor
phpAxiosInstance.interceptors.request.use(
  (config) => {
    // Get PHP token from localStorage
    const phpToken = localStorage.getItem("php_access_token");
    if (phpToken) {
      config.headers.Authorization = `Bearer ${phpToken.replace(
        /^"(.*)"$/,
        "$1"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// PHP API response interceptor for error handling
phpAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle PHP API unauthorized access
      console.warn("PHP API unauthorized - clearing PHP token");
      localStorage.removeItem("php_access_token");
      localStorage.removeItem("php_user_data");
      
      // Optionally redirect to dual login or show warning
      // window.location.href = "/dual-login";
    }
    return Promise.reject(error);
  }
);

// PHP-specific error handler
export function handlePHPAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const { response } = error;
    if (response) {
      const { data } = response;
      
      // PHP API typically returns errors in different formats
      if (data.message) {
        return data.message;
      } else if (data.error) {
        return data.error;
      } else if (data.errors) {
        // Handle validation errors
        const errorMessages = Object.values(data.errors).flat();
        return errorMessages.join(", ");
      }
      
      return "PHP API error occurred.";
    } else {
      return "Network error connecting to PHP API.";
    }
  } else {
    return "An unknown PHP API error occurred.";
  }
}

// Utility function to check if PHP token is available
export function hasPHPToken(): boolean {
  return !!localStorage.getItem("php_access_token");
}

// Utility function to get PHP user data
export function getPHPUserData() {
  const userData = localStorage.getItem("php_user_data");
  return userData ? JSON.parse(userData) : null;
}
