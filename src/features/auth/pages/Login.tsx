'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Spinner } from '@/common/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';

import { motion } from 'framer-motion';
import { BookOpen, Eye, EyeClosed, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginThunk } from '../authThunks';
import { LoginFormData, loginSchema } from '../components/schema';

import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth.auth);

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(result)) {
      toast.success('Đăng nhập thành công!');
    } else {
      toast.error(result.payload as string);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto pt-14 px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto'>
          {/* Left side info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='space-y-8'
          >
            <div>
              <h1 className='text-4xl md:text-5xl font-bold text-primary mb-4'>Chào Mừng Trở Lại</h1>
              <p className='text-lg text-muted-foreground'>Đăng nhập để tiếp tục hành trình giáo dục VR của bạn</p>
            </div>

            <div className='space-y-6'>
              {[
                {
                  icon: GraduationCap,
                  title: 'Trải Nghiệm Học Tập Tương Tác',
                  desc: 'Khám phá hàng trăm bài học VR được thiết kế chuyên nghiệp',
                },
                {
                  icon: BookOpen,
                  title: 'Thư Viện Nội Dung Phong Phú',
                  desc: 'Truy cập catalog đầy đủ với nội dung cập nhật liên tục',
                },
                {
                  icon: Users,
                  title: 'Quản Lý Lớp Học Dễ Dàng',
                  desc: 'Theo dõi tiến độ học tập và quản lý học sinh hiệu quả',
                },
                {
                  icon: TrendingUp,
                  title: 'Báo Cáo Chi Tiết',
                  desc: 'Phân tích dữ liệu học tập và đánh giá kết quả',
                },
              ].map((item, i) => (
                <div key={i} className='flex gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center'>
                    <item.icon className='w-6 h-6 text-secondary' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
                    <p className='text-muted-foreground'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side login form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>Đăng Nhập</CardTitle>
                <CardDescription>Nhập thông tin đăng nhập của bạn để tiếp tục</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  {/* Email */}
                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='contact@school.edu.vn'
                      {...register('email')}
                      className='mt-1.5'
                    />
                    {errors.email && <p className='text-sm text-destructive mt-1'>{errors.email.message}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='password'>Mật Khẩu</Label>
                      <Link to='/forgot-password' className='text-sm text-secondary hover:underline'>
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <div className='relative mt-1.5'>
                      <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='••••••••'
                        autoComplete='off'
                        {...register('password')}
                      />
                      {showPassword ? (
                        <Eye
                          className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer'
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeClosed
                          className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer'
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {errors.password && <p className='text-sm text-destructive mt-1'>{errors.password.message}</p>}
                  </div>
                  {error && <p className='text-red-500'>{error}</p>}

                  <Button
                    type='submit'
                    className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    size='lg'
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <div className='flex items-center gap-2'>
                          <Spinner className='h-5 w-5 text-white' />
                        </div>
                      </>
                    ) : (
                      'Đăng Nhập'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
