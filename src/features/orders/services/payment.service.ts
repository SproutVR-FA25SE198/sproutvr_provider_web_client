import { PlaceOrderRequest } from '@/common/types';
import http from '@/common/utils/http';

export const checkout = async (order: PlaceOrderRequest) => {
  const result = await http.post('/orders/checkout', order);
  return result.data;
};
