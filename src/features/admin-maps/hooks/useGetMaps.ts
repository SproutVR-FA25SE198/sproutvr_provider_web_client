import { GetAllMapsRequest, GET_ALL_MAPS_QUERY_KEY, getAllMaps } from '@/common/services/map.service';
import { GetMapsResponse } from '@/common/types';


import { useQuery } from '@tanstack/react-query';

const useGetMaps = (params: GetAllMapsRequest) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [GET_ALL_MAPS_QUERY_KEY, params],
    queryFn: () => getAllMaps(params),
    refetchOnWindowFocus: false,
    select: (res) => res.data,
  });
  return { data: data as GetMapsResponse, isLoading, isError, refetch, isRefetching };
};

export default useGetMaps;

