import { GET_MAP_BY_ID_QUERY_KEY, GET_MAPS_STALE_TIME, getMapById, GetMapByIdRequest } from '../services/map.service';

import { useQuery } from '@tanstack/react-query';

const useGetMapDetails = (params: GetMapByIdRequest) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_MAP_BY_ID_QUERY_KEY, params.mapId],
    queryFn: () => getMapById(params.mapId),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    staleTime: GET_MAPS_STALE_TIME,
  });

  return { data, isLoading, error };
};

export default useGetMapDetails;
