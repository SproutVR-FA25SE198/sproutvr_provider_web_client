export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Organization extends User {
  orgId: string;
  userName: string;
  phoneNumber: string;
  address: string;
  macAddress: string;
  activationKey: string;
  bundleGoogleDriveId: string | null;
}

export interface OrganizationDetailsDto {
  macAddress: string | null;
  name: string;
  address: string | null;
  bundleGoogleDriveId: string | null;
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
  avatarUrl: string | null;
  status: string;
  createdAtUtc: string;
  updatedAtUtc: string | null;
}
