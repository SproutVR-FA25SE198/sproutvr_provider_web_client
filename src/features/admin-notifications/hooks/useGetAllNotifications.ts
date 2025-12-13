import { getNotificationsByAdminId } from '../services/notification.service';
import { useAppSelector } from '@/core/store/hooks';

import { useQuery } from '@tanstack/react-query';

export const GET_ALL_NOTIFICATIONS_QUERY_KEY = 'GET_ALL_NOTIFICATIONS_QUERY_KEY';

export const useGetAllNotifications = () => {
  const user = useAppSelector((state) => state.root.auth.user);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [GET_ALL_NOTIFICATIONS_QUERY_KEY, user?.sub],
    queryFn: () => getNotificationsByAdminId(user!.sub),
    enabled: !!user?.sub && user.role === 'SystemAdmin',
    refetchOnWindowFocus: false,
  });

  return { notifications: data || [], isLoading, isError, refetch };
};

