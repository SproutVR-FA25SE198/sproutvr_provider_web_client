import Loading from '@/common/components/loading';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import useBaskets from '@/common/hooks/useBasket';
import useGetProfile from '@/common/hooks/useGetProfile';
import { PlaceOrderRequest } from '@/common/types';
import { PAYMENT_METHODS, setCookie } from '@/common/utils';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { CheckoutFormData, checkoutSchema } from '../components/schema';
import { checkout } from '../services/payment.service';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { useMutation } from '@tanstack/react-query';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fromBasket = location.state?.fromBasket;

    if (!fromBasket) {
      navigate('/basket', { replace: true });
    }
  }, [location.state, navigate]);

  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS.PAYOS.code);
  const { data: organization, isLoading: isGettingOrganization } = useGetProfile();
  const { basket, basketTotal: subtotal } = useBaskets();
  const { mutate: placeOrder, isPending: isPlacingOrder } = useMutation({
    mutationFn: (order: PlaceOrderRequest) => checkout(order),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      organizationName: 'Trường THPT ABC',
      representativeName: '',
      representativePhone: '',
      email: 'contact@school.edu.vn',
      phoneNumber: '0123456789',
      address: '123 Đường ABC, Quận XYZ, TP. HCM',
      paymentMethod: selectedPayment,
    },
  });

  useEffect(() => {
    if (organization) {
      // Prefill organization info if available
      register('organizationName').onChange({ target: { value: organization.name } });
      register('email').onChange({ target: { value: organization.email } });
      register('phoneNumber').onChange({ target: { value: organization.phoneNumber } });
      register('address').onChange({ target: { value: organization.address } });
    }
  }, [organization, register]);

  const onSubmit = (data: CheckoutFormData) => {
    const checkoutData = {
      organizationId: basket.organizationId,
      basket,
      representativeName: data.representativeName,
      representativePhone: data.representativePhone,
      paymentMethod: selectedPayment,
    } as PlaceOrderRequest;
    placeOrder(checkoutData, {
      onSuccess: (result) => {
        const expiry = new Date(Date.now() + 15 * 60 * 1000);
        setCookie('payment-data', { ...result, expiry }, expiry);
        window.location.href = result.paymentUrl;
      },
    });
  };

  const isLoading = isGettingOrganization || isPlacingOrder;

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <div className='bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-4 pt-4 text-center'
        >
          <h1 className='text-3xl md:text-4xl font-bold text-primary mb-2'>Thanh Toán</h1>
          <p className='text-muted-foreground'>Hoàn tất đơn hàng của bạn</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid lg:grid-cols-3 gap-8 mb-12'>
            {/* Left - Form */}
            <div className='lg:col-span-2 space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Thông Tin Tổ Chức</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <Label>Tên Tổ Chức *</Label>
                    <Input className='bg-accent' {...register('organizationName')} readOnly />
                    {errors.organizationName && (
                      <p className='text-red-500 text-sm'>{errors.organizationName.message}</p>
                    )}
                  </div>

                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <Label>Email *</Label>
                      <Input className='bg-accent' {...register('email')} readOnly />
                      {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label>Số Điện Thoại *</Label>
                      <Input className='bg-accent' {...register('phoneNumber')} readOnly />
                      {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label>Địa Chỉ *</Label>
                    <Input className='bg-accent' {...register('address')} readOnly />
                    {errors.address && <p className='text-red-500 text-sm'>{errors.address.message}</p>}
                  </div>

                  <hr className='my-8' />

                  <div className='grid md:grid-cols-2 mb-5 gap-4'>
                    <div>
                      <Label>Tên Người Đại Diện *</Label>
                      <Input {...register('representativeName')} autoFocus />
                      {errors.representativeName && (
                        <p className='text-red-500 text-sm'>{errors.representativeName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>SĐT Người Đại Diện *</Label>
                      <Input {...register('representativePhone')} />
                      {errors.representativePhone && (
                        <p className='text-red-500 text-sm'>{errors.representativePhone.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment */}
              <Card>
                <CardHeader>
                  <CardTitle>Phương Thức Thanh Toán</CardTitle>
                </CardHeader>
                <CardContent className='grid md:grid-cols-3 gap-4'>
                  {Object.values(PAYMENT_METHODS).map((method) => (
                    <button
                      key={method.code}
                      type='button'
                      onClick={() => setSelectedPayment(method.code)}
                      className={`w-full p-4 border rounded-lg flex items-center gap-4 transition-all ${
                        selectedPayment === method.code
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.code ? 'border-secondary' : 'border-border'
                        }`}
                      >
                        {selectedPayment === method.code && <div className='w-3 h-3 rounded-full bg-secondary' />}
                      </div>
                      <method.icon className='w-6 h-6 text-secondary' />
                      <p className='font-semibold'>{method.name}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right - Summary */}
            <motion.div className='lg:col-span-1'>
              <Card className='sticky top-24'>
                <CardHeader>
                  <CardTitle>Đơn Hàng Của Bạn</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {basket.basketItems.map((item) => (
                    <div key={item.mapId} className='flex gap-3'>
                      <img src={item.imageUrl} alt={item.mapName} className='w-16 h-16 object-cover rounded-md' />
                      <div className='flex-1'>
                        <p className='font-medium text-sm'>{item.mapName}</p>
                        <Badge variant='secondary' className='text-xs'>
                          {item.subjectName || 'Chưa xác định'}
                        </Badge>
                      </div>
                      <p className='text-sm font-semibold text-secondary'>{item.price.toLocaleString('vi-VN')} VND</p>
                    </div>
                  ))}
                  <Separator />
                  <div className='flex justify-between text-sm'>
                    <span>Tổng cộng</span>
                    <span className='text-xl font-bold text-secondary'>{subtotal.toLocaleString('vi-VN')} VND</span>
                  </div>
                  <Button type='submit' className='w-full bg-secondary hover:bg-secondary/90 text-white'>
                    Xác Nhận Thanh Toán
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
