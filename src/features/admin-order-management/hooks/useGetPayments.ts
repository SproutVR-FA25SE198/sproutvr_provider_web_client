import { useQuery } from '@tanstack/react-query';

import { GET_PAYMENTS_QUERY_KEY, GET_PAYMENTS_STALE_TIME, getPayments } from '../services/payment.service';
import { PaymentParams, PaymentResponse } from '../../../common/types/payment.type';

const useGetPayments = (params: PaymentParams = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [GET_PAYMENTS_QUERY_KEY, params],
    queryFn: () => getPayments(params),
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: GET_PAYMENTS_STALE_TIME,
  });

  return { data: data as PaymentResponse, isLoading, isError, refetch };
};

export default useGetPayments;

