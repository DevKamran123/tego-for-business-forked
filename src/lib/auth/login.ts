import axios from "axios";
import { API_VERSION } from "../version";
import { LoginUserData } from "../../types/auth";
import { getNodeApiUrl } from "../../utils/env";
import { BackendLoginResponse, LoginResponse } from "../../types/auth";
import { axiosInstance } from "../axiosSetup";

// const AUTH_URL = `${getNodeApiUrl()}${API_VERSION}/auth`;

export interface LoginUserResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: LoginUserData;
}

/**
 * Transform backend response to frontend format
 */
const transformLoginResponse = (
  backendResponse: BackendLoginResponse,
  accountType: "personal" | "business"
): LoginResponse["data"] => {
  const { user, token } = backendResponse;

  // Determine which profile to use based on account type
  const profileData =
    accountType === "business" ? user.business : user.customer;

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken || undefined, // Use actual refreshToken or fallback to undefined
    profile: {
      id: user.id.toString(),
      email: user.email,
      accountType: accountType === "business" ? "enterprise" : "personal",
      firstName: user.first_name,
      lastName: user.last_name,
      profileImage:
        accountType === "personal" &&
        profileData &&
        "profile_image" in profileData
          ? profileData.profile_image || undefined
          : undefined,
      status:
        accountType === "personal" && profileData && "status" in profileData
          ? profileData.status || "active"
          : "active",
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      userType:
        accountType === "personal" && profileData && "user_type" in profileData
          ? profileData.user_type
          : undefined,
      countryCode: user.country_code,
      mobileNo: user.mobile_no,
      ...(accountType === "business" &&
        user.business && {
          companyDetails: {
            companyId: user.business.id.toString(),
            isEmployed: true,
            companyName: user.business.company_name,
          },
        }),
    },
  };
};

export async function loginUser(
  email: string,
  password: string,
  accountType: "personal" | "business" = "personal"
): Promise<LoginUserResponse> {
  try {
    const baseUrl = getNodeApiUrl();

    // Map frontend account types to backend user types
    const userType = accountType === "business" ? "business" : "customer";

    // Construct the correct endpoint URL
    const endpoint = `${baseUrl}${API_VERSION}/auth/${userType}/login`;

    const payload = {
      email,
      password,
    };

    console.log(`Attempting login to: ${endpoint}`);

    const response = await axiosInstance.post<BackendLoginResponse>(
      endpoint,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data && response.data.token) {
      const transformedData = transformLoginResponse(
        response.data,
        accountType
      );

   
      return {
        success: true,
        message: response.data.message || "Login successful",
        data: transformedData,
      };
    } else {
      return {
        success: false,
        message: "Invalid response format from server",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // throw new Error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
      };
    }
    throw new Error("An unexpected error occurred");
  }
}
