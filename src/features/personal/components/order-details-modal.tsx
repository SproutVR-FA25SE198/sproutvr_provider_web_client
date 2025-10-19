'use client';

import Loading from '@/common/components/loading';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/common/components/ui/dialog';
import { Separator } from '@/common/components/ui/separator';
import { OrderStatus } from '@/common/utils';
import { convertUtcDate } from '@/common/utils/convertUtcDate';

import { Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import useGetOrderById from '../hooks/useGetOrderById';

interface OrderDetailsModalProps {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// const order = mockOrderDetails[0];

export function OrderDetailsModal({ orderId, open, onOpenChange }: OrderDetailsModalProps) {
  const { data: order, isLoading } = useGetOrderById(orderId);
  // if (!orderId) return null;
  if (!isLoading && order)
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader className='sm:text-center'>
            <DialogTitle className='text-2xl'>Chi Tiết Đơn Hàng</DialogTitle>
            <DialogDescription>Mã đơn hàng: {order.id.toUpperCase()}</DialogDescription>
          </DialogHeader>

          <div className='space-y-6'>
            {/* Order Info */}
            <div className='grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg'>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Thời gian đặt hàng</p>
                <p className='font-medium'>{convertUtcDate(order.createdAtUtc).fullDateTime}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Trạng thái</p>
                <Badge variant='secondary'>{OrderStatus[order.status as keyof typeof OrderStatus]}</Badge>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Tổng tiền</p>
                <p className='text-lg font-bold text-secondary'>{order.totalMoneyAmount.toLocaleString('vi-VN')} VND</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Phương thức</p>
                <p className='font-medium'>{order.paymentMethod}</p>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className='font-semibold mb-4'>
                Sản phẩm đã mua <span className='text-muted-foreground'>({order.orderItems.length})</span>
              </h3>
              <div className='space-y-3 h-100  max-h-[30vh] overflow-y-auto'>
                {order.orderItems.map((item) => (
                  //onclick: to map details page
                  <div key={item.mapId} className='flex gap-4 p-3 border rounded-lg'>
                    <img
                      src={item.imageUrl || '/placeholder.svg'}
                      alt={item.mapName}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-1'>
                      <h4 className='font-semibold mb-1'>{item.mapName}</h4>
                      <Badge variant='secondary' className='mb-2'>
                        {item.subjectName}
                      </Badge>
                      <div className='flex items-center justify-between'>
                        <span className='font-semibold text-secondary'>{item.price.toLocaleString('vi-VN')} VND</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button variant='outline' className='flex-1 bg-transparent'>
                <Download className='w-4 h-4 mr-2' />
                Tải Hóa Đơn
              </Button>
              <Button asChild className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground'>
                <Link to='/personal?tab=library'>
                  <ExternalLink className='w-4 h-4 mr-2' />
                  Xem Trong Thư Viện
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
}
