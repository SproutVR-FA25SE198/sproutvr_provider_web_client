import { GET_MAP_BY_ID_QUERY_KEY, getMapById } from '@/common/services/map.service';
import { GetMapByIdResponse } from '@/common/types';


import { useQuery } from '@tanstack/react-query';

const useGetMapById = (id: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [GET_MAP_BY_ID_QUERY_KEY, id],
    queryFn: () => getMapById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    select: (res) => res.data,
  });
  return { data: data as GetMapByIdResponse, isLoading, isError, refetch };
};

export default useGetMapById;

