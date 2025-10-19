import { getAccessToken } from '@/common/utils';

import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/v1/auth';

export const GET_PROFILE_QUERY_KEY = 'GET_PROFILE_QUERY_KEY';
export const GET_PROFILE_STALE_TIME = 5 * 60 * 1000; // 5 minutes
export const GET_PROFILE_EXPIRY_TIME = 15 * 60 * 1000;

export const getProfile = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: 'Bearer ' + getAccessToken(),
    },
  });
  return response.data;
};
