export interface Organization {
  id: string;
  email: string | null;
  phoneNumber: string | null;
  userName: string | null;
  avatarUrl: string | null;
  status: string;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  name: string;
  address: string;
  macAddress: string | null;
  activationKey: string | null;
  bundleGoogleDriveId: string | null;
}

export interface CreateOrganizationPayload {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface UpdateOrganizationPayload {
  name?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  macAddress?: string | null;
  bundleGoogleDriveId?: string | null;
}


