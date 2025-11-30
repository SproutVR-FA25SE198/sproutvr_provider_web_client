import { Order } from '@/common/types/order.type';
import { getAdminOrderByCode } from '@/features/admin-order-management/services/order.service';

import { useQuery } from '@tanstack/react-query';

export const GET_ORDER_BY_CODE_QUERY_KEY = 'GET_ORDER_BY_CODE_QUERY_KEY';

export const useGetOrderByCode = (orderCode: string | null) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [GET_ORDER_BY_CODE_QUERY_KEY, orderCode],
    queryFn: () => getAdminOrderByCode(orderCode!),
    enabled: !!orderCode,
    refetchOnWindowFocus: false,
    select: (responseData) => {
      // API might return paginated response or array
      // Check if it's a paginated response
      if (responseData?.data && Array.isArray(responseData.data)) {
        return responseData.data.length > 0 ? (responseData.data[0] as Order) : null;
      }

      // Check if it's a direct array
      if (Array.isArray(responseData)) {
        return responseData.length > 0 ? (responseData[0] as Order) : null;
      }

      // Check if it's a single order object
      if (responseData && typeof responseData === 'object' && 'id' in responseData) {
        return responseData as Order;
      }

      return null;
    },
  });

  return { data, isLoading, isError, refetch };
};

