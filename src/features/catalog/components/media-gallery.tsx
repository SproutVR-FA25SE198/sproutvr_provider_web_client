'use client';

import { cn } from '@/common/utils';

import { useState } from 'react';

interface MediaGalleryProps {
  images: string[];
}

export function MediaGallery({ images }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className='space-y-4'>
      {/* Main preview */}
      <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-lg'>
        <img
          src={images[selectedIndex]}
          alt='Product preview'
          className='w-full h-full object-cover transition-opacity duration-300'
        />
        {/* Image indicator */}
        <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium'>
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className='grid grid-cols-4 gap-3'>
        {images.map((image, index) => {
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative aspect-[4/3] rounded-lg overflow-hidden bg-muted transition-all duration-200',
                'hover:ring-2 hover:ring-primary hover:scale-105',
                selectedIndex === index ? 'ring-2 ring-primary scale-105 shadow-md' : 'opacity-70',
              )}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className='w-full h-full object-cover' />
            </button>
          );
        })}
      </div>
    </div>
  );
}
