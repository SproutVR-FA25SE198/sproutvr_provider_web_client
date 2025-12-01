export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  organizationId?: string;
  adminId: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

