import axios from "axios";
import { API_VERSION } from "../version";
import { getNodeApiUrl } from "../../utils/env";
import { DefaultUserProfileData, SignupPayload } from "../../types/auth";

const AUTH_URL = `${getNodeApiUrl()}${API_VERSION}/auth`;

export interface SignupUserResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: DefaultUserProfileData;
}

export async function signUpUser(
  payload: SignupPayload
): Promise<SignupUserResponse> {
  try {
    const response = await axios.post(`${AUTH_URL}/register-user`, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message,
      }
    }
    throw new Error('An unexpected error occurred');
  }
}
