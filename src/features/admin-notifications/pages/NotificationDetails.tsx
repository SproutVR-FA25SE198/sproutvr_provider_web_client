'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { markAsRead, setNotifications } from '@/common/stores/notificationStore/notificationSlice';
import { fetchUnreadCountThunk } from '@/common/stores/notificationStore/notificationThunks';
import configs from '@/core/configs';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { getNotificationById, markNotificationAsRead } from '../services/notification.service';
import { useGetOrderByCode } from '../hooks/useGetOrderByCode';

import { ArrowLeft, Bell, Loader2, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ORDER_STATUS_LABELS } from '@/common/constants/order-status';

export default function NotificationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.root.auth.user);
  const notifications = useAppSelector((state) => state.root.notification.notifications);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);

  const notification = notifications.find((n: { id: string | undefined; }) => n.id === id);
  const [notificationData, setNotificationData] = useState(notification);
  const [isLoadingNotification, setIsLoadingNotification] = useState(false);
  const { data: order, isLoading: isLoadingOrder, isError: isErrorOrder } = useGetOrderByCode(orderCode);

  // Fetch notification from API if not found in store
  useEffect(() => {
    if (!notification && id) {
      setIsLoadingNotification(true);
      getNotificationById(id)
        .then((data) => {
          setNotificationData(data);
          // Add to store if not exists
          if (!notifications.find((n) => n.id === data.id)) {
            dispatch(setNotifications([...notifications, data]));
          }
        })
        .catch((error) => {
          console.error('Failed to fetch notification:', error);
        })
        .finally(() => {
          setIsLoadingNotification(false);
        });
    } else {
      setNotificationData(notification);
    }
  }, [id, notification, notifications, dispatch]);

  useEffect(() => {
    if (notificationData) {
      // Extract order code from title (format: "Đơn hàng mới #ORD{orderCode}")
      const titleMatch = notificationData.title.match(/#ORD(\d+)/i);
      if (titleMatch && titleMatch[1]) {
        setOrderCode(titleMatch[1]);
      }
    }
  }, [notificationData]);

  useEffect(() => {
    // Mark as read when viewing details
    if (notificationData && !notificationData.isRead && id && !isMarkingAsRead) {
      setIsMarkingAsRead(true);
      markNotificationAsRead(id)
        .then(() => {
          dispatch(markAsRead(id));
          setNotificationData({ ...notificationData, isRead: true });
          if (user?.sub) {
            dispatch(fetchUnreadCountThunk(user.sub));
          }
        })
        .catch((error) => {
          console.error('Failed to mark notification as read:', error);
        })
        .finally(() => {
          setIsMarkingAsRead(false);
        });
    }
  }, [notificationData, id, dispatch, user?.sub, isMarkingAsRead]);

  const handleViewOrderDetails = () => {
    if (order?.id) {
      navigate(configs.routes.adminOrderDetails.replace(':id', order.id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (isLoadingNotification) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <Loader2 className='w-8 h-8 animate-spin text-primary' />
          <span className='text-muted-foreground'>Đang tải thông báo...</span>
        </div>
      </div>
    );
  }

  if (!notificationData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-muted-foreground'>Không tìm thấy thông báo</p>
            <div className='flex justify-center mt-4'>
              <Button onClick={() => navigate(-1)} variant='outline'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Quay lại
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-[66.666%] mx-auto'>
          <div className='mb-6'>
            <Button onClick={() => navigate(-1)} variant='ghost' className='mb-4'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại
            </Button>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-primary/10'>
                    <Bell className='w-6 h-6 text-primary' />
                  </div>
                  <div className='flex-1'>
                    <h1 className='text-2xl font-bold text-foreground'>Chi tiết thông báo</h1>
                    <p className='text-sm text-muted-foreground mt-1'>{formatDate(notificationData.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-3 gap-6'>
            {/* Notification Information */}
            <Card className='col-span-2'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Bell className='w-5 h-5' />
                  Thông tin thông báo
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <p className='text-sm text-muted-foreground mb-1'>Tiêu đề</p>
                  <p className={`font-medium ${!notificationData.isRead ? 'font-bold' : ''}`}>
                    {notificationData.title}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground mb-1'>Nội dung</p>
                  <p className='text-sm whitespace-pre-wrap'>{notificationData.content}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground mb-1'>Trạng thái</p>
                  <p className='text-sm'>
                    {notificationData.isRead ? (
                      <span className='text-green-600 font-medium'>Đã đọc</span>
                    ) : (
                      <span className='text-blue-600 font-bold'>Chưa đọc</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Information (if OrderCreated) */}
            {notificationData.type === 'OrderCreated' && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Package className='w-5 h-5' />
                    Thông tin đơn hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {isLoadingOrder ? (
                    <div className='flex items-center gap-2 py-4'>
                      <Loader2 className='w-4 h-4 animate-spin text-primary' />
                      <span className='text-sm text-muted-foreground'>Đang tải thông tin đơn hàng...</span>
                    </div>
                  ) : isErrorOrder ? (
                    <div className='py-4'>
                      <p className='text-sm text-red-500 mb-4'>Không thể tải thông tin đơn hàng</p>
                      {orderCode && (
                        <Button onClick={() => navigate(configs.routes.adminOrders)} variant='outline' size='sm'>
                          Xem danh sách đơn hàng
                        </Button>
                      )}
                    </div>
                  ) : order ? (
                    <div className='space-y-4'>
                      <div>
                        <p className='text-sm text-muted-foreground mb-1'>Mã đơn hàng</p>
                        <p className='font-medium'>#{order.orderCode || order.id}</p>
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground mb-1'>Tổng tiền</p>
                        <p className='font-semibold text-secondary'>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            order.totalMoneyAmount || 0,
                          )}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground mb-1'>Số lượng sản phẩm</p>
                        <p className='font-medium'>{order.totalItems}</p>
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground mb-1'>Trạng thái</p>
                        <p className='font-medium'>{ORDER_STATUS_LABELS[order.status]}</p>
                      </div>
                      <Button onClick={handleViewOrderDetails} className='w-full' size='lg'>
                        <Package className='w-4 h-4 mr-2' />
                        Xem chi tiết đơn hàng
                      </Button>
                    </div>
                  ) : orderCode ? (
                    <div className='py-4'>
                      <p className='text-sm text-muted-foreground mb-4'>
                        Không tìm thấy đơn hàng với mã #{orderCode}
                      </p>
                      <Button onClick={() => navigate(configs.routes.adminOrders)} variant='outline' size='sm'>
                        Xem danh sách đơn hàng
                      </Button>
                    </div>
                  ) : (
                    <div className='py-4'>
                      <p className='text-sm text-muted-foreground'>Không thể xác định mã đơn hàng từ thông báo</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

