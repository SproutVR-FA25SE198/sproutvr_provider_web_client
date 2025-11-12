import axios from 'axios';

const ACCOUNT_BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

export interface OrganizationRegisterRequestDto {
  OrganizationName: string;
  Address: string;
  ContactPhone: string;
  ContactEmail: string;
}

export const submitOrganizationRegisterRequest = async (payload: OrganizationRegisterRequestDto) => {
  if (!ACCOUNT_BASE_URL) {
    throw new Error('Missing environment variable: VITE_BASE_ACCOUNT_URL');
  }

  const url = `${ACCOUNT_BASE_URL}/organization-register-requests`;
  const { data } = await axios.post(url, payload);
  return data;
};


