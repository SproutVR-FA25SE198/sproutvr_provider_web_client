'use client';

import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Separator } from '@/common/components/ui/separator';
import useScrollTop from '@/common/hooks/useScrollTop';
import { mapsWithSubjects } from '@/common/services/mockData';
import { Organization } from '@/common/types';
import { PAYMENT_METHODS } from '@/common/utils';

import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cartItems = mapsWithSubjects.slice(0, 3);

export default function CheckoutPage() {
  //   const navigate = useNavigate();

  const organization = {} as Organization;

  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS.BANK);
  const [formData, setFormData] = useState({
    organizationName: organization.name,
    representativeName: '',
    email: organization.email,
    phoneNumber: organization.phoneNumber,
    address: organization.address,
  });

  useScrollTop();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout submitted:', { formData, selectedPayment, total });
    // Redirect to payment status page
    // navigate.;
  };

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

        <form onSubmit={handleSubmit}>
          <div className='grid lg:grid-cols-3 gap-8  mb-12'>
            {/* Left - Checkout Form */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Organization Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Thông Tin Tổ Chức</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='organizationName'>Tên Tổ Chức *</Label>
                      <Input
                        id='organizationName'
                        placeholder='Trường THPT ABC'
                        readOnly
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='representativeName'>Tên Người Đại Diện *</Label>
                      <Input
                        id='representativeName'
                        placeholder='Nguyễn Văn A'
                        value={formData.representativeName}
                        onChange={(e) => setFormData({ ...formData, representativeName: e.target.value })}
                        required
                      />
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email *</Label>
                        <Input
                          id='email'
                          readOnly
                          type='email'
                          placeholder='contact@school.edu.vn'
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='phone'>Số Điện Thoại *</Label>
                        <Input
                          id='phone'
                          type='tel'
                          readOnly
                          placeholder='0123 456 789'
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='billingAddress'>Địa Chỉ Thanh Toán *</Label>
                      <Input
                        id='billingAddress'
                        readOnly
                        placeholder='123 Đường ABC, Quận XYZ, TP. HCM'
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Phương Thức Thanh Toán</CardTitle>
                  </CardHeader>
                  <CardContent className='grid md:grid-cols-3 gap-4'>
                    <button
                      type='button'
                      onClick={() => setSelectedPayment(PAYMENT_METHODS.BANK)}
                      className={`w-full p-4 border rounded-lg flex items-center gap-4 transition-all ${
                        selectedPayment === PAYMENT_METHODS.BANK
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === PAYMENT_METHODS.BANK ? 'border-secondary' : 'border-border'
                        }`}
                      >
                        {selectedPayment === PAYMENT_METHODS.BANK && (
                          <div className='w-3 h-3 rounded-full bg-secondary' />
                        )}
                      </div>
                      <PAYMENT_METHODS.BANK.icon className='w-6 h-6 text-secondary' />
                      <div className='flex-1 text-left'>
                        <p className='font-semibold'>{PAYMENT_METHODS.BANK.name}</p>
                      </div>
                    </button>
                    <button
                      type='button'
                      onClick={() => setSelectedPayment(PAYMENT_METHODS.CARD)}
                      className={`w-full p-4 border rounded-lg flex items-center gap-4 transition-all ${
                        selectedPayment === PAYMENT_METHODS.CARD
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === PAYMENT_METHODS.CARD ? 'border-secondary' : 'border-border'
                        }`}
                      >
                        {selectedPayment === PAYMENT_METHODS.CARD && (
                          <div className='w-3 h-3 rounded-full bg-secondary' />
                        )}
                      </div>
                      <PAYMENT_METHODS.CARD.icon className='w-6 h-6 text-secondary' />
                      <div className='flex-1 text-left'>
                        <p className='font-semibold'>{PAYMENT_METHODS.CARD.name}</p>
                      </div>
                    </button>

                    <button
                      type='button'
                      onClick={() => setSelectedPayment(PAYMENT_METHODS.VNPAY)}
                      className={`w-full p-4 border rounded-lg flex items-center gap-4 transition-all ${
                        selectedPayment === PAYMENT_METHODS.VNPAY
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === PAYMENT_METHODS.VNPAY ? 'border-secondary' : 'border-border'
                        }`}
                      >
                        {selectedPayment === PAYMENT_METHODS.VNPAY && (
                          <div className='w-3 h-3 rounded-full bg-secondary' />
                        )}
                      </div>
                      <PAYMENT_METHODS.VNPAY.icon className='w-6 h-6 text-secondary' />
                      <div className='flex-1 text-left'>
                        <p className='font-semibold'>{PAYMENT_METHODS.VNPAY.name}</p>
                      </div>
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='lg:col-span-1'
            >
              <Card className='sticky top-24'>
                <CardHeader>
                  <CardTitle>Đơn Hàng Của Bạn</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Cart Items */}
                  <div className='space-y-3'>
                    {cartItems.map((item) => (
                      <div key={item.id} className='flex gap-3'>
                        <img
                          src={item.imageUrl || '/placeholder.svg'}
                          alt={item.name}
                          className='w-16 h-16 object-cover rounded-md'
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-sm line-clamp-1'>{item.name}</p>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge variant='secondary' className='text-xs'>
                              {item.subject.name}
                            </Badge>
                          </div>
                        </div>
                        <p className='text-sm font-semibold text-secondary mt-1'>
                          {item.price.toLocaleString('vi-VN')} VND
                        </p>{' '}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Tạm tính</span>
                      <span className='font-medium'>{subtotal.toLocaleString('vi-VN')} VND</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Thuế (10%)</span>
                      <span className='font-medium'>{tax.toLocaleString('vi-VN')} VND</span>
                    </div>
                    <Separator />
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Tổng cộng</span>
                      <span className='text-xl font-bold text-secondary'>{total.toLocaleString('vi-VN')} VND</span>
                    </div>
                  </div>

                  <Button
                    type='submit'
                    className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    size='lg'
                  >
                    Xác Nhận Thanh Toán
                  </Button>

                  <p className='text-xs text-center text-muted-foreground'>
                    Bằng cách thanh toán, bạn đồng ý với{' '}
                    <Link to='#' className='text-secondary hover:underline'>
                      Điều khoản dịch vụ
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
