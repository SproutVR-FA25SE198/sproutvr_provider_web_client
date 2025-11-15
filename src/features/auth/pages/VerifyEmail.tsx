'use client';

import Loading from '@/common/components/loading';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Mail, XCircle } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { verifyEmail, VerifyEmailResponse } from '../services/verify-email.service';

import { useMutation } from '@tanstack/react-query';

function VerifyEmailContent() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [forceShowUI, setForceShowUI] = useState(false); // Force show UI after timeout
  const hasVerifiedRef = useRef(false); // Prevent multiple API calls in StrictMode
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null); // Track when API call started

  const token = searchParams.get('token');
  const organizationRegisterRequestId = searchParams.get('requestId');

  const { mutate: verifyEmailMutation, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data: VerifyEmailResponse) => {
      // Only update if still pending (prevent race condition with second call)
      setVerificationStatus((prevStatus) => {
        if (prevStatus === 'pending') {
          if (data.success) {
            return 'success';
          } else {
            setErrorMessage(data.message || 'Xác thực không thành công');
            return 'failed';
          }
        }
        return prevStatus; // Keep current status if already set
      });
    },
    onError: (error: any) => {
      // Only set error if still pending (prevent overwriting success)
      setVerificationStatus((prevStatus) => {
        if (prevStatus === 'pending') {
          const message =
            (typeof error.response?.data === 'string' && error.response.data) ||
            (error.response?.data as { message?: string })?.message ||
            'Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại sau.';
          setErrorMessage(message);
          toast.error(message);
          return 'error';
        }
        return prevStatus; // Keep current status if already set (e.g., success)
      });
    },
  });

  useEffect(() => {
    // Prevent multiple calls in StrictMode
    if (hasVerifiedRef.current) {
      return;
    }

    if (!token || !organizationRegisterRequestId) {
      setVerificationStatus('error');
      setErrorMessage('Thiếu thông tin xác thực. Vui lòng kiểm tra lại link trong email.');
      hasVerifiedRef.current = true; // Mark as processed even for error case
      return;
    }

    hasVerifiedRef.current = true;
    startTimeRef.current = Date.now();
    verifyEmailMutation({ token, organizationRegisterRequestId });

    // Safety timeout: force show UI after 15 seconds if still stuck
    timeoutRef.current = setTimeout(() => {
      // Check elapsed time instead of status (status might be stale in closure)
      const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
      if (elapsed >= 15000) {
        setForceShowUI(true);
        setVerificationStatus((prev) => {
          // Only set error if still pending
          if (prev === 'pending') {
            setErrorMessage('Thời gian xác thực quá lâu. Vui lòng thử lại sau.');
            return 'error';
          }
          return prev;
        });
      }
    }, 15000); // 15 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, organizationRegisterRequestId]); // Include dependencies to ensure it runs when params are available

  // Show loading ONLY when:
  // 1. API call is actually pending (isPending = true)
  // 2. Status is still pending (no result yet)
  // 3. Not forcing UI to show
  // Once we have a result (status !== 'pending') or forceShowUI, always show UI
  if (isPending === true && verificationStatus === 'pending' && !forceShowUI) {
    return <Loading isLoading message='Đang xác thực email...' />;
  }

  // If we get here, we should show UI (either has result or not pending anymore)
  // Fallback: if somehow still pending but not actually pending, treat as error
  const displayStatus = verificationStatus === 'pending' ? 'error' : verificationStatus;
  const displayErrorMessage =
    displayStatus === 'error' && !errorMessage
      ? 'Không thể xác thực email. Vui lòng thử lại sau.'
      : errorMessage;

  const isSuccess = displayStatus === 'success';

  const successConfig = {
    icon: CheckCircle2,
    iconColor: 'text-secondary',
    bgColor: 'bg-secondary/10',
    title: 'Xác Thực Email Thành Công!',
    description:
      'Email của bạn đã được xác thực thành công. Yêu cầu đăng ký tổ chức của bạn đã được gửi đến hệ thống và đang chờ quản trị viên xem xét.',
    additionalInfo:
      'Chúng tôi sẽ liên hệ với bạn qua email đã đăng ký sau khi hoàn tất quá trình duyệt. Vui lòng kiểm tra hộp thư thường xuyên.',
  };

  const failedConfig = {
    icon: XCircle,
    iconColor: 'text-destructive',
    bgColor: 'bg-destructive/10',
    title: 'Xác Thực Email Thất Bại',
    description:
      'Không thể xác thực email của bạn. Link xác thực có thể đã hết hạn hoặc không hợp lệ.',
    additionalInfo:
      'Nếu bạn cho rằng đây là sự nhầm lẫn, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi để được hỗ trợ.',
  };

  const errorConfig = {
    icon: AlertCircle,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    title: 'Đã Xảy Ra Lỗi',
    description: displayErrorMessage || 'Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại sau.',
    additionalInfo: 'Vui lòng kiểm tra lại link trong email hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.',
  };

  const config = isSuccess ? successConfig : displayStatus === 'failed' ? failedConfig : errorConfig;
  const Icon = config.icon;

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-14 min-h-screen'>
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
                className='text-lg text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed'
              >
                {config.description}
              </motion.p>

              {/* Additional Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${isSuccess ? 'bg-secondary/10 border-secondary/30' : 'bg-orange-500/10 border-orange-500/30'
                  } border rounded-lg p-6 mb-8 flex gap-4 text-left`}
              >
                <Mail
                  className={`w-5 h-5 ${isSuccess ? 'text-secondary' : 'text-orange-500'
                    } flex-shrink-0 mt-0.5`}
                />
                <div>
                  <p
                    className={`font-semibold mb-1 ${isSuccess ? 'text-secondary' : 'text-orange-600 dark:text-orange-400'
                      }`}
                  >
                    {isSuccess ? 'Bước Tiếp Theo' : 'Hỗ Trợ'}
                  </p>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{config.additionalInfo}</p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='flex flex-col sm:flex-row gap-3 justify-center'
              >
                <Button
                  asChild
                  size='lg'
                  className={isSuccess ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''}
                >
                  <Link to='/'>
                    {isSuccess ? 'Về Trang Chủ' : 'Thử Lại'}
                  </Link>
                </Button>
                {!isSuccess && (
                  <Button asChild variant='outline' size='lg' className='bg-transparent'>
                    <Link to='/'>Về Trang Chủ</Link>
                  </Button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading isLoading message='Đang tải...' />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

