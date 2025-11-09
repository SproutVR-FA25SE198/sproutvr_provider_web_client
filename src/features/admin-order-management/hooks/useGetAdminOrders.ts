import { GetOrdersResponse } from '@/common/types/order.type';

import {
  GET_ADMIN_ORDERS_QUERY_KEY,
  GET_ADMIN_ORDERS_STALE_TIME,
  GetAdminOrdersParams,
  getAdminOrders,
} from '../services/order.service';

import { useQuery } from '@tanstack/react-query';

const useGetAdminOrders = (params: GetAdminOrdersParams = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [GET_ADMIN_ORDERS_QUERY_KEY, params],
    queryFn: () => getAdminOrders(params),
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: GET_ADMIN_ORDERS_STALE_TIME,
  });

  return { data: data as GetOrdersResponse, isLoading, isError, refetch };
};

export default useGetAdminOrders;

