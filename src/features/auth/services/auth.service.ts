import axios from 'axios';

export const GET_MAP_BY_ID_QUERY_KEY = 'GET_MAP_BY_ID_QUERY_KEY';
export const GET_MAPS_STALE_TIME = 30 * 1000; // 30 seconds
export const GET_MAPS_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

const BASE_URL = 'http://localhost:5001/api/v1/auth';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};
