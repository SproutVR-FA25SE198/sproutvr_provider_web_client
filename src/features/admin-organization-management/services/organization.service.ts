import axios from 'axios';

import type { CreateOrganizationPayload, Organization, UpdateOrganizationPayload } from '../types/organization.type';

const ACCOUNT_BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

const ensureBaseUrl = () => {
  if (!ACCOUNT_BASE_URL) {
    throw new Error('Missing environment variable: VITE_ACCOUNT_BASE_URL');
  }

  return ACCOUNT_BASE_URL;
};

const normalizeOrganization = (org: any): Organization => ({
  id: String(org.id ?? org.Id ?? ''),
  email: org.email ?? org.Email ?? null,
  phoneNumber: org.phoneNumber ?? org.PhoneNumber ?? null,
  userName: org.userName ?? org.UserName ?? null,
  avatarUrl: org.avatarUrl ?? org.AvatarUrl ?? null,
  status: org.status ?? org.Status ?? '',
  createdAtUtc: org.createdAtUtc ?? org.CreatedAtUtc ?? '',
  updatedAtUtc: org.updatedAtUtc ?? org.UpdatedAtUtc ?? null,
  name: org.name ?? org.Name ?? '',
  address: org.address ?? org.Address ?? '',
  macAddress: org.macAddress ?? org.MACAddress ?? null,
  activationKey: org.activationKey ?? org.ActivationKey ?? null,
  bundleGoogleDriveId: org.bundleGoogleDriveId ?? org.BundleGoogleDriveId ?? null,
});

export interface GetOrganizationsParams {
  pageIndex?: number;
  pageSize?: number;
  isPaginated?: boolean;
  email?: string;
  phoneNumber?: string;
  status?: string;
  macAddress?: string;
  name?: string;
  address?: string;
}

export const getOrganizations = async (params: GetOrganizationsParams = {}): Promise<{
  data: Organization[];
  pageIndex: number;
  pageSize: number;
  count: number;
}> => {
  const baseUrl = ensureBaseUrl();
  const {
    pageIndex = 1,
    pageSize = 100,
    isPaginated = false,
    email,
    phoneNumber,
    status,
    macAddress,
    name,
    address,
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('pageIndex', pageIndex.toString());
  queryParams.append('pageSize', pageSize.toString());
  queryParams.append('isPaginated', isPaginated.toString());

  if (email) {
    queryParams.append('email', email);
  }
  if (phoneNumber) {
    queryParams.append('phoneNumber', phoneNumber);
  }
  if (status) {
    queryParams.append('status', status);
  }
  if (macAddress) {
    queryParams.append('macAddress', macAddress);
  }
  if (name) {
    queryParams.append('name', name);
  }
  if (address) {
    queryParams.append('address', address);
  }

  const { data } = await axios.get(`${baseUrl}/organizations?${queryParams.toString()}`);

  if (!Array.isArray(data.data)) {
    return {
      data: [],
      pageIndex: data.pageIndex || 1,
      pageSize: data.pageSize || pageSize,
      count: data.count || 0,
    };
  }

  return {
    data: data.data.map((org: any) => normalizeOrganization(org)),
    pageIndex: data.pageIndex || 1,
    pageSize: data.pageSize || pageSize,
    count: data.count || 0,
  };
};

export const createOrganization = async (payload: CreateOrganizationPayload): Promise<Organization> => {
  const baseUrl = ensureBaseUrl();
  const { data } = await axios.post(`${baseUrl}/organizations`, payload);

  return normalizeOrganization(data);
};

export const updateOrganization = async (
  organizationId: string,
  payload: UpdateOrganizationPayload,
): Promise<Organization> => {
  const baseUrl = ensureBaseUrl();
  const { data } = await axios.put(`${baseUrl}/organizations/${organizationId}`, payload);

  return normalizeOrganization(data);
};

export const deactivateOrganization = async (organizationId: string) => {
  const baseUrl = ensureBaseUrl();
  await axios.delete(`${baseUrl}/organizations/${organizationId}`);
};
