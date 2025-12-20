import http from '@/common/utils/http';

export const GET_ADMIN_ORDERS_QUERY_KEY = 'GET_ADMIN_ORDERS_QUERY_KEY';
export const GET_ADMIN_ORDER_BY_ID_QUERY_KEY = 'GET_ADMIN_ORDER_BY_ID_QUERY_KEY';
export const GET_ADMIN_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export interface GetAdminOrdersParams {
  pageIndex?: number;
  pageSize?: number;
  isPaginated?: boolean;
  organizationName?: string;
  organizationId?: string;
  minAmount?: number;
  maxAmount?: number;
  orderCode?: number;
  paymentMethod?: string;
  bank?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

/**
 * Get paginated list of all orders (admin)
 */
export const getAdminOrders = async (params: GetAdminOrdersParams = {}) => {
  const {
    pageIndex = 1,
    pageSize = 10,
    isPaginated = true,
    organizationName,
    organizationId,
    minAmount,
    maxAmount,
    orderCode,
    paymentMethod,
    bank,
    status,
    fromDate,
    toDate,
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('pageIndex', pageIndex.toString());
  queryParams.append('pageSize', pageSize.toString());
  queryParams.append('isPaginated', isPaginated.toString());

  if (organizationName) {
    queryParams.append('organizationName', organizationName);
  }
  if (organizationId) {
    queryParams.append('organizationId', organizationId);
  }
  if (minAmount !== undefined) {
    queryParams.append('minAmount', minAmount.toString());
  }
  if (maxAmount !== undefined) {
    queryParams.append('maxAmount', maxAmount.toString());
  }
  if (orderCode) {
    queryParams.append('orderCode', orderCode.toString());
  }
  if (paymentMethod) {
    queryParams.append('paymentMethod', paymentMethod);
  }
  if (bank) {
    queryParams.append('bank', bank);
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

/**
 * Get order by order code (admin)
 */
export const getAdminOrderByCode = async (orderCode: string) => {
  const result = await http.get(`/orders?OrderCode=${orderCode}`);
  return result.data;
};

