'use client';

import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';

import { submitOrganizationRegisterRequest } from '@/features/landing/services/organization-register.service';

import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { RegisterFormData, registerSchema } from '../../data/register-schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

interface RegisterFormProps {
  title: string;
  subtitle: string;
  submitText: string;
  disclaimer: string;
}

export function RegisterForm({ title, subtitle, submitText, disclaimer }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur', // validate on blur or submit
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitOrganizationRegisterRequest,
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await mutateAsync({
        OrganizationName: data.orgName.trim(),
        Address: data.address.trim(),
        ContactPhone: data.phone.trim(),
        ContactEmail: data.email.trim(),
      });
      toast.success('Yêu cầu đăng ký của bạn đã được gửi! Hãy kiểm tra email của bạn để xác thực!');
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.message;
        console.log("Log from submit form", error);
        toast.error(message || 'Yêu cầu đăng ký thất bại. Vui lòng thử lại sau.');
        return;
      }
      toast.error('Yêu cầu đăng ký thất bại. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className='bg-card border border-border rounded-2xl p-8 shadow-lg'>
      <h3 className='text-2xl font-bold text-foreground mb-2'>{title}</h3>
      <p className='text-muted-foreground mb-6'>{subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Tên tổ chức */}
        <div>
          <Label htmlFor='orgName'>Tên tổ chức *</Label>
          <Input id='orgName' placeholder='Nhập tên tổ chức' {...register('orgName')} className='mt-1.5' />
          {errors.orgName && <p className='text-sm text-destructive mt-1'>{errors.orgName.message}</p>}
        </div>

        {/* Địa chỉ */}
        <div>
          <Label htmlFor='address'>Địa chỉ *</Label>
          <Input id='address' placeholder='Nhập địa chỉ tổ chức' {...register('address')} className='mt-1.5' />
          {errors.address && <p className='text-sm text-destructive mt-1'>{errors.address.message}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <Label htmlFor='phone'>Số điện thoại *</Label>
          <Input id='phone' placeholder='Nhập số điện thoại' {...register('phone')} className='mt-1.5' />
          {errors.phone && <p className='text-sm text-destructive mt-1'>{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor='email'>Email *</Label>
          <Input id='email' placeholder='Nhập email' {...register('email')} className='mt-1.5' />
          {errors.email && <p className='text-sm text-destructive mt-1'>{errors.email.message}</p>}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type='submit'
            size='lg'
            disabled={isSubmitting || isPending}
            className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group relative overflow-hidden shadow-lg hover:shadow-secondary/50 transition-shadow'
          >
            <motion.span
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className='relative z-10 flex items-center justify-center'>
              {isSubmitting || isPending ? (
                <Loader2 className='animate-spin w-5 h-5' />
              ) : (
                <>
                  {submitText}
                  <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </>
              )}
            </span>
          </Button>
        </motion.div>

        <p className='text-xs text-muted-foreground text-center'>{disclaimer}</p>
      </form>
    </div>
  );
}
