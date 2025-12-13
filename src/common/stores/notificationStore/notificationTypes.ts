export interface Notification {
  id: string;
  title: string;
  content: string;
  organizationId?: string;
  adminId: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

