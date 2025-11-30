import { Button } from '@/common/components/ui/button';
import configs from '@/core/configs';
import { useGetNotifications } from '../hooks/useGetNotifications';

import { Bell, Package, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const navigate = useNavigate();
  const { notifications, isLoading } = useGetNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleNotificationClick = (notificationId: string) => {
    // Navigate to notification details page (don't mark as read yet)
    navigate(configs.routes.adminNotificationDetails.replace(':id', notificationId));
    onClose();
  };

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


  return (
    <div
      ref={dropdownRef}
      className='absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-[600px] overflow-hidden flex flex-col'
    >
      <div className='p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary to-secondary text-white'>
        <div className='flex items-center gap-2'>
          <Bell className='w-5 h-5' />
          <h3 className='font-semibold'>Thông báo</h3>
          {notifications.length > 0 && (
            <span className='bg-white/20 text-xs px-2 py-0.5 rounded-full'>
              {notifications.filter((n) => !n.isRead).length} chưa đọc
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => {
              navigate(configs.routes.adminNotifications);
              onClose();
            }}
            className='text-white hover:bg-white/20 text-xs'
          >
            Xem tất cả
          </Button>
          <Button variant='ghost' size='icon' onClick={onClose} className='text-white hover:bg-white/20 h-8 w-8'>
            <X className='w-4 h-4' />
          </Button>
        </div>
      </div>

      <div className='overflow-y-auto flex-1'>
        {isLoading ? (
          <div className='p-8 text-center text-muted-foreground'>Đang tải...</div>
        ) : notifications.length === 0 ? (
          <div className='p-8 text-center text-muted-foreground'>
            <Bell className='w-12 h-12 mx-auto mb-2 opacity-50' />
            <p>Không có thông báo nào</p>
          </div>
        ) : (
          <div className='divide-y'>
            {notifications.map((notification) => {
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors border-l-4 ${
                    !notification.isRead
                      ? 'bg-blue-50/50 border-l-primary font-semibold'
                      : 'bg-white border-l-transparent'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className='flex items-start gap-3'>
                    <div
                      className={`mt-1 p-2 rounded-full ${
                        notification.type === 'OrderCreated' ? 'bg-primary/10 text-primary' : 'bg-muted'
                      }`}
                    >
                      {notification.type === 'OrderCreated' ? (
                        <Package className='w-4 h-4' />
                      ) : (
                        <Bell className='w-4 h-4' />
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <h4
                          className={`text-sm ${
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
                        className={`text-xs mt-1 line-clamp-2 ${
                          !notification.isRead ? 'text-foreground font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {notification.content}
                      </p>
                      <p className='text-xs text-muted-foreground mt-2'>{formatDate(notification.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

