export type DefaultUserProfileData = {
  id: string;
  email: string;
  accountType: string;
  pimId?: null | string;
  firstName: string;
  lastName: string;
  companyDetails?: {
    companyId: string;
    isEmployed: boolean;
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
}

export type LoginUserData = {
  accessToken: string;
  refreshToken: string;
  profile: DefaultUserProfileData;
}

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: 'enterprise' | 'personal';
}

export type SendOTPPayload = {
  email: string;
  otpType: string; //'verification' | 'recovery'
  type: string; //'user' | 'business'
}

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
  token: string;
  type: 'user' | 'business';
}

export type VerifyInvitePayload = {
  email: string;
  otp: string;
  otpType: string; //'verification' | 'recovery'
  type: string; //'user' | 'business'
}

export type AcceptInvitePayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType?: 'admin' | 'enterprise' | 'enterprise-admin' | 'superadmin';
}