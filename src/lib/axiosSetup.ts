import axios from "axios";
// import { COOKIE_NAMES } from "../utils/cookieUtils";

interface ErrorType {
  responseCode: string;
  responseMessage: string;
  success: boolean;
}

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(
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

export function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const { response } = error;
    if (response) {
      const { data } = response;
      // Cast the response data to API response ErrorType
      const errorData: ErrorType = data;

      // Return the specific message from the API or fallback to generic message
      return errorData.responseMessage || "An unexpected error occurred.";
    } else {
      return "Network error. Please check your connection.";
    }
  } else {
    // handle unexpected error
    return "An unknown error occurred.";
  }
}
