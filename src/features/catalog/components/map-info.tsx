'use client';

import { Button } from '@/common/components/ui/button';
import { MapDetails } from '@/common/types';
import { BasketItem } from '@/common/types/basket.type';

import { ShoppingCart } from 'lucide-react';

interface MapInfoProps {
  map: MapDetails;
  inBasket?: boolean;
  isPurchased?: boolean;
  updateBasket?: (item: BasketItem) => void;
}

export function MapInfo({ map, inBasket, isPurchased = false, updateBasket }: MapInfoProps) {
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

      {/* Purchased Badge */}
      {isPurchased && (
        <div className='mb-4'>
          <span className='inline-flex items-center px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium'>
            Đã mua
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      {isPurchased ? (
        <Button disabled className='bg-secondary/60 text-secondary-foreground cursor-not-allowed'>
          Đã Mua
        </Button>
      ) : inBasket ? (
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
              subjectName: map.subject.name,
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
