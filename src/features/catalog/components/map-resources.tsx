'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/common/components/ui/dialog';
import { GetMapByIdResponse } from '@/common/types';
import { ActivityType, cn } from '@/common/utils';

import { Box, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface MapResourcesProps {
  mapMetadata: GetMapByIdResponse;
}

export function MapResources({ mapMetadata }: MapResourcesProps) {
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const objectsPerPage = 4;
  const totalPages = Math.ceil(mapMetadata.mapObjects.length / objectsPerPage);
  const totalObjects = mapMetadata.mapObjects.length;
  const totalLocations = mapMetadata.taskLocations.length;

  const visibleObjects = mapMetadata.mapObjects.slice(currentObjectIndex, currentObjectIndex + objectsPerPage);

  const handlePrevious = () => {
    setCurrentObjectIndex((prev) => Math.max(0, prev - objectsPerPage));
  };

  const handleNext = () => {
    setCurrentObjectIndex((prev) => Math.min(mapMetadata.mapObjects.length - objectsPerPage, prev + objectsPerPage));
  };

  return (
    <div className='border-t border-border pt-8 mb-16'>
      <h2 className='text-2xl font-bold text-foreground mb-8'>Resources</h2>

      <div className='grid lg:grid-cols-2 gap-8 mb-12'>
        {/* Task Location */}
        <div>
          <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
            <MapPin className='w-5 h-5 text-primary' />
            Task location
            <span className='text-muted-foreground'>({totalLocations})</span>
          </h3>
          <Dialog>
            <DialogTrigger asChild>
              <div className='relative aspect-video rounded-xl overflow-hidden bg-accent border border-border cursor-pointer group'>
                <img
                  src={mapMetadata.taskLocations[0].imageUrl || '/placeholder.svg'}
                  alt='Task location'
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
                  <ZoomIn className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className='max-w-4xl'>
              <div className='relative aspect-video w-full'>
                <img
                  src={mapMetadata.taskLocations[0].imageUrl || '/placeholder.svg'}
                  alt='Task location'
                  className='object-contain'
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Activity Types */}
        <div>
          <h3 className='text-lg font-semibold text-foreground mb-4'>Activity types</h3>
          <ul className='space-y-3'>
            {Object.values(ActivityType).map((type, index) => (
              <li key={index} className='flex items-start gap-3 p-4 rounded-lg bg-accent/50 border border-border'>
                <div className='w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0' />
                <span className='text-foreground'>{type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Map Objects Carousel */}
      <div>
        <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Box className='w-5 h-5 text-secondary' />
          Map objects
          <span className='text-muted-foreground'>({totalObjects})</span>
        </h3>
        <div className='relative'>
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            disabled={currentObjectIndex === 0}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10',
              'w-10 h-10 rounded-full bg-background border-2 border-border',
              'flex items-center justify-center transition-all duration-200',
              'hover:bg-accent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed',
              'shadow-lg',
            )}
          >
            <ChevronLeft className='w-5 h-5' />
          </button>

          <button
            onClick={handleNext}
            disabled={currentObjectIndex >= totalObjects - objectsPerPage}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10',
              'w-10 h-10 rounded-full bg-background border-2 border-border',
              'flex items-center justify-center transition-all duration-200',
              'hover:bg-accent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed',
              'shadow-lg',
            )}
          >
            <ChevronRight className='w-5 h-5' />
          </button>

          {/* Objects Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 px-2'>
            {visibleObjects.map((object) => (
              <Dialog key={object.id}>
                <DialogTrigger asChild>
                  <div className='group cursor-pointer'>
                    <div className='relative aspect-square rounded-xl overflow-hidden bg-accent border border-border mb-3'>
                      <img
                        src={object.imageUrl || '/placeholder.svg'}
                        alt={object.name}
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
                        <ZoomIn className='w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      </div>
                    </div>
                    <p className='text-sm text-center text-foreground font-medium'>{object.name}</p>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-3xl'>
                  <div className='relative aspect-square w-full'>
                    <img src={object.imageUrl || '/placeholder.svg'} alt={object.name} className='object-contain' />
                  </div>
                  <p className='text-center text-lg font-semibold mt-4'>{object.name}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Page Indicator */}
          <div className='flex justify-center gap-2 mt-6'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  Math.floor(currentObjectIndex / objectsPerPage) === index ? 'bg-primary w-6' : 'bg-border',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
