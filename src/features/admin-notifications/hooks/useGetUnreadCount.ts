import { fetchUnreadCountThunk } from '@/common/stores/notificationStore/notificationThunks';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';

import { useEffect } from 'react';

export const useGetUnreadCount = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.root.auth.user);
  const unreadCount = useAppSelector((state) => state.root.notification.unreadCount);
  const isLoading = useAppSelector((state) => state.root.notification.isLoading);

  useEffect(() => {
    if (user?.sub && user.role === 'SystemAdmin') {
      dispatch(fetchUnreadCountThunk(user.sub));
    }
  }, [dispatch, user?.sub, user?.role]);

  return { unreadCount, isLoading };
};

