import { MapDetails } from '@/common/types/map.type';

import { GET_MAP_BY_ID_QUERY_KEY, GET_MAPS_STALE_TIME, getMapById, GetMapByIdRequest } from '../services/map.service';

import { useQuery } from '@tanstack/react-query';

const useGetMapDetails = (params: GetMapByIdRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_MAP_BY_ID_QUERY_KEY, params.mapId],
    queryFn: () => getMapById(params.mapId),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: GET_MAPS_STALE_TIME,
  });

  const images = [
    data?.imageUrl,
    data?.taskLocations[0].imageUrl,
    data?.taskLocations[1].imageUrl,
    data?.taskLocations[2].imageUrl,
  ];

  const returnData: MapDetails = data ? { ...data, imageUrl: images as string[] } : ({} as MapDetails);

  return { data: returnData || data, isLoading, isError };
};

export default useGetMapDetails;
