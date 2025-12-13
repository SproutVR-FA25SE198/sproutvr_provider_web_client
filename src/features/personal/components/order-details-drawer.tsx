'use client';

import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/common/components/ui/drawer';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Separator } from '@/common/components/ui/separator';
import { ORDER_STATUS_BADGE, OrderStatus } from '@/common/utils';
import { convertUtcDate } from '@/common/utils/convertUtcDate';

import { Check, Copy, Download, ExternalLink, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import useGetOrderById from '../hooks/useGetOrderById';

import ActivationKeyInstruction from './activation-key-instruction';

interface OrderDetailsModalProps {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDrawer({ orderId, open, onOpenChange }: OrderDetailsModalProps) {
  const { data: order, isLoading } = useGetOrderById(orderId);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const copyActivationKey = () => {
    if (order?.activationKey) {
      navigator.clipboard.writeText(order.activationKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  if (!isLoading && order)
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent data-vaul-custom-container='true' className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DrawerHeader className='sm:text-center'>
            <DrawerTitle className='text-2xl'>Chi Tiết Đơn Hàng</DrawerTitle>
            <DrawerDescription>Mã đơn hàng: #ORD{order.orderCode}</DrawerDescription>
          </DrawerHeader>

          <div className='space-y-6 px-4 pb-4'>
            {/* Order Info */}
            <div className='grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg'>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Thời gian đặt hàng</p>
                <p className='font-medium'>{convertUtcDate(order.createdAtUtc).fullDateTime}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Trạng thái</p>
                <Badge
                  variant='outline'
                  className={`text-white ${ORDER_STATUS_BADGE[OrderStatus[order.status as keyof typeof OrderStatus]]}`}
                >
                  {OrderStatus[order.status as keyof typeof OrderStatus]}
                </Badge>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Tổng tiền</p>
                <p className='text-lg font-bold text-secondary'>{order.totalMoneyAmount.toLocaleString('vi-VN')} VND</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground mb-1'>Phương thức</p>
                <p className='font-medium'>{order.paymentMethod || 'Chuyển khoản ngân hàng'}</p>
              </div>
            </div>

            <Separator />

            {/* Activation Key Section */}
            <div className='space-y-3'>
              <Label className='text-sm font-semibold'>Key kích hoạt</Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <Input
                    value={order.activationKey || 'Chưa có key kích hoạt'}
                    readOnly
                    className={`cursor-pointer pr-10 ${!order.activationKey && 'italic text-muted-foreground'}`}
                    onClick={copyActivationKey}
                    disabled={!order.activationKey}
                  />
                  {copiedKey ? (
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 flex items-center gap-1'>
                      <Check className='w-3 h-3' />
                      Đã sao chép!
                    </span>
                  ) : (
                    order.activationKey && (
                      <Copy className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    )
                  )}
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 bg-transparent'
                  onClick={() => setShowInstruction(!showInstruction)}
                  title='Hướng dẫn sử dụng'
                >
                  <HelpCircle className='w-4 h-4' />
                </Button>
              </div>

              {/* Instruction */}
              {showInstruction && <ActivationKeyInstruction />}
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className='font-semibold mb-4'>
                Sản phẩm <span className='text-muted-foreground'>({order.orderItems.length})</span>
              </h3>
              <div className='space-y-3 max-h-[30vh] overflow-y-auto'>
                {order.orderItems.map((item) => (
                  <div key={item.mapId} className='flex gap-4 p-3 border rounded-lg'>
                    <img
                      src={item.imageUrl || '/placeholder.svg'}
                      alt={item.mapName}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-1'>
                      <h4 className='font-semibold mb-1'>{item.mapName}</h4>
                      <Badge variant='default' className='mb-2'>
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
        </DrawerContent>
      </Drawer>
    );
}
