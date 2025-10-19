import { getAccessToken } from './cookies';
import JwtDecode from './jwtDecode';

export function hasValidTokens(): boolean {
  const accessToken = JwtDecode(getAccessToken());
  if (accessToken && accessToken.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    return accessToken.exp > currentTime;
  }
  return false;
}
