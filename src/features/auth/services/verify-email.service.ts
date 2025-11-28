import axios from 'axios';

const ACCOUNT_BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

export interface VerifyEmailRequest {
  token: string;
  organizationRegisterRequestId: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message?: string;
}

export const verifyEmail = async (params: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  if (!ACCOUNT_BASE_URL) {
    throw new Error('Missing environment variable: VITE_BASE_ACCOUNT_URL');
  }

  const url = `${ACCOUNT_BASE_URL}/organization-register-requests/verify-email`;
  const { data } = await axios.post(url, {
    token: params.token,
    organizationRegisterRequestId: params.organizationRegisterRequestId,
  });
  return data;
};

