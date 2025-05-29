export interface OnboardingPayload {
  residentialAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  socialSecurityNumber: string;
  profileImage: string;
}

export interface OnboardingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  pimId: string;
  companyDetails: {
    companyId: string;
    isEmployed: boolean;
  };
  residentialAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  socialSecurityNumber: string;
  profileImage: string;
  status: string;
  isPersonalMode: boolean;
  referralLink: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: OnboardingUser;
}

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  data?: string[];
}
