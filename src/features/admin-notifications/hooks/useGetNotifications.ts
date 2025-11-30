import { fetchUnreadNotificationsThunk } from '@/common/stores/notificationStore/notificationThunks';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';

import { useEffect } from 'react';

export const useGetNotifications = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.root.auth.user);
  const notifications = useAppSelector((state) => state.root.notification.notifications);
  const isLoading = useAppSelector((state) => state.root.notification.isLoading);

  useEffect(() => {
    if (user?.sub && user.role === 'SystemAdmin') {
      dispatch(fetchUnreadNotificationsThunk(user.sub));
    }
  }, [dispatch, user?.sub, user?.role]);

  return { notifications, isLoading };
};

