import { CreditCard, QrCode, Wallet } from 'lucide-react';

import { OrderStatus } from './enums';

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
} as const;

export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

export const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PAYMENT_METHODS = {
  VNPAY: {
    code: 'VNPAY',
    name: 'VNPay',
    description: 'Thanh toán qua ví VNPay',
    icon: Wallet,
  },
  ZALOPAY: {
    code: 'ZALOPAY',
    name: 'ZaloPay',
    description: 'Thanh toán bằng ví ZaloPay',
    icon: CreditCard,
  },
  PAYOS: {
    code: 'PAYOS',
    name: 'Chuyển khoản ngân hàng',
    description: 'Thanh toán bằng chuyển khoản ngân hàng',
    icon: QrCode,
  },
};

export const ORDER_STATUS_BADGE = {
  [OrderStatus.Assigned]: 'bg-blue-500',
  [OrderStatus.Canceled]: 'bg-red-500',
  [OrderStatus.Finished]: 'bg-secondary',
  [OrderStatus.Payment_Failed]: 'bg-destructive',
  [OrderStatus.Pending_Bundle]: 'bg-yellow-500',
  [OrderStatus.Pending_Payment]: 'bg-blue-500',
};
