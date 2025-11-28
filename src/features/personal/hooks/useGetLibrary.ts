import { GET_LIBRARY_QUERY_KEY, GET_ORDERS_STALE_TIME, getLibrary } from '../services/order.service';

import { useQuery } from '@tanstack/react-query';

const useGetLibrary = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_LIBRARY_QUERY_KEY],
    queryFn: () => getLibrary(),
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: GET_ORDERS_STALE_TIME,
  });

  return { data, isLoading, isError };
};

export default useGetLibrary;
