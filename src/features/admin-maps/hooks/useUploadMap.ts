import { GET_ALL_MAPS_QUERY_KEY } from '@/common/services/map.service';
import { uploadMap, UploadMapRequest, getMapMetadata } from '@/features/admin-maps/services/map.service';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useUploadMap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadMapRequest) => {
      // First upload the map bundle
      const uploadResult = await uploadMap(data);
      // Response structure: { data: { data: { mapId: string } } }
      const mapId = uploadResult.data?.mapId;

      if (!mapId) {
        throw new Error('Không nhận được mapId từ server');
      }

      // Then get metadata and upload to Drive
      try {
        await getMapMetadata(mapId);
        console.log('Metadata uploaded to Drive successfully');
      } catch (error) {
        console.error('Failed to upload metadata to Drive:', error);
        // Don't throw - map upload was successful, metadata upload is secondary
        toast.warning('Map đã được tải lên nhưng có lỗi khi upload metadata lên Drive');
      }

      return uploadResult;
    },
    onSuccess: () => {
      // Invalidate maps list to refetch after successful upload
      queryClient.invalidateQueries({ queryKey: [GET_ALL_MAPS_QUERY_KEY] });
    },
  });
};

export default useUploadMap;

