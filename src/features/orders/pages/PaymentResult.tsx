'use client';

import Loading from '@/common/components/loading';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import useBaskets from '@/common/hooks/useBasket';
import { getCookie } from '@/common/utils';
import { convertUtcDate } from '@/common/utils/convertUtcDate';
import useGetOrderById from '@/features/personal/hooks/useGetOrderById';

import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Download, XCircle } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { cancelPayment, checkPaymentStatus } from '../services/payment.service';

import { useMutation } from '@tanstack/react-query';

function PaymentStatusContent() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | 'cancelled'>('pending');
  const [orderId, setOrderId] = useState<string>('');
  const { clearBasket } = useBaskets();
  const [isInitialized, setIsInitialized] = useState(false);

  const paymentData = getCookie('payment-data');

  // Mutations
  const { mutate: cancelPaymentMutation } = useMutation({
    mutationFn: (orderCode: string | number) => cancelPayment(orderCode),
  });

  const { mutate: checkStatusMutation } = useMutation({
    mutationFn: (orderId: string) => checkPaymentStatus(orderId),
  });

  // Get order details only after we have orderId and successful payment
  const { data: orderDetails, isLoading: isLoadingOrder } = useGetOrderById(orderId);

  useEffect(() => {
    // Prevent multiple calls
    if (isInitialized) return;

    // Get orderId from URL params or cookie
    const orderIdFromParams = searchParams.get('orderId') || searchParams.get('id');
    const orderCodeFromParams = searchParams.get('orderCode');
    const statusFromParams = searchParams.get('status')?.toUpperCase();
    const cancelFromParams = searchParams.get('cancel') === 'true';
    const orderIdFromCookie = paymentData?.orderId;
    const currentOrderId = orderIdFromParams || orderIdFromCookie;

    if (!currentOrderId) {
      setPaymentStatus('failed');
      setIsInitialized(true);
      return;
    }

    setOrderId(currentOrderId);

    // Check status from URL params first (if payment gateway already returned status)
    if (statusFromParams) {
      if (statusFromParams === 'PAID' || statusFromParams === 'COMPLETED' || statusFromParams === 'SUCCESS') {
        setPaymentStatus('success');
        clearBasket();
        setIsInitialized(true);
        return;
      } else if (statusFromParams === 'CANCELLED' || statusFromParams === 'CANCELED') {
        // Call cancel API
        const orderCodeForCancel = orderCodeFromParams || currentOrderId;
        cancelPaymentMutation(orderCodeForCancel, {
          onSuccess: () => {
            setPaymentStatus('cancelled');
            setIsInitialized(true);
          },
          onError: () => {
            setPaymentStatus('cancelled');
            setIsInitialized(true);
          },
        });
        return;
      }
    }

    // Check if payment was cancelled via cancel param
    if (cancelFromParams) {
      // If we have orderCode in params, use it directly
      if (orderCodeFromParams) {
        cancelPaymentMutation(orderCodeFromParams, {
          onSuccess: () => {
            setPaymentStatus('cancelled');
            setIsInitialized(true);
          },
          onError: () => {
            setPaymentStatus('cancelled');
            setIsInitialized(true);
          },
        });
      } else {
        // Otherwise, get order details first to get orderCode
        checkStatusMutation(currentOrderId, {
          onSuccess: (response) => {
            const orderCode = response.orderCode || currentOrderId;
            cancelPaymentMutation(orderCode, {
              onSuccess: () => {
                setPaymentStatus('cancelled');
                setIsInitialized(true);
              },
              onError: () => {
                setPaymentStatus('cancelled');
                setIsInitialized(true);
              },
            });
          },
          onError: () => {
            setPaymentStatus('cancelled');
            setIsInitialized(true);
          },
        });
      }
    } else {
      // No status in URL, need to check payment status via API
      checkStatusMutation(currentOrderId, {
        onSuccess: (response) => {
          // Check status field from API response
          const status = response.status?.toUpperCase();
          if (status === 'PAID' || status === 'COMPLETED' || status === 'SUCCESS') {
            setPaymentStatus('success');
          } else if (status === 'CANCELLED' || status === 'CANCELED') {
            setPaymentStatus('cancelled');
          } else if (status === 'PENDING' || status === 'PENDING_BUNDLE') {
            // If still pending, could be waiting for payment confirmation
            setPaymentStatus('failed');
          } else {
            setPaymentStatus('failed');
          }
          setIsInitialized(true);
        },
        onError: () => {
          setPaymentStatus('failed');
          setIsInitialized(true);
        },
      });
    }
  }, []);

  if (paymentStatus === 'pending' || (paymentStatus === 'success' && isLoadingOrder)) {
    return <Loading isLoading />;
  }

  const isSuccess = paymentStatus === 'success';

  const successConfig = {
    icon: CheckCircle2,
    iconColor: 'text-secondary',
    bgColor: 'bg-secondary/10',
    title: 'Thanh Toán Thành Công!',
    description: 'Đơn hàng của bạn đã được xác nhận. Các bản đồ VR đã được thêm thư viện của bạn.',
    actions: [
      { label: 'Xem Thư Viện', href: '/personal/library', icon: ArrowRight },
      { label: 'Tải Hóa Đơn', href: '#', icon: Download, variant: 'outline' as const },
    ],
  };

  const failedConfig = {
    icon: XCircle,
    iconColor: 'text-destructive',
    bgColor: 'bg-destructive/10',
    title: 'Thanh Toán Thất Bại',
    description: 'Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
    actions: [
      { label: 'Thử Lại', href: paymentData?.paymentUrl || '/basket', icon: ArrowRight },
      { label: 'Liên Hệ Hỗ Trợ', href: '/contact', icon: ArrowRight, variant: 'outline' as const },
    ],
  };

  const cancelledConfig = {
    icon: AlertCircle,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    title: 'Thanh Toán Đã Hủy',
    description: 'Bạn đã hủy thanh toán. Đơn hàng của bạn đã được hủy bỏ.',
    actions: [
      { label: 'Quay Về Giỏ Hàng', href: '/basket', icon: ArrowRight },
      { label: 'Tiếp Tục Mua Sắm', href: '/maps', icon: ArrowRight, variant: 'outline' as const },
    ],
  };

  const config =
    paymentStatus === 'success' ? successConfig : paymentStatus === 'cancelled' ? cancelledConfig : failedConfig;
  const Icon = config.icon;

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-14'>
      <div className='max-w-2xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className='text-center'>
            <CardContent className='pt-12 pb-8'>
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <Icon className={`w-12 h-12 ${config.iconColor}`} />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-3xl md:text-4xl font-bold text-primary mb-4'
              >
                {config.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='text-lg text-muted-foreground mb-8 max-w-md mx-auto'
              >
                {config.description}
              </motion.p>

              {paymentStatus === 'failed' && paymentData?.expiry && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-8 flex gap-4'
                >
                  <AlertCircle className='w-5 h-5 text-destructive flex-shrink-0 mt-0.5' />
                  <div className='text-left'>
                    <p className='font-semibold text-destructive mb-1'>Hạn Chót Thanh Toán Lại</p>
                    <p className='text-sm text-muted-foreground'>
                      Bạn có thể thực hiện thanh toán lại cho đơn hàng này cho đến{' '}
                      <span className='font-semibold text-foreground'>
                        {convertUtcDate(paymentData.expiry).fullDateTime}
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}

              {isSuccess && orderDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='bg-muted/50 rounded-lg p-6 mb-8 text-left'
                >
                  <h3 className='font-semibold mb-4'>Chi Tiết Đơn Hàng</h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Mã đơn hàng:</span>
                      <span className='font-medium'>#{orderDetails.id}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Ngày:</span>
                      <span className='font-medium'>
                        {orderDetails.createdAtUtc
                          ? new Date(orderDetails.createdAtUtc).toLocaleDateString('vi-VN')
                          : new Date().toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Số lượng sản phẩm:</span>
                      <span className='font-medium'>
                        {orderDetails.orderItems?.length || orderDetails.totalItems || 0} bản đồ VR
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Tổng tiền:</span>
                      <span className='font-semibold text-secondary'>
                        {orderDetails.totalMoneyAmount?.toLocaleString('vi-VN') || '0'} VND
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Trạng thái:</span>
                      <span className='font-medium text-secondary'>Đã thanh toán</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='flex flex-col sm:flex-row gap-3 justify-center'
              >
                {config.actions.map((action, index) => (
                  <Button
                    key={index}
                    asChild
                    variant={action.variant || 'default'}
                    size='lg'
                    className={!action.variant ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''}
                  >
                    <Link to={action.href}>
                      {action.label}
                      <action.icon className='w-4 h-4 ml-2' />
                    </Link>
                  </Button>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatusContent />
    </Suspense>
  );
}
