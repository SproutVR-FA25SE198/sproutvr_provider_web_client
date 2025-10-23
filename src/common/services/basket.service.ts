import { UpdateBasketRequest } from '@/common/types/basket.type';
import http from '@/common/utils/http';

export const GET_ORDERS_QUERY_KEY = 'GET_ORDERS_QUERY_KEY';
export const GET_ORDER_BY_ID_QUERY_KEY = 'GET_ORDER_BY_ID_QUERY_KEY';
export const GET_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

const getBasket = (orgId: string) => {
  const result = http.get(`/baskets/organizations/${orgId}`);
  return result;
};

const updateBasket = (basket: UpdateBasketRequest) => {
  const result = http.post(`/baskets`, basket);
  return result;
};

export const basketService = {
  getBasket,
  updateBasket,
};
