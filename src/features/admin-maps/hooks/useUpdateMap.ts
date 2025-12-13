import { GET_ALL_MAPS_QUERY_KEY, GET_MAP_BY_ID_QUERY_KEY } from '@/common/services/map.service';
import { updateMap, UpdateMapRequest } from '@/features/admin-maps/services/map.service';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateMap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mapId, data }: { mapId: string; data: UpdateMapRequest }) => updateMap(mapId, data),
    onSuccess: (_, variables) => {
      // Invalidate maps list and specific map details
      queryClient.invalidateQueries({ queryKey: [GET_ALL_MAPS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_MAP_BY_ID_QUERY_KEY, variables.mapId] });
    },
  });
};

export default useUpdateMap;

