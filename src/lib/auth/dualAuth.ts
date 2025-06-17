import { signUpUser } from "./signup";
import { loginUser } from "./login";
import { registerUserPHP, loginUserPHP } from "./phpAuth";
import { mapPHPAuthToLoginData, combineUserProfiles } from "./authMapper";
import { 
  DualAuthPayload, 
  DualAuthResponse, 
  DualLoginPayload,
  SignupPayload 
} from "../../types/auth";
import { PHPRegisterPayload, PHPLoginPayload } from "../../types/phpAuth";

/**
 * Default values for PHP API registration
 */
const DEFAULT_COUNTRY_CODE = "+234";
const DEFAULT_MOBILE_NO = "0000000000"; // Placeholder mobile number

/**
 * Register user with both Node API and PHP API
 */
export async function dualAuthRegister(
  payload: DualAuthPayload
): Promise<DualAuthResponse> {
  let nodeApiSuccess = false;
  let phpApiSuccess = false;
  let nodeAuth;
  let phpAuth;
  let nodeError: string | undefined;
  let phpError: string | undefined;

  // Prepare Node API payload
  const nodePayload: SignupPayload = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
    accountType: payload.accountType,
  };

  // Prepare PHP API payload
  const phpPayload: PHPRegisterPayload = {
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    password: payload.password,
    password_confirmation: payload.password,
    country_code: payload.countryCode || DEFAULT_COUNTRY_CODE,
    mobile_no: payload.mobileNo || DEFAULT_MOBILE_NO,
  };

  // Try Node API registration first
  try {
    const nodeResponse = await signUpUser(nodePayload);
    if (nodeResponse.success && nodeResponse.data) {
      nodeApiSuccess = true;
      nodeAuth = {
        accessToken: "node_token_placeholder", // Node API doesn't return token in signup
        profile: nodeResponse.data,
      };
    } else {
      nodeError = nodeResponse.message;
    }
  } catch (error) {
    nodeError = error instanceof Error ? error.message : "Node API registration failed";
  }

  // Try PHP API registration
  try {
    const phpResponse = await registerUserPHP(phpPayload);
    if (phpResponse.success && phpResponse.data) {
      phpApiSuccess = true;
      const phpLoginData = mapPHPAuthToLoginData(phpResponse);
      if (phpLoginData) {
        phpAuth = {
          accessToken: phpLoginData.accessToken,
          profile: phpLoginData.profile,
        };
      }
    } else {
      phpError = phpResponse.message;
    }
  } catch (error) {
    phpError = error instanceof Error ? error.message : "PHP API registration failed";
  }

  // Determine overall success
  const overallSuccess = nodeApiSuccess && phpApiSuccess;

  // Combine profiles if both succeeded
  let combinedProfile;
  if (nodeAuth && phpAuth) {
    combinedProfile = combineUserProfiles(nodeAuth.profile, undefined);
    // We could store PHP user data in localStorage for later use
    localStorage.setItem("php_user_data", JSON.stringify(phpAuth.profile));
  }

  return {
    success: overallSuccess,
    message: overallSuccess 
      ? "Registration successful on both APIs"
      : nodeApiSuccess && !phpApiSuccess
      ? "Registration successful on Node API but failed on PHP API"
      : !nodeApiSuccess && phpApiSuccess
      ? "Registration successful on PHP API but failed on Node API"
      : "Registration failed on both APIs",
    nodeApiSuccess,
    phpApiSuccess,
    data: overallSuccess ? {
      nodeAuth,
      phpAuth,
      combinedProfile,
    } : undefined,
    errors: {
      nodeError,
      phpError,
    },
  };
}

/**
 * Login user with both Node API and PHP API
 */
export async function dualAuthLogin(
  payload: DualLoginPayload
): Promise<DualAuthResponse> {
  let nodeApiSuccess = false;
  let phpApiSuccess = false;
  let nodeAuth;
  let phpAuth;
  let nodeError: string | undefined;
  let phpError: string | undefined;

  // Prepare payloads
  const phpPayload: PHPLoginPayload = {
    email: payload.email,
    password: payload.password,
  };

  // Try Node API login first
  try {
    const nodeResponse = await loginUser(payload.email, payload.password);
    if (nodeResponse.success && nodeResponse.data) {
      nodeApiSuccess = true;
      nodeAuth = nodeResponse.data;
    } else {
      nodeError = nodeResponse.message;
    }
  } catch (error) {
    nodeError = error instanceof Error ? error.message : "Node API login failed";
  }

  // Try PHP API login
  try {
    const phpResponse = await loginUserPHP(phpPayload);
    if (phpResponse.success && phpResponse.data) {
      phpApiSuccess = true;
      const phpLoginData = mapPHPAuthToLoginData(phpResponse);
      if (phpLoginData) {
        phpAuth = {
          accessToken: phpLoginData.accessToken,
          profile: phpLoginData.profile,
        };
        // Store PHP token for ride booking
        localStorage.setItem("php_access_token", phpLoginData.accessToken);
        localStorage.setItem("php_user_data", JSON.stringify(phpLoginData.profile));
      }
    } else {
      phpError = phpResponse.message;
    }
  } catch (error) {
    phpError = error instanceof Error ? error.message : "PHP API login failed";
  }

  // Determine overall success - at minimum Node API must succeed
  const overallSuccess = nodeApiSuccess;

  // Combine profiles if available
  let combinedProfile;
  if (nodeAuth && phpAuth) {
    combinedProfile = combineUserProfiles(nodeAuth.profile, undefined);
  } else if (nodeAuth) {
    combinedProfile = nodeAuth.profile;
  }

  return {
    success: overallSuccess,
    message: overallSuccess && phpApiSuccess
      ? "Login successful on both APIs"
      : overallSuccess && !phpApiSuccess
      ? "Login successful on Node API but failed on PHP API (ride booking may not work)"
      : "Login failed",
    nodeApiSuccess,
    phpApiSuccess,
    data: overallSuccess ? {
      nodeAuth,
      phpAuth,
      combinedProfile,
    } : undefined,
    errors: {
      nodeError,
      phpError,
    },
  };
}
