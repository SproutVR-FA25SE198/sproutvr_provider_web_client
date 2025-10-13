'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';

import { motion } from 'framer-motion';
import { BookOpen, Eye, EyeClosed, GraduationCap, TrendingUp, Users } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Handle login
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* <main className='pt-24 pb-16'> */}
      <div className='container mx-auto pt-14  px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto'>
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='space-y-8'
          >
            <div>
              <h1 className='text-4xl md:text-5xl font-bold text-primary mb-4 text-balance'>Chào Mừng Trở Lại</h1>
              <p className='text-lg text-muted-foreground text-pretty'>
                Đăng nhập để tiếp tục hành trình giáo dục VR của bạn
              </p>
            </div>

            <div className='space-y-6'>
              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center'>
                  <GraduationCap className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Trải Nghiệm Học Tập Tương Tác</h3>
                  <p className='text-muted-foreground'>Khám phá hàng trăm bài học VR được thiết kế chuyên nghiệp</p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center'>
                  <BookOpen className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Thư Viện Nội Dung Phong Phú</h3>
                  <p className='text-muted-foreground'>Truy cập catalog đầy đủ với nội dung cập nhật liên tục</p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center'>
                  <Users className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Quản Lý Lớp Học Dễ Dàng</h3>
                  <p className='text-muted-foreground'>Theo dõi tiến độ học tập và quản lý học sinh hiệu quả</p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center'>
                  <TrendingUp className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Báo Cáo Chi Tiết</h3>
                  <p className='text-muted-foreground'>Phân tích dữ liệu học tập và đánh giá kết quả</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
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
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='contact@school.edu.vn'
                      value={formData.email}
                      onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='password'>Mật Khẩu</Label>
                      <Link to='/forgot-password' className='text-sm text-secondary hover:underline'>
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <div className='relative'>
                      <Input
                        id='password'
                        placeholder='•••••••••'
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                        required
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
                  </div>

                  <Button
                    type='submit'
                    className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    size='lg'
                  >
                    Đăng Nhập
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      {/* </main> */}
    </div>
  );
}
