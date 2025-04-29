import axios from "axios";
import { API_VERSION } from "../version";
import { getNodeApiUrl } from "../../utils/env";
import { AcceptInvitePayload, ResetPasswordPayload, VerifyInvitePayload } from "../../types/auth";

const AUTH_URL = `${getNodeApiUrl()}${API_VERSION}/auth`;

export interface UIResponse {
  success: boolean;
  message: string;
  code?: number;
  data: null;
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<UIResponse> {
  try {
    const response = await axios.patch(`${AUTH_URL}/reset-password`, (payload));
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


export async function verifyInvite(payload: VerifyInvitePayload): Promise<UIResponse> {
  try {
    const response = await axios.post(`${AUTH_URL}/verifyOtp`, (payload));
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


export async function acceptInvite(payload: AcceptInvitePayload): Promise<UIResponse> {
  try {
    const response = await axios.post(`${AUTH_URL}/accept-invitation`, (payload));
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