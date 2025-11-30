import axios from 'axios';

import type {
  ApprovalStatus,
  OrganizationRequest,
  OrganizationRequestPaginationResponse,
} from '../types/organization-request.type';

const ACCOUNT_BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL + "/api/v1";

export const GET_ORGANIZATION_REQUESTS_QUERY_KEY = 'GET_ORGANIZATION_REQUESTS_QUERY_KEY';
export const GET_ORGANIZATION_REQUEST_BY_ID_QUERY_KEY = 'GET_ORGANIZATION_REQUEST_BY_ID_QUERY_KEY';

export interface GetOrganizationRequestsParams {
  pageIndex?: number;
  pageSize?: number;
}

const ensureBaseUrl = () => {
  if (!ACCOUNT_BASE_URL) {
    throw new Error('Missing environment variable: VITE_ACCOUNT_BASE_URL');
  }

  return ACCOUNT_BASE_URL;
};

const normalizeRequest = (request: any): OrganizationRequest => ({
  id: request.id ?? request.Id ?? '',
  organizationName: request.organizationName ?? request.OrganizationName ?? '',
  address: request.address ?? request.Address ?? '',
  contactPhone: request.contactPhone ?? request.ContactPhone ?? '',
  contactEmail: request.contactEmail ?? request.ContactEmail ?? '',
  approvalStatus: request.approvalStatus ?? request.ApprovalStatus ?? 'Unverified',
});

const normalizePaginationResponse = (response: any): OrganizationRequestPaginationResponse => ({
  pageIndex: response.pageIndex ?? response.PageIndex ?? 1,
  pageSize: response.pageSize ?? response.PageSize ?? response.data?.length ?? 0,
  count: response.count ?? response.Count ?? 0,
  data: Array.isArray(response.data ?? response.Data)
    ? (response.data ?? response.Data).map((item: any) => normalizeRequest(item))
    : [],
});

export const getOrganizationRequests = async (
  params: GetOrganizationRequestsParams,
): Promise<OrganizationRequestPaginationResponse> => {
  const baseUrl = ensureBaseUrl();
  const { data } = await axios.get(`${baseUrl}/organization-register-requests`, {
    params,
  });

  return normalizePaginationResponse(data);
};

export const getOrganizationRequestById = async (id: string): Promise<OrganizationRequest> => {
  const baseUrl = ensureBaseUrl();
  const { data } = await axios.get(`${baseUrl}/organization-register-requests/${id}`);

  return normalizeRequest(data);
};

export interface CheckOrganizationRequestPayload {
  OrganizationRegisterRequestId: string;
  ApprovalStatus: ApprovalStatus;
  RejectReason?: string | null;
}

export const checkOrganizationRequest = async (payload: CheckOrganizationRequestPayload) => {
  const baseUrl = ensureBaseUrl();
  const { data } = await axios.post(`${baseUrl}/organization-register-requests/check`, payload);
  return data;
};


