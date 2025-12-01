import {
  countUnreadNotificationsByAdminId,
  getUnreadNotificationsByAdminId,
  markNotificationAsRead,
} from '@/features/admin-notifications/services/notification.service';
import { setNotifications, setUnreadCount } from './notificationSlice';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUnreadNotificationsThunk = createAsyncThunk(
  'notification/fetchUnread',
  async (adminId: string, { dispatch, rejectWithValue }) => {
    try {
      const notifications = await getUnreadNotificationsByAdminId(adminId);
      dispatch(setNotifications(notifications));
      return notifications;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
    }
  },
);

export const fetchUnreadCountThunk = createAsyncThunk(
  'notification/fetchUnreadCount',
  async (adminId: string, { dispatch, rejectWithValue }) => {
    try {
      const count = await countUnreadNotificationsByAdminId(adminId);
      dispatch(setUnreadCount(count));
      return count;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch unread count');
    }
  },
);

export const markNotificationAsReadThunk = createAsyncThunk(
  'notification/markAsRead',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await markNotificationAsRead(notificationId);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
    }
  },
);

