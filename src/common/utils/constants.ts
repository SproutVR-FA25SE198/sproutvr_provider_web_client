import { CreditCard, QrCode, Wallet } from 'lucide-react';

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
  CARD: {
    code: 'CARD',
    name: 'Thẻ tín dụng/ghi nợ',
    description: 'Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ',
    icon: CreditCard,
  },
  BANK: {
    code: 'BANK',
    name: 'Chuyển khoản ngân hàng',
    description: 'Thanh toán bằng chuyển khoản ngân hàng',
    icon: QrCode,
  },
};
