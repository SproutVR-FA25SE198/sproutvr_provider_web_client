import { GET_ORDERS_QUERY_KEY, GET_ORDERS_STALE_TIME, getOrders } from '../services/order.service';

import { useQuery } from '@tanstack/react-query';

const useGetOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_ORDERS_QUERY_KEY],
    queryFn: () => getOrders(),
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: GET_ORDERS_STALE_TIME,
  });

  return { data, isLoading, isError };
};

export default useGetOrders;
