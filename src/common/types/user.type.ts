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
  bundleGoogleDriveUrl: null;
}
