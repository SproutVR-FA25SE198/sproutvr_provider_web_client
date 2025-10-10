'use client';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import { mapsWithSubjects } from '@/common/services/mockData';
import { MapWithSubject } from '@/common/types';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import MapBasketCard from '../components/map-basket-card';

export default function BasketPage() {
  const [cartItems, setCartItems] = useState<MapWithSubject[]>(mapsWithSubjects.slice(0, 5));

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className='bg-background max-h-screen flex flex-col'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-6 text-center'
        >
          <h1 className='text-3xl md:text-4xl font-bold text-primary my-4'>Giỏ hàng của bạn</h1>
          <p className='text-muted-foreground'>{cartItems.length} sản phẩm trong giỏ hàng</p>
        </motion.div>

        <div className='grid lg:grid-cols-3 gap-6 flex-1 overflow-hidden'>
          {/* Left - Cart Items (Scrollable) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='lg:col-span-2 flex flex-col overflow-hidden'
          >
            <Card className='flex-1 flex flex-col max-h-120'>
              <CardContent className='pt-6 flex-1 overflow-y-auto'>
                {cartItems.length === 0 ? (
                  <div className='text-center py-12'>
                    <ShoppingBag className='w-16 h-16 mx-auto text-muted-foreground mb-4' />
                    <h3 className='text-xl font-semibold mb-2'>Giỏ hàng trống</h3>
                    <p className='text-muted-foreground mb-6'>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                    <Button asChild>
                      <Link to='/catalog'>Khám phá Catalog</Link>
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {cartItems.map((item, index) => (
                      <MapBasketCard key={item.id} item={item} index={index} removeItem={removeItem} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right - Order Summary (Fixed) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='lg:col-span-1'
          >
            <Card className='top-15'>
              <CardContent className='pt-6'>
                <h2 className='text-xl font-bold mb-4'>Tóm tắt đơn hàng</h2>

                <div className='space-y-3 mb-6'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Tạm tính</span>
                    <span className='font-medium'>{subtotal.toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Thuế (10%)</span>
                    <span className='font-medium'>{tax.toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className='border-t pt-3 flex justify-between'>
                    <span className='font-semibold'>Tổng cộng</span>
                    <span className='text-xl font-bold text-secondary'>{total.toLocaleString('vi-VN')} VND</span>
                  </div>
                </div>

                <Button
                  className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  size='lg'
                  disabled={cartItems.length === 0}
                >
                  <Link to='/checkout'>Tiến hành thanh toán</Link>
                </Button>

                <Button variant='ghost' className='w-full mt-3' asChild>
                  <Link to='/catalog'>Tiếp tục mua sắm</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
