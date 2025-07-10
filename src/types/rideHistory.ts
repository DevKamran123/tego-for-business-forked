// Types for the ride history response
export interface RideHistoryItem {
  id: number;
  booking_type: string;
  rent_type: string;
  passenger_type: string;
  customer_name_other: string | null;
  customer_mobile_no_other: string | null;
  booking_from: string;
  company_id: number;
  corporate_company_id: number;
  company_vehicle_type_id: number;
  fix_rate_id: number | null;
  driver_id: number | null;
  customer_id: number;
  vehicle_type_id: number | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_lat: string;
  pickup_lng: string;
  dropoff_lat: string;
  dropoff_lng: string;
  flight_number: string | null;
  start_trip_lat: string | null;
  start_trip_lng: string | null;
  start_trip_location: string | null;
  status: string;
  on_the_way: number;
  pickup_date_time: string;
  booking_time: string | null;
  accept_time: string | null;
  arrived_time: string | null;
  pickup_time: string | null;
  dropoff_time: string | null;
  waiting_time: string;
  waiting_time_charge: string;
  payment_type: string | null;
  is_changed_payment_type: number;
  card_id: number | null;
  pin: string | null;
  payment_status: string;
  reference_id: string | null;
  jambopay_order_id: string | null;
  payment_response: string | null;
  request_response: string | null;
  request_data: string | null;
  request_id: string | null;
  promocode: string | null;
  tips_status: number;
  tips: string;
  tips_give_date: string | null;
  trip_duration: string | null;
  distance: string;
  distance_fare: string | null;
  duration_fare: string | null;
  base_fare: string | null;
  booking_fee: string | null;
  extra_charge: string;
  fuel_charge: string;
  toll_fee: string;
  toll_location_call_time: string;
  toll_location_last_call_time: string;
  is_airport_booking: number;
  pickup_airport_id: number | null;
  pickup_airport_name: string | null;
  airport_pickup_fee: string;
  dropoff_airport_id: number | null;
  dropoff_airport_name: string | null;
  airport_dropoff_fee: string;
  trip_fare: string;
  sub_total: string | null;
  discount: string | null;
  saving_wallet_amount: string;
  customer_saving_wallet_amount: string | null;
  driver_wallet_percentage: string;
  customer_saving_wallet_percentage: string;
  processing_fee: string;
  grand_total: string | null;
  total_equipment_price: string | null;
  ambulance_package_id: number;
  equipment_id: number | null;
  booking_note: string | null;
  tax: string | null;
  driver_amount: string | null;
  company_amount: string | null;
  other_company_amount: string | null;
  corporate_company_amount: string;
  no_of_passenger: number;
  cancellation_charge: string | null;
  cancel_by: string | null;
  cancele_reason: string | null;
  cancel_time: string | null;
  estimated_fare: string;
  driver_earning: string;
  dropoff_est_time: string;
  dropoff_est_km: string;
  fare_increase_id: number | null;
  fare_increase: string | null;
  request_code: string | null;
  cron_status: string | null;
  request_by_cron: number;
  payment_url: string | null;
  is_corporate_driver: number;
  corporate_driver_type: number;
  corporate_booking_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface RideHistoryResponse {
  data: RideHistoryItem[];
}

export interface RideHistoryError {
  message: string;
  status?: number;
}

export interface RideHistoryResult {
  success: boolean;
  data?: RideHistoryItem[];
  error?: RideHistoryError;
} 