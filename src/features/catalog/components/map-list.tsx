import { Button } from '@/common/components/ui/button';
import { MapWithSubject } from '@/common/types';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import MapCard from './map-card';

interface MapListProps {
  mapList: MapWithSubject[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const MapList = ({ mapList, currentPage, setCurrentPage, totalPages }: MapListProps) => {
  return (
    <>
      {/* Product Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'>
        {mapList.map((map, index) => (
          <MapCard key={map.id} map={map} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className='w-4 h-4' />
          </Button>
          <div className='flex items-center gap-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size='sm'
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'bg-secondary hover:bg-secondary/90' : ''}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      )}
    </>
  );
};

export default MapList;
