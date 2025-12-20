import axios from 'axios';

import type {
  ApprovalStatus,
  OrganizationRequest,
  OrganizationRequestPaginationResponse,
} from '../types/organization-request.type';

const ACCOUNT_BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

export const GET_ORGANIZATION_REQUESTS_QUERY_KEY = 'GET_ORGANIZATION_REQUESTS_QUERY_KEY';
export const GET_ORGANIZATION_REQUEST_BY_ID_QUERY_KEY = 'GET_ORGANIZATION_REQUEST_BY_ID_QUERY_KEY';

export interface GetOrganizationRequestsParams {
  pageIndex?: number;
  pageSize?: number;
  isPaginated?: boolean;
  organizationName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  approvalStatus?: string;
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
  const {
    pageIndex = 1,
    pageSize = 10,
    isPaginated = true,
    organizationName,
    contactEmail,
    contactPhone,
    address,
    approvalStatus,
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('pageIndex', pageIndex.toString());
  queryParams.append('pageSize', pageSize.toString());
  queryParams.append('isPaginated', isPaginated.toString());

  if (organizationName) {
    queryParams.append('organizationName', organizationName);
  }
  if (contactEmail) {
    queryParams.append('contactEmail', contactEmail);
  }
  if (contactPhone) {
    queryParams.append('contactPhone', contactPhone);
  }
  if (address) {
    queryParams.append('address', address);
  }
  if (approvalStatus) {
    queryParams.append('approvalStatus', approvalStatus);
  }

  const { data } = await axios.get(`${baseUrl}/organization-register-requests?${queryParams.toString()}`);

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
