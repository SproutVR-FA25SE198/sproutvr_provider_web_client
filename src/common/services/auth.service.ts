import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
  return response.data;
};
