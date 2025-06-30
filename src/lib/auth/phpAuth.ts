import axios from "axios";
import { getPHPApiUrl } from "../../utils/env";
// import { PHP_API_VERSION } from "../version";
import {
  PHPRegisterPayload,
  PHPLoginPayload,
  PHPRegisterResponse,
  PHPLoginResponse,
  PHPAuthResponse,
} from "../../types/phpAuth";

const PHP_AUTH_BASE_URL = `${getPHPApiUrl()}auth/customer`;

/**
 * Register a new user with the PHP API
 */
export async function registerUserPHP(
  payload: PHPRegisterPayload
): Promise<PHPAuthResponse> {
  try {
    const response = await axios.post<PHPRegisterResponse>(
      `${PHP_AUTH_BASE_URL}/register`,
      payload
    );

    return {
      success: true,
      message: response.data.message,
      data: {
        user: response.data.user,
        token: response.data.token,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred during registration",
    };
  }
}

/**
 * Login user with the PHP API
 */
export async function loginUserPHP(
  payload: PHPLoginPayload
): Promise<PHPAuthResponse> {
  try {
    const response = await axios.post<PHPLoginResponse>(
      `${PHP_AUTH_BASE_URL}/login`,
      payload
    );

    return {
      success: true,
      message: response.data.message,
      data: {
        user: response.data.user,
        token: response.data.token,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Login failed",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred during login",
    };
  }
}
