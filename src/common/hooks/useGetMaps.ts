import { useQuery } from '@tanstack/react-query';
import { GetAllMapsRequest, GET_ALL_MAPS_QUERY_KEY, getAllMaps, GET_MAPS_STALE_TIME } from '../services/map.service';

export const useGetMaps = (params: GetAllMapsRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_ALL_MAPS_QUERY_KEY, params],
    queryFn: () => getAllMaps(params),
    select: (data) => data.data,
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: GET_MAPS_STALE_TIME,
    enabled: params.pageIndex > 0 && params.pageSize > 0, // Only run if valid params
  });

  return { data, isLoading, isError };
};

export default useGetMaps;
