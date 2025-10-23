import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/v1/auth';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};
