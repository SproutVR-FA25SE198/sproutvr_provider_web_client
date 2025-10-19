import http from '@/common/utils/http';

export const GET_ORDERS_QUERY_KEY = 'getOrders';
export const GET_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const getOrders = () => {
  const result = http.get(`/orders`);
  return result;
};
