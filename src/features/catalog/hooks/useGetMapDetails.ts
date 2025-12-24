import { MapDetails } from '@/common/types/map.type';

import { GET_MAP_BY_ID_QUERY_KEY, GET_MAPS_STALE_TIME, getMapById, GetMapByIdRequest } from '../services/map.service';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const useGetMapDetails = (params: GetMapByIdRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_MAP_BY_ID_QUERY_KEY, params.mapId],
    queryFn: () => getMapById(params.mapId),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: GET_MAPS_STALE_TIME,
  });

  // Memoize images array to prevent re-renders
  const images = useMemo(() => {
    if (!data) return [];

    // Get up to 4 images from task locations for gallery
    const locationImages = (data.taskLocations || [])
      .slice(0, 5) // Take first 5 locations
      .map((loc) => loc.imageUrl)
      .filter(Boolean); // Remove any null/undefined

    const allImages = [data.imageUrl, data.previewUrl, ...locationImages].filter(Boolean);

    // Fill with main image if not enough locations
    while (allImages.length < 4 && data.imageUrl) {
      allImages.push(data.imageUrl);
    }

    return allImages.slice(0, 5);
  }, [data]);

  const returnData: MapDetails = useMemo(
    () => (data ? { ...data, imageUrl: images as string[] } : ({} as MapDetails)),
    [data, images],
  );

  return { data: returnData, isLoading, isError };
};

export default useGetMapDetails;
