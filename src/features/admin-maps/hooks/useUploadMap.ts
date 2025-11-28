import { GET_ALL_MAPS_QUERY_KEY } from '@/common/services/map.service';
import { uploadMap, UploadMapRequest } from '@/features/admin-maps/services/map.service';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUploadMap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadMapRequest) => uploadMap(data),
    onSuccess: () => {
      // Invalidate maps list to refetch after successful upload
      queryClient.invalidateQueries({ queryKey: [GET_ALL_MAPS_QUERY_KEY] });
    },
  });
};

export default useUploadMap;

