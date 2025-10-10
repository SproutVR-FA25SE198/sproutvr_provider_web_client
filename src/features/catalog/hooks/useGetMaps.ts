import { GET_ALL_MAPS_QUERY_KEY, GET_MAPS_STALE_TIME, getAllMaps, GetAllMapsRequest } from '../services/map.service';

import { useQuery } from '@tanstack/react-query';

const useGetMaps = (params: GetAllMapsRequest) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      GET_ALL_MAPS_QUERY_KEY,
      params.pageIndex,
      params.pageSize,
      params.searchKeyword,
      params.subjectIds,
      params.sortBy,
    ],
    queryFn: () => getAllMaps(params),
    refetchOnWindowFocus: false,
    staleTime: GET_MAPS_STALE_TIME,
  });

  return { data, isLoading, error };
};

export default useGetMaps;
