'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import configs from '@/core/configs';
import { useGetAllNotifications } from '../hooks/useGetAllNotifications';

import { ArrowLeft, Bell, Loader2, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationListPage() {
  const navigate = useNavigate();
  const { notifications, isLoading } = useGetAllNotifications();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else {
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    navigate(configs.routes.adminNotificationDetails.replace(':id', notificationId));
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <Button onClick={() => navigate(-1)} variant='ghost' className='mb-4'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Button>
          <div className='flex items-center gap-3'>
            <Bell className='w-8 h-8 text-primary' />
            <div>
              <h1 className='text-3xl font-bold text-primary'>Tất cả thông báo</h1>
              <p className='text-muted-foreground mt-1'>
                {notifications.length} thông báo ({notifications.filter((n) => !n.isRead).length} chưa đọc)
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='flex items-center gap-2'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
              <span className='text-muted-foreground'>Đang tải thông báo...</span>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <Card>
            <CardContent className='pt-6'>
              <div className='text-center py-12'>
                <Bell className='w-16 h-16 mx-auto mb-4 opacity-50 text-muted-foreground' />
                <p className='text-muted-foreground text-lg'>Không có thông báo nào</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='space-y-3'>
            {notifications.map((notification) => {
              return (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.isRead
                      ? 'border-l-4 border-l-primary bg-blue-50/50'
                      : 'border-l-4 border-l-transparent'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div
                        className={`mt-1 p-2 rounded-full ${
                          notification.type === 'OrderCreated' ? 'bg-primary/10 text-primary' : 'bg-muted'
                        }`}
                      >
                        {notification.type === 'OrderCreated' ? (
                          <Package className='w-5 h-5' />
                        ) : (
                          <Bell className='w-5 h-5' />
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2'>
                          <h4
                            className={`text-base ${
                              !notification.isRead ? 'font-bold text-primary' : 'font-medium text-foreground'
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <span className='flex-shrink-0 w-2.5 h-2.5 bg-primary rounded-full mt-1.5 animate-pulse' />
                          )}
                        </div>
                        <p
                          className={`text-sm mt-1 line-clamp-2 ${
                            !notification.isRead ? 'text-foreground font-medium' : 'text-muted-foreground'
                          }`}
                        >
                          {notification.content}
                        </p>
                        <div className='flex items-center justify-between mt-2'>
                          <p className='text-xs text-muted-foreground'>{formatDate(notification.createdAt)}</p>
                          {notification.isRead ? (
                            <span className='text-xs text-green-600 font-medium'>Đã đọc</span>
                          ) : (
                            <span className='text-xs text-blue-600 font-bold'>Chưa đọc</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

