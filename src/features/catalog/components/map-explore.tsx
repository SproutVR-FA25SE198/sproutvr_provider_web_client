'use client';

import { MapWithSubject } from '@/common/types';

import { useRef } from 'react';

import MapList from './map-list';

interface MapExploreProps {
  masterSubject: string;
  maps: MapWithSubject[];
}

export function MapExplore({ masterSubject, maps }: MapExploreProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className='py-12'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-3xl font-bold text-foreground'>Các sản phẩm VR khác thuộc {masterSubject}</h2>
      </div>

      <div
        ref={scrollRef}
        className='flex gap-24 overflow-x-auto h-100 mx-auto scrollbar-hide scroll-smooth pb-4'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <MapList mapList={maps.slice(0, 4)} currentPage={1} setCurrentPage={() => {}} totalPages={1} itemsPerRow={4} />
      </div>
    </div>
  );
}
