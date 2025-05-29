import axios from "axios";
import { API_VERSION } from "../version";
import { getNodeApiUrl } from "../../utils/env";
import { OnboardingPayload, OnboardingResponse, ImageUploadResponse } from "../../types/onboarding";

const AUTH_URL = `${getNodeApiUrl()}${API_VERSION}/auth`;
const IMAGE_URL = `${getNodeApiUrl()}${API_VERSION}/image`;

export async function submitOnboardingData(
  payload: OnboardingPayload
): Promise<OnboardingResponse> {
  try {
    const response = await axios.patch(`${AUTH_URL}/user/onboarding`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
    throw new Error("An unexpected error occurred during onboarding submission.");
  }
}

export async function uploadProfileImage(
  formData: FormData
): Promise<ImageUploadResponse> {
  try {
    const response = await axios.post(`${IMAGE_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
    throw new Error("An unexpected error occurred during image upload.");
  }
}
