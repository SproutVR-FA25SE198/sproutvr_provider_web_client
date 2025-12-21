import http from '@/common/utils/http';

import { PaymentDto, PaymentParams, PaymentResponse } from '../../../common/types/payment.type';

export const GET_PAYMENTS_QUERY_KEY = 'GET_PAYMENTS_QUERY_KEY';
export const GET_PAYMENTS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

const normalizePayment = (payment: any): PaymentDto => ({
  amount: payment.amount ?? payment.Amount ?? 0,
  orderId: payment.orderId ?? payment.OrderId ?? '',
  paymentMethod: payment.paymentMethod ?? payment.PaymentMethod ?? undefined,
  transactionCode: payment.transactionCode ?? payment.TransactionCode ?? undefined,
  bankCode: payment.bankCode ?? payment.BankCode ?? undefined,
  bankName: payment.bankName ?? payment.BankName ?? undefined,
  paymentType: payment.paymentType ?? payment.PaymentType ?? '',
  description: payment.description ?? payment.Description ?? '',
  status: payment.status ?? payment.Status ?? '',
  createdAtUtc: payment.createdAtUtc ?? payment.CreatedAtUtc ?? '',
  currency: payment.currency ?? payment.Currency ?? 'VND',
});

const normalizePaymentResponse = (response: any): PaymentResponse => ({
  pageIndex: response.pageIndex ?? response.PageIndex ?? 1,
  pageSize: response.pageSize ?? response.PageSize ?? 10,
  count: response.count ?? response.Count ?? 0,
  data: Array.isArray(response.data ?? response.Data)
    ? (response.data ?? response.Data).map((item: any) => normalizePayment(item))
    : [],
});

/**
 * Get paginated list of all payments (admin)
 */
export const getPayments = async (params: PaymentParams = {}): Promise<{ data: PaymentResponse }> => {
  const {
    pageIndex = 1,
    pageSize = 10,
    isPaginated = true,
    minAmount,
    maxAmount,
    orderId,
    status,
    fromDate,
    toDate,
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('pageIndex', pageIndex.toString());
  queryParams.append('pageSize', pageSize.toString());
  queryParams.append('isPaginated', isPaginated.toString());

  if (minAmount !== undefined) {
    queryParams.append('minAmount', minAmount.toString());
  }
  if (maxAmount !== undefined) {
    queryParams.append('maxAmount', maxAmount.toString());
  }
  if (orderId) {
    queryParams.append('orderId', orderId);
  }
  if (status) {
    queryParams.append('status', status);
  }
  if (fromDate) {
    queryParams.append('fromDate', fromDate);
  }
  if (toDate) {
    queryParams.append('toDate', toDate);
  }

  const result = await http.get(`/payments?${queryParams.toString()}`);
  return {
    data: normalizePaymentResponse(result.data),
  };
};

