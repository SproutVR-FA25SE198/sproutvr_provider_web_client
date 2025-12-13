import http from '@/common/utils/http';

const BASE_ACCOUNT_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

export function SaveMACAddress(macAddress: string) {
  return http.put(`${BASE_ACCOUNT_URL}/auth/organization/profile`, { MACAdress: macAddress });
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function changePassword(data: ChangePasswordRequest) {
  return http.put(`${BASE_ACCOUNT_URL}/auth/change-password`, data);
}
