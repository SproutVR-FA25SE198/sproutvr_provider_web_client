import { markNotificationAsReadThunk } from '@/common/stores/notificationStore/notificationThunks';
import { useAppDispatch } from '@/core/store/hooks';

import { useMutation } from '@tanstack/react-query';

export const useMarkNotificationAsRead = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await dispatch(markNotificationAsReadThunk(notificationId)).unwrap();
      return notificationId;
    },
  });
};

