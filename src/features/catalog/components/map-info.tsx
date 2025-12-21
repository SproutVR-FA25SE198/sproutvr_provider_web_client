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
    <div className='rounded-2xl border border-border bg-background/70 backdrop-blur-sm shadow-sm p-6 md:p-8'>
      <div className='flex flex-col gap-6'>
        {/* Title + Meta */}
        <div className='space-y-3'>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance'>{map.name}</h1>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='inline-flex items-center px-3 py-1 rounded-full bg-muted text-foreground text-sm font-medium'>
              {map.subject.masterSubject.name}
            </span>
            <span className='inline-flex items-center px-3 py-1 rounded-full bg-muted text-foreground text-sm font-medium'>
              {map.subject.name}
            </span>
            {isPurchased && (
              <span className='inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold'>
                Đã mua
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className='text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line'>
          {map.description}
        </p>

        {/* Price */}
        <div className='flex items-end justify-between gap-4 border-t border-border pt-5'>
          <div>
            <p className='text-sm text-muted-foreground'>Giá</p>
            <p className='text-3xl font-bold text-secondary'>{map.price.toLocaleString('vi-VN')} VND</p>
          </div>

          {/* Add to Cart Button */}
          <div className='w-full sm:w-auto'>
            {isPurchased ? (
              <Button disabled className='w-full bg-secondary/60 text-secondary-foreground cursor-not-allowed'>
                Đã Mua
              </Button>
            ) : inBasket ? (
              <Button disabled className='w-full bg-secondary/60 text-secondary-foreground cursor-not-allowed'>
                Đã Thêm Vào Giỏ Hàng
              </Button>
            ) : (
              <Button
                size='lg'
                className='w-full sm:w-auto text-base px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200'
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
        </div>
      </div>
    </div>
  );
}
