import { Button } from '@/common/components/ui/button';
import { usePagination } from '@/common/hooks/usePagination';
import { GetOrdersResponse } from '@/common/types';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import OrderCard from './order-card';

interface OrdersTabProps {
  orderHistory: GetOrdersResponse;
}

const OrdersTab = ({ orderHistory }: OrdersTabProps) => {
  if (!orderHistory || orderHistory.data.length === 0) {
    return (
      <div className='h-full p-8 flex flex-col items-center justify-center'>
        <p className='text-muted-foreground text-lg'>Bạn chưa có đơn hàng nào.</p>
      </div>
    );
  }

  const { currentPage, totalPages, currentData, setPage, nextPage, prevPage } = usePagination(orderHistory.data, 3);
  return (
    <>
      <div className='h-full p-8 overflow-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='max-w-4xl'
        >
          <div className='mb-6'>
            <h1 className='text-3xl font-bold text-primary mb-2'>Lịch sử thanh toán</h1>
            <p className='text-muted-foreground'>Xem lại các đơn hàng đã đặt</p>
          </div>

          <div className='space-y-4'>
            {currentData?.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <Button variant='outline' size='icon' onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft className='w-4 h-4' />
          </Button>
          <div className='flex items-center gap-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size='sm'
                onClick={() => setPage(page)}
                className={currentPage === page ? 'bg-secondary hover:bg-secondary/90' : ''}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant='outline' size='icon' onClick={nextPage} disabled={currentPage === totalPages}>
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      )}
    </>
  );
};

export default OrdersTab;
