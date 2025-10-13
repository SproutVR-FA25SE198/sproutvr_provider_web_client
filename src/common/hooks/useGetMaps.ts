import {
  GET_ALL_MAPS_QUERY_KEY,
  GET_MAPS_STALE_TIME,
  getAllMaps,
  GetAllMapsRequest,
} from '@/common/services/map.service';

import { useQuery } from '@tanstack/react-query';

export const useGetMaps = (params: GetAllMapsRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      GET_ALL_MAPS_QUERY_KEY,
      params.pageIndex,
      params.pageSize,
      params.searchKeyword,
      params.subjectIds,
      params.sortBy,
    ],
    queryFn: () => getAllMaps(params),
    select: (data) => data.data,
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: GET_MAPS_STALE_TIME,
  });

  return { data, isLoading, isError };
};

export default useGetMaps;
