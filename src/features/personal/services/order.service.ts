import http from '@/common/utils/http';

export const GET_ORDERS_QUERY_KEY = 'GET_ORDERS_QUERY_KEY';
export const GET_ORDER_BY_ID_QUERY_KEY = 'GET_ORDER_BY_ID_QUERY_KEY';
export const GET_LIBRARY_QUERY_KEY = 'GET_LIBRARY_QUERY_KEY';
export const GET_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const getOrders = () => {
  const result = http.get(`/orders/history`);
  return result;
};

export const getOrderById = (orderId: string) => {
  const result = http.get(`/orders/${orderId}`);
  return result;
};

export const getLibrary = () => {
  const result = http.get(`/orders/purchased-maps`);
  return result;
};
