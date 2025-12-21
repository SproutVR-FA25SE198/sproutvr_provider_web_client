export interface PaymentDto {
  amount: number;
  orderId: string;
  paymentMethod?: string;
  transactionCode?: string;
  bankCode?: string;
  bankName?: string;
  paymentType: string;
  description: string;
  status: string;
  createdAtUtc: string;
  currency: string;
}

export interface PaymentParams {
  pageIndex?: number;
  pageSize?: number;
  isPaginated?: boolean;
  minAmount?: number;
  maxAmount?: number;
  orderId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PaymentResponse {
  pageIndex?: number;
  pageSize?: number;
  count?: number;
  data: PaymentDto[];
}

export enum PaymentMethod {
  PAYOS = 'PAYOS',
  MANUAL = 'MANUAL',
}

export enum PaymentStatus {
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export enum PaymentType {
  MapOrder = 'MapOrder',
  Refund = 'Refund',
  SetupFee = 'SetupFee',
}

