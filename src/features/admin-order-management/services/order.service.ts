import http from '@/common/utils/http';

export const GET_ADMIN_ORDERS_QUERY_KEY = 'GET_ADMIN_ORDERS_QUERY_KEY';
export const GET_ADMIN_ORDER_BY_ID_QUERY_KEY = 'GET_ADMIN_ORDER_BY_ID_QUERY_KEY';
export const GET_ADMIN_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export interface GetAdminOrdersParams {
  pageIndex?: number;
  pageSize?: number;
  status?: string;
  searchTerm?: string;
}

/**
 * Get paginated list of all orders (admin)
 */
export const getAdminOrders = async (params: GetAdminOrdersParams = {}) => {
  const { pageIndex = 1, pageSize = 10, status, searchTerm } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('pageIndex', pageIndex.toString());
  queryParams.append('pageSize', pageSize.toString());

  if (status) {
    queryParams.append('status', status);
  }

  if (searchTerm) {
    queryParams.append('searchTerm', searchTerm);
  }

  const result = await http.get(`/orders?${queryParams.toString()}`);
  return result;
};

/**
 * Get order details by ID (admin)
 */
export const getAdminOrderById = async (orderId: string) => {
  const result = await http.get(`/orders/${orderId}`);
  return result;
};

