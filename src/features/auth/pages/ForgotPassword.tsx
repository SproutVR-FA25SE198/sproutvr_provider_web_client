'use client';

import { Alert, AlertDescription } from '@/common/components/ui/alert';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/common/components/ui/input-otp';
import { Label } from '@/common/components/ui/label';

import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ForgotPasswordFormData, forgotPasswordSchema } from '../components/schema';

import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log('Password reset requested for:', data.email);
      setEmail(data.email);
      setIsSubmitted(true);
      toast.success('Mã xác thực đã được gửi đến email của bạn!');
      reset();
    } catch (err) {
      toast.error('Gửi yêu cầu thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container pt-24 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to='/login'
              className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-6'
            >
              <ArrowLeft className='w-4 h-4' />
              Quay lại đăng nhập
            </Link>

            <Card>
              <CardHeader className='text-center'>
                <div className='w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Mail className='w-8 h-8 text-secondary' />
                </div>
                <CardTitle className='text-2xl'>Quên Mật Khẩu?</CardTitle>
                <CardDescription>
                  {isSubmitted ? 'Kiểm tra email của bạn' : 'Nhập email để nhận liên kết hoặc mã xác thực'}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='contact@school.edu.vn'
                        autoComplete='off'
                        {...register('email')}
                        className='mt-1.5'
                      />
                      {errors.email && <p className='text-sm text-destructive mt-1'>{errors.email.message}</p>}
                    </div>

                    <Button
                      type='submit'
                      className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                      size='lg'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi OTP'}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Alert className='bg-secondary/10 border-secondary/20'>
                      <CheckCircle2 className='w-5 my-auto h-5 text-secondary' />
                      <AlertDescription className='text-foreground'>
                        Chúng tôi đã gửi mã xác thực đến <strong>{email}</strong>.
                        <br />
                        Mã xác thực sẽ có hiệu lực trong 5 phút.
                      </AlertDescription>
                    </Alert>

                    <div className='mt-6 mx-auto w-max'>
                      <InputOTP
                        maxLength={6}
                        onComplete={(code) => {
                          console.log('OTP Entered:', code);
                          toast.info(`Mã OTP đã nhập: ${code}`);
                        }}
                        autoFocus
                      >
                        <InputOTPGroup className='text-secondary font-bold'>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className='text-secondary font-bold'>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className='mt-6 space-y-3'>
                      <p className='text-sm text-muted-foreground text-center'>Không nhận được mã xác thực?</p>
                      <Button variant='outline' className='w-full bg-transparent' onClick={() => setIsSubmitted(false)}>
                        Gửi Lại
                      </Button>
                    </div>
                  </motion.div>
                )}

                <p className='text-sm text-center text-muted-foreground mt-6'>
                  Cần trợ giúp?{' '}
                  <Link to='/contact' className='text-secondary hover:underline font-medium'>
                    Liên hệ hỗ trợ
                  </Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
