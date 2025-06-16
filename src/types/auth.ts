export type DefaultUserProfileData = {
  id: string;
  email: string;
  accountType: string;
  pimId?: null | string;
  firstName: string;
  lastName: string;
  companyDetails?: {
    companyId: string;
    isEmployed?: boolean;
    companyName?: string;
  };
  residentialAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  socialSecurityNumber?: string;
  profileImage?: string;
  status?: string;
  isPersonalMode?: boolean;
  referralLink?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginUserData = {
  accessToken: string;
  refreshToken?: string;
  profile: DefaultUserProfileData;
};

export type BackendLoginResponse = {
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    country_code: string;
    mobile_no: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    customer?: {
      id: number;
      user_id: number;
      user_type: string;
      company_id: number;
      first_name: string;
      last_name: string;
      email: string;
      country_id: number;
      country_code: string;
      mobile_no: string;
      profile_image: string | null;
      status: string | null;
      created_at: string;
      updated_at: string;
      // ... other customer fields
    };
    business?: {
      // Similar structure for business accounts
      id: number;
      user_id: number;
      company_name: string;

      // ... other business fields
    };
  };
  token: {
    accessTokenId: string;
    tokenType: string;
    expiresIn: number;
    accessToken: string;
  };
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken?: string;
    profile: {
      id: string;
      email: string;
      accountType: string;
      firstName: string;
      lastName: string;
      profileImage?: string;
      status?: string;
      createdAt: string;
      updatedAt: string;
      companyDetails?: {
        companyId: string;
        companyName?: string;
        isEmployed?: boolean;
      };
      userType?: string;
      countryCode?: string;
      mobileNo?: string;
    };
  };
};

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "enterprise" | "personal";
};

export type SendOTPPayload = {
  email: string;
  otpType: string; //'verification' | 'recovery'
  type: string; //'user' | 'business'
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
  token: string;
  type: "user" | "business";
};

export type VerifyInvitePayload = {
  email: string;
  otp: string;
  otpType: string; //'verification' | 'recovery'
  type: string; //'user' | 'business'
};

export type AcceptInvitePayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType?: "admin" | "enterprise" | "enterprise-admin" | "superadmin";
};
