import axios from 'axios';

import type {
  CreateOrganizationPayload,
  Organization,
  UpdateOrganizationPayload,
} from '../types/organization.type';

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

export const getOrganizations = async (): Promise<Organization[]> => {
  const baseUrl = ensureBaseUrl();
  const { data } = await axios.get(`${baseUrl}/organizations`);

  if (!Array.isArray(data.data)) {
    return [];
  }

  return data.data.map((org: Organization) => normalizeOrganization(org));
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


