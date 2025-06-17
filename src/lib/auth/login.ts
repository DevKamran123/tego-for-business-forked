import axios from "axios";
import { API_VERSION } from "../version";
import { LoginUserData } from "../../types/auth";
import { getNodeApiUrl } from "../../utils/env";

const AUTH_URL = `${getNodeApiUrl()}${API_VERSION}/auth`;

export interface LoginUserResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: LoginUserData;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginUserResponse> {
  try {
    const response = await axios.post(`${AUTH_URL}/login-user`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // throw new Error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
      }
    }
    throw new Error('An unexpected error occurred');
  }
}
