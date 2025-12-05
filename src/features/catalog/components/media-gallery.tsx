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
          const labels = ['Main', 'Location 1', 'Location 2', 'Location 3'];
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
              <img src={image} alt={labels[index] || `Thumbnail ${index + 1}`} className='w-full h-full object-cover' />
              {/* Thumbnail label */}
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1',
                  'transition-opacity duration-200',
                  selectedIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                )}
              >
                <span className='text-xs text-white font-medium drop-shadow'>
                  {index === 0 ? 'Main' : `Location ${index}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
