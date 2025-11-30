import http from '@/common/utils/http';

import { Notification } from '@/common/types/notification.type';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getNotificationsByAdminId = async (adminId: string): Promise<Notification[]> => {
  const response = await http.get<Notification[]>(`${BASE_URL}/notifications/admin/${adminId}`);
  return response.data;
};

export const getUnreadNotificationsByAdminId = async (adminId: string): Promise<Notification[]> => {
  const response = await http.get<Notification[]>(`${BASE_URL}/notifications/admin/${adminId}/unread`);
  return response.data;
};

export const countUnreadNotificationsByAdminId = async (adminId: string): Promise<number> => {
  const response = await http.get<{ count: number }>(
    `${BASE_URL}/notifications/admin/${adminId}/unread/count`,
  );
  return response.data.count;
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await http.put(`${BASE_URL}/notifications/${notificationId}/read`);
};

export const getNotificationById = async (notificationId: string): Promise<Notification> => {
  const response = await http.get<Notification>(`${BASE_URL}/notifications/${notificationId}`);
  return response.data;
};

