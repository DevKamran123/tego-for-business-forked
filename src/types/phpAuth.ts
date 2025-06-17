// PHP API specific types and interfaces

export interface PHPRegisterPayload {
  first_name: string;
  last_name: string;
  country_code: string;
  mobile_no: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface PHPLoginPayload {
  email: string;
  password: string;
}

export interface PHPTokenInfo {
  accessTokenId: string;
  tokenType: string;
  expiresIn: number;
  accessToken: string;
}

export interface PHPUser {
  id: number;
  first_name: string;
  last_name: string;
  country_code: string;
  mobile_no: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  customer?: PHPCustomer;
  business?: PHPBusiness;
}

export interface PHPCustomer {
  id: number;
  user_id: number;
  user_type: string;
  company_id: number;
  corporate_company_id: number;
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  country_id: number;
  country: string | null;
  country_code: string;
  mobile_no: string;
  dob: string | null;
  gender: string | null;
  identify_number: string | null;
  password: string | null;
  wallet_balance: string | null;
  saving_wallet_balance: string | null;
  saving_wallet_percentage: string | null;
  is_saving_wallet: number;
  miles_balance: string | null;
  miles_exp_date: string | null;
  co_miles_balance: string;
  co_miles_exp_date: string | null;
  device_type: string | null;
  device_token: string | null;
  old_device_token: string | null;
  old_device_type: string | null;
  lat: string | null;
  lng: string | null;
  qr_code: string | null;
  profile_image: string | null;
  social_id: string | null;
  social_type: string | null;
  remember_token: string | null;
  address: string | null;
  trip_limit_month: string | null;
  trash: string | null;
  status: string | null;
  IsReferral: number;
  referral_code: string | null;
  created_at: string;
  updated_at: string;
  rating: string;
  transaction_password: string | null;
  jambopay_profile_id: string | null;
  is_jambopay_wallet_setup: number;
  setup_wallet_response: string | null;
  initiate_auto_debit_subscription_reference_no: string | null;
  verify_auto_debit_subscription_response: string | null;
  last_wallet_update_time: string | null;
  last_wallet_response: string | null;
  IsPromotioal: number;
  social_security_number: string | null;
  bank_holder_name: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_routing_number: string | null;
  IsTPIN: number;
  sponsor_tpin: string | null;
  sponsor_name: string | null;
  stripe_customer_id: string | null;
  enable_security_code: number;
}

export interface PHPBusiness {
  id: number;
  user_id: number;
  company_name: string;
  // Add other business fields as needed
}

export interface PHPRegisterResponse {
  message: string;
  user: PHPUser;
  token: PHPTokenInfo;
}

export interface PHPLoginResponse {
  message: string;
  user: PHPUser;
  token: PHPTokenInfo;
}

export interface PHPAuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: PHPUser;
    token: PHPTokenInfo;
  };
}
