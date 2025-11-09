import { OrderDetails } from '@/common/types/order.type';

import {
  GET_ADMIN_ORDER_BY_ID_QUERY_KEY,
  GET_ADMIN_ORDERS_STALE_TIME,
  getAdminOrderById,
} from '../services/order.service';

import { useQuery } from '@tanstack/react-query';

const useGetAdminOrderById = (orderId: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [GET_ADMIN_ORDER_BY_ID_QUERY_KEY, orderId],
    queryFn: () => getAdminOrderById(orderId),
    enabled: !!orderId,
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: GET_ADMIN_ORDERS_STALE_TIME,
  });

  return { data: data as OrderDetails, isLoading, isError, refetch };
};

export default useGetAdminOrderById;

