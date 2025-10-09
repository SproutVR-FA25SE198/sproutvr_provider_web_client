export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Organization extends User {
  orgId: string;
  phone: string;
  address: string;
  macAddress: string;
  activationKey: string;
}
