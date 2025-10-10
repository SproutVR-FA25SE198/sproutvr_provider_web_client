import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import { useMobile } from '@/common/hooks';
import { Order } from '@/common/types';
import { convertUtcDate } from '@/common/utils/convertUtcDate';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { OrderDetailsDrawer } from './order-details-drawer';
import { OrderDetailsModal } from './order-details-modal';

interface OrderCardProps {
  order: Order;
  index: number;
}

const OrderCard = ({ order, index }: OrderCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMobile();
  return (
    <>
      <motion.div
        key={order.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card>
          <CardContent className='pt-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between md:gap-4'>
              <div className='space-y-1'>
                <div className='flex items-center gap-3'>
                  <h3 className='font-semibold'>Đơn hàng #{order.id.toUpperCase()}</h3>
                  <Badge variant='secondary'>{order.status}</Badge>
                </div>
                {isMobile ? (
                  <>
                    <p className='text-sm text-muted-foreground'>Ngày đặt: {order.createdAtUtc}</p>
                    <p className='text-sm text-muted-foreground'>{order.items} sản phẩm</p>
                  </>
                ) : (
                  <>
                    <p className='text-sm text-muted-foreground'>
                      Ngày đặt: {convertUtcDate(order.createdAtUtc).date} • {order.items} sản phẩm
                    </p>
                  </>
                )}
              </div>
              <div className='flex items-left flex-col md:flex-row md:gap-12 gap-4'>
                <div className='text-right'>
                  <div className='text-sm text-muted-foreground'>Tổng cộng</div>
                  <div className='text-lg font-bold text-secondary'>
                    {order.totalMoneyAmount.toLocaleString('vi-VN')} VND
                  </div>
                </div>
                <Button variant='outline' size='sm' onClick={() => setModalOpen(true)}>
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Order Details Modal */}
      {isMobile ? (
        <OrderDetailsDrawer orderId={order.id} open={modalOpen} onOpenChange={setModalOpen} />
      ) : (
        <OrderDetailsModal orderId={order.id} open={modalOpen} onOpenChange={setModalOpen} />
      )}
    </>
  );
};

export default OrderCard;
