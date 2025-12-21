import Pagination from '@/common/components/pagination';
import { MapWithSubject } from '@/common/types';

import MapCard from './map-card';

interface MapListProps {
  mapList: MapWithSubject[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  itemsPerRow?: number;
  purchasedMapIds?: Set<string>;
}

const MapList = ({ mapList, currentPage, setCurrentPage, totalPages, itemsPerRow = 3, purchasedMapIds }: MapListProps) => {
  return (
    <>
      {/* Product Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${itemsPerRow} gap-6 mb-8`}>
        {mapList.map((map, index) => (
          <MapCard key={map.id} map={map} index={index} isPurchased={purchasedMapIds?.has(map.id) ?? false} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className='mt-6' />
    </>
  );
};

export default MapList;
