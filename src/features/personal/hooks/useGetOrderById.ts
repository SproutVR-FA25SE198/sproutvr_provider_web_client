import { OrderDetails } from '@/common/types/order.type';

import { GET_ORDER_BY_ID_QUERY_KEY, GET_ORDERS_STALE_TIME, getOrderById } from '../services/order.service';

import { useQuery } from '@tanstack/react-query';

const useGetOrderById = (orderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_ORDER_BY_ID_QUERY_KEY, orderId],
    queryFn: () => getOrderById(orderId),
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: GET_ORDERS_STALE_TIME,
  });
  console.log('useGetOrderById data:', data);

  return { data: data as OrderDetails, isLoading, isError };
};

export default useGetOrderById;
