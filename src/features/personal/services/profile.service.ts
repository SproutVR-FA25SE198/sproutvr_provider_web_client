import http from '@/common/utils/http';

export function SaveMACAddress(macAddress: string) {
  return http.put('http://localhost:5001/api/v1/auth/organization/profile', { MACAdress: macAddress });
}
