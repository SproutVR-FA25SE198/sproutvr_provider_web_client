import http from '@/common/utils/http';

export const GET_ORDERS_QUERY_KEY = 'GET_ORDERS_QUERY_KEY';
export const GET_ORDER_BY_ID_QUERY_KEY = 'GET_ORDER_BY_ID_QUERY_KEY';
export const GET_LIBRARY_QUERY_KEY = 'GET_LIBRARY_QUERY_KEY';
export const GET_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const getOrders = async () => {
  const result = await http.get(`/orders/history`);
  return result;
};

export const getOrderById = async (orderId: string) => {
  const result = await http.get(`/orders/${orderId}`);
  return result;
};

export const getLibrary = async () => {
  const result = await http.get(`/orders/purchased-maps`);
  return result;
};
