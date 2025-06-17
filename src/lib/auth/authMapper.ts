import { LoginUserData, DefaultUserProfileData } from "../../types/auth";
import { PHPUser, PHPAuthResponse } from "../../types/phpAuth";

/**
 * Maps PHP API user response to our standard auth format
 */
export function mapPHPUserToProfile(phpUser: PHPUser): DefaultUserProfileData {
  return {
    id: phpUser.id.toString(),
    email: phpUser.email,
    accountType: phpUser.customer?.user_type || "individual", 
    firstName: phpUser.first_name,
    lastName: phpUser.last_name,
    profileImage: phpUser.customer?.profile_image || undefined,
    status: phpUser.customer?.status || "active",
    createdAt: phpUser.created_at,
    updatedAt: phpUser.updated_at,
    // Additional fields from PHP customer data
    companyDetails: phpUser.customer ? {
      companyId: phpUser.customer.company_id.toString(),
      companyName: phpUser.customer.company_name || undefined,
      isEmployed: phpUser.customer.company_id > 0,
    } : undefined,
    residentialAddress: phpUser.customer?.address || undefined,
    // Map additional PHP-specific fields
    userType: phpUser.customer?.user_type,
    countryCode: phpUser.country_code,
    mobileNo: phpUser.mobile_no,
  };
}

/**
 * Maps PHP auth response to our standard login response format
 */
export function mapPHPAuthToLoginData(phpResponse: PHPAuthResponse): LoginUserData | null {
  if (!phpResponse.success || !phpResponse.data) {
    return null;
  }

  return {
    accessToken: phpResponse.data.token.accessToken,
    refreshToken: undefined, // PHP API doesn't provide refresh token
    profile: mapPHPUserToProfile(phpResponse.data.user),
  };
}

/**
 * Creates a combined profile from both Node and PHP user data
 * Prioritizes Node API data but enriches with PHP-specific fields
 */
export function combineUserProfiles(
  nodeProfile: DefaultUserProfileData,
  phpUser?: PHPUser
): DefaultUserProfileData {
  if (!phpUser) {
    return nodeProfile;
  }

  return {
    ...nodeProfile,
    // Enrich with PHP-specific data
    userType: phpUser.customer?.user_type,
    countryCode: phpUser.country_code,
    mobileNo: phpUser.mobile_no,
    // Override with PHP customer details if available
    companyDetails: phpUser.customer ? {
      companyId: phpUser.customer.company_id.toString(),
      companyName: phpUser.customer.company_name || nodeProfile.companyDetails?.companyName,
      isEmployed: phpUser.customer.company_id > 0,
    } : nodeProfile.companyDetails,
    residentialAddress: phpUser.customer?.address || nodeProfile.residentialAddress,
  };
}
