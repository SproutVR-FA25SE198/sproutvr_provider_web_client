import { Button } from '@/common/components/ui/button';
import { usePagination } from '@/common/hooks/usePagination';
import { GetMapsResponse } from '@/common/types';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import PurchasedMapCard from './purchased-map-card';

interface LibraryTabProps {
  purchasedMaps: GetMapsResponse;
}

const LibraryTab = ({ purchasedMaps }: LibraryTabProps) => {
  if (!purchasedMaps || purchasedMaps.data.length === 0) {
    return (
      <div className='h-full p-8 flex flex-col items-center justify-center'>
        <p className='text-muted-foreground text-lg'>Bạn chưa mua map VR nào.</p>
      </div>
    );
  }

  const { currentPage, totalPages, currentData, setPage, nextPage, prevPage } = usePagination(purchasedMaps.data, 3);

  return (
    <>
      <div className='h-full p-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='max-w-6xl'
        >
          <div className='mb-6'>
            <h1 className='text-3xl font-bold text-primary mb-2'>Thư viện của tôi</h1>
            <p className='text-muted-foreground'>Các map VR bạn đã mua</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3'>
            {currentData.map((map, index) => (
              <PurchasedMapCard key={map?.id} map={map} index={index} />
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

export default LibraryTab;
