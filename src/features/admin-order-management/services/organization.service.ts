import axios from 'axios';

export const GET_ORGANIZATION_BY_ID_QUERY_KEY = 'GET_ORGANIZATION_BY_ID_QUERY_KEY';
const BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

/**
 * Get organization by ID (System Admin only)
 */
export const getOrganizationById = async (organizationId: string) => {
  const result = await axios.get(`${BASE_URL}/organizations/${organizationId}`);
  return result;
};

