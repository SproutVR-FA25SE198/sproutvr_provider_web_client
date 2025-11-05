import { PlaceOrderRequest } from '@/common/types';
import http from '@/common/utils/http';

export const checkout = async (order: PlaceOrderRequest) => {
  const result = await http.post('/orders/checkout', order);
  return result.data;
};

export const checkPaymentStatus = async (orderId: string) => {
  const result = await http.get(`/orders/${orderId}`);
  return result.data;
};

export const cancelPayment = async (orderCode: string | number) => {
  const result = await http.post(`/payments/cancel/${orderCode}`);
  return result.data;
};