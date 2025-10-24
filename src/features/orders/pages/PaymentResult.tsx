'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import { getCookie } from '@/common/utils';
import { convertUtcDate } from '@/common/utils/convertUtcDate';

import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Download, XCircle } from 'lucide-react';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

function PaymentStatusContent() {
  const isSuccess = true;

  const paymentData = getCookie('payment-data');

  const successConfig = {
    icon: CheckCircle2,
    iconColor: 'text-secondary',
    bgColor: 'bg-secondary/10',
    title: 'Thanh Toán Thành Công!',
    description: 'Đơn hàng của bạn đã được xác nhận. Các bản đồ VR đã có sẵn trong thư viện của bạn.',
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
      { label: 'Thử Lại', href: paymentData?.paymentUrl, icon: ArrowRight },
      { label: 'Liên Hệ Hỗ Trợ', href: '/contact', icon: ArrowRight, variant: 'outline' as const },
    ],
  };

  const config = isSuccess ? successConfig : failedConfig;
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

              {!isSuccess && (
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
                        {convertUtcDate(paymentData?.expiry).fullDateTime}
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}

              {isSuccess && (
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
                      <span className='font-medium'>#VR-2025-001234</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Ngày:</span>
                      <span className='font-medium'>{new Date().toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Số lượng sản phẩm:</span>
                      <span className='font-medium'>3 bản đồ VR</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Tổng tiền:</span>
                      <span className='font-semibold text-secondary'>630.000 VND</span>
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
