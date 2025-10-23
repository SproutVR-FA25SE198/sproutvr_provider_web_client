'use client';

import { Button } from '@/common/components/ui/button';
import { MapDetails } from '@/common/types';
import { BasketItem } from '@/common/types/basket.type';

import { ShoppingCart } from 'lucide-react';

interface MapInfoProps {
  map: MapDetails;
  inBasket?: boolean;
  updateBasket?: (item: BasketItem) => void;
}

export function MapInfo({ map, inBasket, updateBasket }: MapInfoProps) {
  return (
    <div className='flex flex-col justify-center space-y-6'>
      {/* Title */}
      <div className='space-y-3'>
        <h1 className='text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance'>{map.name}</h1>
        <p className='text-lg text-muted-foreground'>
          {map.subject.masterSubject.name} • {map.subject.name}
        </p>
      </div>

      {/* Description */}
      <p className='text-base text-muted-foreground leading-relaxed'>{map.description}</p>

      {/* Price */}
      <div className='text-3xl font-bold text-secondary mb-6'>{map.price.toLocaleString('vi-VN')} VND</div>

      {/* Add to Cart Button */}
      {inBasket ? (
        <Button disabled className='bg-secondary/60 text-secondary-foreground cursor-not-allowed'>
          Đã Thêm Vào Giỏ Hàng
        </Button>
      ) : (
        <Button
          size='lg'
          className='w-full sm:w-auto text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
          onClick={() =>
            updateBasket &&
            updateBasket({
              mapId: map.id,
              mapName: map.name,
              mapCode: map.mapCode,
              imageUrl: map.imageUrl[0],
              price: map.price,
            })
          }
        >
          <ShoppingCart className='w-5 h-5 mr-2' />
          THÊM VÀO GIỎ
        </Button>
      )}
    </div>
  );
}
