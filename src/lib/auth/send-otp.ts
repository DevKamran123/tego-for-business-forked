import axios from "axios";
import { API_VERSION } from "../version";
import { getNodeApiUrl } from "../../utils/env";
import { SendOTPPayload } from "../../types/auth";

const AUTH_URL = `${getNodeApiUrl()}${API_VERSION}/auth`;

export interface UIResponse {
  success: boolean;
  message: string;
  code?: number;
  data: null;
}

export async function sendOTP(payload: SendOTPPayload): Promise<UIResponse> {
  try {
    const response = await axios.post(`${AUTH_URL}/send-otp`, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message,
        code: error.response.data.code,
        data: null,
      }
    }
    throw new Error('An unexpected error occurred');
  }
}